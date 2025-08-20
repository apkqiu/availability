const { app, BrowserWindow, Menu } = require('electron')

const createWindow = () => {
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
    a = setInterval(() => {
        try{
            if(win.title.startsWith("洽隐山房")) return;
            win.title = "洽隐山房 - "+win.title;
        }catch(e){
            clearInterval(a)
        }

    },1)
}

app.whenReady().then(() => {
    createWindow()
})