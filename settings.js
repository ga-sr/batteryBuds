const ExtensionUtils = imports.misc.extensionUtils;
const Me = ExtensionUtils.getCurrentExtension();
const { SETTINGS_ID } = Me.imports.constants;

const INTERVAL_KEY = 'interval';

var SettingsController = class SettingsController {
  constructor() {
    this._settings = ExtensionUtils.getSettings(SETTINGS_ID);
  }

  getInterval() {
    return this._settings.get_int(INTERVAL_KEY);
  }

  setInterval(interval) {
    this._settings.set_int(INTERVAL_KEY, interval);
  }
}