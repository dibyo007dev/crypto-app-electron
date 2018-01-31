const electron = require('electron')
const path = require('path')
const browserWindow = electron.remote.BrowserWindow
var ipcMain = electron.ipcMain

var ipcRenderer = electron.ipcRenderer



const searchBtn = document.getElementById('searchBtn');


var httpindexRequest = new XMLHttpRequest;

httpindexRequest.onreadystatechange = getRates;

httpindexRequest.open('GET', 'https://api.coinmarketcap.com/v1/ticker/?start=0&limit=10', true);

httpindexRequest.send();

// Compares the searchfeild with the list of top 10 objects

function searchLogic(searchText, searchArrayObj) {

		var notFoundFlag = 1;		// checks if searchText is found or not

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

// 

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
		// win.webContents.openDevTools()		// Open Dev tools
		
		// console.log("Test 3 ");

		var searchResult = searchLogic(searchText, myJson);

		console.log("Name : " +searchResult['name']);
		console.log("Total Supply : "+searchResult['total_supply']);
		console.log("Percent Change 24h : "+searchResult['percent_change_24h']);
		console.log("Symbol : "+searchResult['symbol']);


//----------------------------------------------------------------------IPC rendering----------
		// sending the search result object 

		//ipcRenderer.send('properties-on-board', searchResult );	
	}

	//	document.getElementsByClassName('curr-name').innerHTML = searchResult['name'];

    
    // ipcMain.on('properties-on-board', function(event, arg) {
    // 	console.log(arg);

    // 	win.webContents.send('results', arg);

    // })
//----------------------------------------------------------  IPC Main Process transfer-----------

})