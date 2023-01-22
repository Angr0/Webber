const scrollbarHidingSwitch = document.querySelector('.hideScrollbarSwitch');
window.onload = LoadScrollbarState;
scrollbarHidingSwitch.addEventListener('change', ManageSwitch);

function LoadScrollbarState(){
    chrome.storage.local.get(["isScrollbarHidden"]).then((result) => {
        ChangeScrollbarVisibility(result.isScrollbarHidden);
        scrollbarHidingSwitch.checked = result.isScrollbarHidden;
    });
}

function ManageSwitch(){
    chrome.storage.local.set({'isScrollbarHidden': scrollbarHidingSwitch.checked});
    ChangeScrollbarVisibility(scrollbarHidingSwitch.checked);
}

async function getTabId(){
    let queryOptions = { active: true, lastFocusedWindow: true };
    let [tab] = await chrome.tabs.query(queryOptions);
    return tab.id;
}

function ChangeScrollbarVisibility(isHidden){
    if (isHidden){
        getTabId().then( tabId => {
            chrome.scripting.insertCSS({
                files: ["scrollbarHideElement.css"],
                target: { tabId: tabId, allFrames : true }
            });
        })
    }
    else {
        getTabId().then( tabId => {
            chrome.scripting.removeCSS({
                files: ["scrollbarHideElement.css"],
                target: { tabId: tabId, allFrames : true }
            });
        })
    }
}