const path = require('path')
const electron = require('electron')
const {app, BrowserWindow, Tray} = electron

let mainWindow
let tray
app.on('ready', ()=>{
  mainWindow = new BrowserWindow({
    height:600,
    width:300,
    frame:false,
    resizable:false,
    show:false,
    webPreferences: {
      nodeIntegration: true,
      contextIsolation: false,
    }
  })
  mainWindow.loadURL(`file://${__dirname}/src/index.html`)
  const iconName = process.platform === 'win32' ? 'windows-icon@2x.png' : 'iconTemplate.png'
  const iconPath = path.join(__dirname, `./src/assets/${iconName}`)
  tray = new Tray(iconPath)

  tray.on('click', (event, bounds)=>{
    // click event bounds
    const {x, y} = bounds
    // window height and width
    const {height, width} = mainWindow.getBounds()
    if (mainWindow.isVisible()){
      mainWindow.hide()
    } else {
      const yPosition = process.platform === 'darwin' ? y : y - height
      mainWindow.setBounds({
        x: x - width / 2 ,
        y: yPosition,
        height: height ,
        width: width
      })
      mainWindow.show()
    }
  })
})

process.on('warning', (warning) => {
  console.log('<=====|||||||||||||||||||||||||||=====>','\n',warning.stack);
});