const { app, BrowserWindow } = require('electron')

app.whenReady().then(() => {
    const win = new BrowserWindow({
        width: 1600,
        height: 900,
        webPreferences: {
            // devTools
            nodeIntegration: true,
        }
    })
    win.setMenu(null)
    win.loadFile('./docs/home.html')
})