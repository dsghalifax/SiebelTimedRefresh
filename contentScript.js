/* jsTimer.js */
function jsTimer(Milliseconds,callbackFunction){
	var _Interval = 5000;
	var _Action = function(){};
	var _Running = false;

	Object.defineProperty(this,'Interval',{
		get: function(){
			return _Interval;
		},
		set: function(val){
			if (typeof val == 'number'){
				_Interval = val;
			} else {
				throw new Error('Invalid type: please specify a value of type \'number\'');
			}
		}
	});

	Object.defineProperty(this,'Action',{
		get: function(){
			return _Action;
		},
		set: function(val){
			if (typeof val == 'function'){
				_Action = val;
			} else {
				throw new Error('Invalid type: please specify a value of type \'function\'');
			}
		}
	});

	Object.defineProperty(this,'Start',{
		value: function(){
			this.Timer = setInterval(_Action,_Interval);
			_Running = true;
		},
		writable: false
	});

	Object.defineProperty(this,'Stop',{
		value: function(){
			clearInterval(this.Timer);
			_Running = false;
		},
		writable: false
	});

	Object.defineProperty(this,'Restart',{
		value: function(){
			if (this.Running){
				this.Stop();
				this.Start();
			}
		},
		writable: false
	});

	Object.defineProperty(this,'Running',{
		get: function(){
			return _Running;
		},
		set: function(){
			throw new Error('Status is read-only.');
		}
	});

	if (Milliseconds){
		this.Interval = Milliseconds;
	}

	if (callbackFunction){
		this.Action = callbackFunction;
	}
}
/* END jsTimer.js */

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

var prevURL = '';
var prevInterval = parseInt(getCookie('SiebelRefreshTimerInterval'));

var locationMatch = 'SWECmd=GotoView&SWEView=All+Service+Request+List+View';

var refreshTimer = new jsTimer(refreshInterval,function(){
	chrome.runtime.sendMessage({ pressEnter: true });
});

var monitorProcess = new jsTimer(500,function(){
	if (location.href != prevURL){
		var locationURL = location.href;
		if (locationURL.indexOf(locationMatch) > -1){
			refreshTimer.Interval = parseInt(getCookie('SiebelRefreshTimerInterval'));
			if (refreshTimer.Running == true){
				refreshTimer.Restart();
			} else {
				refreshTimer.Start();
			}
		} else {
			refreshTimer.Stop();
		}
		prevURL = location.href;
	}
	
	if (refreshTimer.Running == true){
		if (prevInterval != parseInt(getCookie('SiebelRefreshTimerInterval'))){
			refreshTimer.Interval = parseInt(getCookie('SiebelRefreshTimerInterval'));
			refreshTimer.Restart();
			prevInterval = refreshTimer.Interval;
			refreshInterval = refreshTimer.Interval;
		}
	}
});

monitorProcess.Start();