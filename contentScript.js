function setCookie(cname, cvalue, exdays) {
    var d = new Date();
    d.setTime(d.getTime() + (exdays*24*60*60*1000));
    var expires = 'expires='+d.toUTCString();
    document.cookie = cname + '=' + cvalue + '; ' + expires + 'path=/';
}

function getCookie(cname) {
    var name = cname + '=';
    var ca = document.cookie.split(';');
    for(var i=0; i<ca.length; i++) {
        var c = ca[i];
        while (c.charAt(0)==' ') c = c.substring(1);
        if (c.indexOf(name) == 0) return c.substring(name.length,c.length);
    }
    return '';
}


if (getCookie('SiebelRefreshTimerInterval') == ''){
	setCookie('SiebelRefreshTimerInterval',300000,36500);
}

var refreshInterval = parseInt(getCookie('SiebelRefreshTimerInterval'));

var refreshEnabled = false;
var locationMatch = 'SWECmd=GotoView&SWEView=All+Service+Request+List+View';
var refreshTimer = null;

var checkLocation = setInterval(function(){
	var locationURL = location.href;
	if (locationURL.indexOf(locationMatch) > -1){
		refreshEnabled = true;
	} else {
		refreshEnabled = false;
	}
},500);

var detectRefresh = setInterval(function(){
	if (refreshEnabled){
		if (refreshTimer == null){
			refreshTimer = setInterval(function(){
				location.reload();
			},refreshInterval);
		}
	} else {
		clearInterval(refreshTimer);
		refreshTimer = null;
	}
},500);

/*setTimeout(function(){location.reload();}, 300000);*/