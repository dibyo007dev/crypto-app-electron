const electron = require('electron')
const path = require('path')
const browserWindow = electron.remote.BrowserWindow

const searchBtn = document.getElementById('searchBtn');

const rateApiCall = 'https://api.coinmarketcap.com/v1/ticker/?start=0&limit=10';

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
	}

}



searchBtn.addEventListener('click', function callForSearch(event) {

	var myJson = JSON.parse(httpindexRequest.responseText);

	const modalPath = path.join('file://', __dirname, 'properties.html');
	let win = new browserWindow({ width:500, height: 800})
	win.on('close', function(){
		win = null;
	})
	win.loadURL(modalPath)
	win.show()
	win.webContents.openDevTools()

	var searchText = document.getElementById('searchText').value;

	console.log(searchText);

	export var searchResult = searchLogic(searchText, myJson);
})