const { St, GLib, Clutter, Gio } = imports.gi;
const Main = imports.ui.main;
const Mainloop = imports.mainloop;
const Me = imports.misc.extensionUtils.getCurrentExtension();

// const Prefs = Me.imports.prefs;

let panelButton, panelButtonText, timeout;

function getSettings() {
  let GioSSS = Gio.SettingsSchemaSource;
  let schemaSource = GioSSS.new_from_directory(
    Me.dir.get_child("schemas").get_path(),
    GioSSS.get_default(),
    false
  );
  let schemaObj = schemaSource.lookup(
    'org.gnome.shell.extensions.batteryBuds', true);
  if (!schemaObj) {
    throw new Error('cannot find schemas');
  }
  return new Gio.Settings({ settings_schema: schemaObj });
}

function setPercentageText() {
  var [ok, out, err, exit] = GLib.spawn_command_line_sync(Me.path + '/script.sh');
  let percentage = out.toString().replace('\n', '');
  panelButtonText.set_text(percentage.toString());
  log(err)
  return true
}

function init() {
  // Prefs.initTranslations();

  panelButton = new St.Bin({
    style_class: "panel-button"
  });

  panelButtonText = new St.Label({
    style_class: "budsPanelText",
    text: "(L: 0% | R: 0%)",
    y_align: Clutter.ActorAlign.CENTER,
  });

  panelButton.set_child(panelButtonText);
}

function enable() {
  setPercentageText();

  // let settings = getSettings();
  // let interval = settings.getInterval();

  Main.panel._rightBox.insert_child_at_index(panelButton, 1);
  timeout = Mainloop.timeout_add_seconds(5 * 60, setPercentageText);
}

function disable() {
  Mainloop.source_remove(timeout)
  Main.panel._rightBox.remove_child(panelButton);
}