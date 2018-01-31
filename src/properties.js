const electron = require('electron')
const path = require('path')
const browserWindow = electron.remote.BrowserWindow
var ipcMain = electron.ipcMain;

var heading = document.getElementsByClassName('head')

ipcMain.once('results', function (event, arg) {
    	console.log(arg)
    	// heading.innerHTML(JSON.stringify(arg));	

    })