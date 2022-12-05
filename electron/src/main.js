const { app, BrowserWindow } = require("electron")

const createWindow = () => {
    const win = new BrowserWindow({
        width: 1200,
        height: 800,
        autoHideMenuBar: true
    })
    win.loadURL("https://firewall.hyperz.net")
}


app.whenReady().then(() => {
    createWindow();

    app.on('activate', () => {
        if (BrowserWindow.getAllWindows().length === 0) createWindow()
    })
})