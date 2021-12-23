const electron = require('electron')
const {BrowserWindow} = electron

class MainWindow extends BrowserWindow {
  constructor(url) {
    super({
      // hiding dock icon's for windows
      skipTaskbar: true,
      height: 600,
      width: 300,
      frame: false,
      resizable: false,
      show: false,
      webPreferences: {
        backgroundThrottling: false, // app can run in background
        nodeIntegration: true,
        contextIsolation: false,
      }
    })
    this.loadURL(url)
    // when user click somewhere else we disappear app
    this.on('blur',()=>{
      this.hide()
    })
  }

}

module.exports = MainWindow