# SiebelTimedRefresh
Sieble - Timed Refresh is a Chrome Extension that adds a reload timer when viewing SR lists.

A cookie is used to store the refresh interval due to separation of accessible space between the Siebel site itself and the options.html popup. The following cookie information is being used.
## Begin Cookie
Name: SiebelRefreshTimerInterval
URL: http://siebel.prod.quest.corp/support_enu/
## End Cookie

contentScript.js
Javascript file that gets injected into the Siebel site code.

options.html
The options popup source code. This is used to configured the refresh interval.

script.js
Javascript file used by the options.html file.
