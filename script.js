function getCookie(url, name, callback){
    chrome.cookies.get({"url": url, "name": name}, function(cookie) {
        if(callback) {
			if (cookie){
            	callback(cookie.value);
			} else {
				callback(false);
			}
        }
    });
}

function setCookie(url, name, value, expiration){
	chrome.cookies.set({'url': url, 'name': name, 'value': value, 'expirationDate': expiration});
}

function saveInterval(){
	setCookie('http://siebel.prod.quest.corp/support_enu/','SiebelRefreshTimerInterval',document.getElementById('interval').value,5684918675);
	document.getElementById('mainText').innerHTML = 'Refresh Siebel for interval to take affect.';
	document.getElementById('intervalInput').style.display = 'none';
	document.getElementById('saveIntervalButtonDiv').style.display = 'none';
}

function getInterval(){
	var interval = getCookie("http://siebel.prod.quest.corp/support_enu/", "SiebelRefreshTimerInterval", function(id) {
		    interval = id;
		    if (interval != false){
				document.getElementById('interval').value = interval;
			} else {
				setCookie('http://siebel.prod.quest.corp/support_enu/','SiebelRefreshTimerInterval','300000',5684918675);
				getInterval();
			}
	});
}

document.addEventListener('DOMContentLoaded', function(){
	getInterval();
	document.getElementById('saveInterval').addEventListener('click',saveInterval);
});