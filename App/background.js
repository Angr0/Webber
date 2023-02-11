chrome.runtime.onMessage.addListener(function(request, sender, sendResponse) {
    if (request.greeting === 'SwitchChangeScrollbarVisibility'){
        ChangeScrollbarVisibility();
    }
    else if (request.greeting === 'PageLoaded') {
        AsyncSendResponse(request, sender, sendResponse);
    }
    return true;
});

const AsyncSendResponse = async function (request, sender, sendResponse) {
    chrome.storage.local.get(['isScrollbarHidden']).then((result) => {
        if (result.isScrollbarHidden === true){
            chrome.storage.local.set({'scrollbarHiddenByContentScript': true});
            sendResponse({farewell: 'HidingScrollbar'});
        }
    });
}

async function getTabId(){
    let queryOptions = { active: true, lastFocusedWindow: true };
    let [tab] = await chrome.tabs.query(queryOptions);
    if (tab.url.includes("chrome") || tab.url.includes("www.google.com/search")){
        return false;
    }
    return tab.id;
}

function ChangeScrollbarVisibility(){
    chrome.storage.local.get(['isScrollbarHidden']).then((result) => {
        if (result.isScrollbarHidden){
            getTabId().then( tabId => {
                if (tabId === false){
                    return;
                }
                chrome.scripting.insertCSS({
                    files: ['scrollbarHideElement.css'],
                    target: { tabId: tabId, allFrames : true }
                });
            });
        }
        else{
            chrome.storage.local.get(['scrollbarHiddenByContentScript']).then((result) => {
                if (!result.scrollbarHiddenByContentScript){
                    getTabId().then( tabId => {
                        if (tabId === false){
                            return;
                        }
                        chrome.scripting.removeCSS({
                            files: ['scrollbarHideElement.css'],
                            target: { tabId: tabId, allFrames : true }
                        });
                    });
                }
                else{
                    chrome.storage.local.set({'scrollbarHiddenByContentScript': false});
                    getTabId().then( tabId => {
                        if (tabId === false){
                            return;
                        }
                        chrome.tabs.sendMessage(tabId, {greeting: 'RemoveContentScriptCSS'});
                    });
                }
            });
        }
    });
}