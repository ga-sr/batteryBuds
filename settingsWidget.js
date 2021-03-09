const GObject = imports.gi.GObject;
const Gtk = imports.gi.Gtk;

const ExtensionUtils = imports.misc.extensionUtils;
const Me = ExtensionUtils.getCurrentExtension();
const { SettingsController } = Me.imports.settings;
const { GETTEXT_DOMAIN } = Me.imports.constants;

const Gettext = imports.gettext.domain(GETTEXT_DOMAIN);
const _ = Gettext.gettext;

const BOX_PADDING = 8;
const MARGIN_BOTTOM = 8;
const WIDGET_PADDING = 16;

const SettingsWidget = GObject.registerClass(
    class MyPrefsWidget extends Gtk.Box {
        _init(params) {
            super._init(params);
            this._settings = new SettingsController();

            this.set_border_width(WIDGET_PADDING);
            this.set_orientation(Gtk.Orientation.VERTICAL);
            this.add(this._getIndicatorSettingsFrame());

            this.connect('destroy', Gtk.main_quit);
        }

        _getIndicatorSettingsFrame() {
            const hBox = new Gtk.Box({
                orientation: Gtk.Orientation.HORIZONTAL,
                border_width: BOX_PADDING,
            });

            hBox.pack_start(this._getIntervalLabel(), false, false, 0);
            hBox.pack_end(this._getIntervalSpinButton(), false, false, 0);

            const frame = new Gtk.Frame({
                label: _('Settings'),
                margin_bottom: MARGIN_BOTTOM,
            });

            frame.add(hBox);
            return frame;
        }

        _getIntervalLabel() {
            return new Gtk.Label({
                label: _('Refresh interval (minutes)'),
            });
        }

        _getIntervalSpinButton() {
            const spinButton = new Gtk.SpinButton();
            const interval = this._settings.getInterval();

            spinButton.set_sensitive(true);
            spinButton.set_range(1, 60);
            spinButton.set_value(interval || 2);
            spinButton.set_increments(1, 2);

            spinButton.connect('value-changed', (w) => {
                this._settings.setInterval(w.get_value_as_int());
            });

            return spinButton;
        }
    }
);
