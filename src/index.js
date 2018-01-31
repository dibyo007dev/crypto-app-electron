const rateApiCall = 'https://api.coinmarketcap.com/v1/ticker/?start=0&limit=10';

var httpindexRequest = new XMLHttpRequest;


httpindexRequest.onreadystatechange = getRates;

httpindexRequest.open('GET', rateApiCall, true);

httpindexRequest.send();

function getRates() {
    if (httpindexRequest.readyState === XMLHttpRequest.DONE) {
      if (httpindexRequest.status === 200) {
      	var myJson = JSON.parse(httpindexRequest.responseText);

      // console.log(myJson);
      // document.getElementById('demo-showcase').innerHTML = JSON.stringify(myJson[1]['name']);
      	
      // console.log(JSON.stringify(myJson[1]['name']));

    	for (var i = 0 ; i < myJson.length ; i++) {
    		
    		let rank = i+1;
	
      //console.log(myJson[i]['name']);
    		
    		document.getElementsByClassName('rank')[i].innerHTML = myJson[i]['name'];
    		document.getElementsByClassName('rate-store')[i].innerHTML = "$ "+myJson[i]['price_usd'];
    		document.getElementsByClassName('last-updated')[i].innerHTML = "Last Updated : "+myJson[i]['last_updated'];


    	}



      } else {
        alert('There was a problem with the request.');
      }
    }
  }


