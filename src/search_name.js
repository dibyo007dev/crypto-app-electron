const electron = require('electron')
const path = require('path')
const browserWindow = electron.remote.BrowserWindow
var ipcMain = electron.ipcMain
let ipcRenderer = electron.ipcRenderer


const searchBtn = document.getElementById('searchBtn');


var httpindexRequest = new XMLHttpRequest;

httpindexRequest.onreadystatechange = getRates;

httpindexRequest.open('GET', 'https://api.coinmarketcap.com/v1/ticker/?start=0&limit=10', true);

httpindexRequest.send();

function searchLogic(searchText, searchArrayObj) {

		var notFoundFlag = 1;

	for (var i = 0 ; i < searchArrayObj.length ; i++) {
		
		if(searchText.toUpperCase() == searchArrayObj[i]['name'].toUpperCase()) {
			return searchArrayObj[i];

			var notFoundFlag = 0;
		}

	}
	if( notFoundFlag == 1) {
		alert("Currency Not Found");
		return null;
	}

}



searchBtn.addEventListener('click', function callForSearch(event) {

	var myJson = JSON.parse(httpindexRequest.responseText);
	var searchText = document.getElementById('searchText').value;

	if(searchLogic(searchText, myJson) != null)
	{
		const modalPath = path.join('file://', __dirname, 'properties.html');
		var win = new browserWindow({ width:500, height: 300})
		win.on('close', function(){
			win = null;
		})
		win.loadURL(modalPath)
		win.show()
		win.webContents.openDevTools()
		// console.log("HIiii");
		var searchResult = searchLogic(searchText, myJson);
		console.log(searchResult);

		ipcRenderer.send('properties-on-board', "Hello");
	}



    
    ipcMain.on('properties-on-board', function(event, arg) {
    	win.webContents.send('results', arg);

    })


})