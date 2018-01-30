const rateApiCall = 'https://api.coinmarketcap.com/v1/ticker/?limit=10';

var httpRequest = new XMLHttpRequest;


httpRequest.onreadystatechange = getRates;

httpRequest.open('GET', 'https://api.coinmarketcap.com/v1/ticker/?limit=10', true);

httpRequest.send();

function getRates() {
    if (httpRequest.readyState === XMLHttpRequest.DONE) {
      if (httpRequest.status === 200) {
      	var myJson = JSON.parse(httpRequest.responseText);

        console.log(myJson);
      // document.getElementById('demo-showcase').innerHTML = JSON.stringify(myJson[1]['name']);
      	
      // console.log(JSON.stringify(myJson[1]['name']));

    	for (var i = 0 ; i < myJson.length ; i++) {
    		
    		let rank = i+1;
	
      //console.log(myJson[i]['name']);
    		
    		document.getElementsByClassName('rank')[i].innerHTML = myJson[i]['name'];

    	}



      } else {
        alert('There was a problem with the request.');
      }
    }
  }