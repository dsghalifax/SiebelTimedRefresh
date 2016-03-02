chrome.runtime.onMessage.addListener(function(message,sender,sendResponse){
    if(message.pressEnter){
        chrome.tabs.query({url: "*://siebel.prod.quest.corp/*"}, function(tabs) {
            chrome.debugger.attach({ tabId: tabs[0].id }, "1.0");
            chrome.debugger.sendCommand({ tabId: tabs[0].id }, 'Input.dispatchKeyEvent', { type: 'keyDown', modifiers:1, windowsVirtualKeyCode:13, nativeVirtualKeyCode : 13, macCharCode: 13  });
            chrome.debugger.sendCommand({ tabId: tabs[0].id }, 'Input.dispatchKeyEvent', { type: 'keyUp', modifiers:1, windowsVirtualKeyCode:13, nativeVirtualKeyCode : 13, macCharCode: 13  });
            chrome.debugger.detach({ tabId: tabs[0].id });
            console.log('Triggered!');
        });
    }
});