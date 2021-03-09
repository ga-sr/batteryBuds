# About
Gnome-Shell extension displaying battery percentage of your galaxy buds

## Requirements
* [LiveBudsCli](https://github.com/JojiiOfficial/LiveBudsCli)

## Manual Installation
1. Clone the repo
```
git clone https://github.com/ga-sr/batteryBuds.git
```
2. Init submodules
```git submodule update --init```
3. Copy to extensions
```cp -R batteryBuds ~/.local/share/gnome-shell/extensions/batteryBuds@gasr```

## Debug
```journalctl -f -o cat /usr/bin/gnome-shell```
