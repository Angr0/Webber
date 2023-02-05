const scrollbarHidingSwitch = document.querySelector('.hideScrollbarSwitch');
scrollbarHidingSwitch.addEventListener('change', ManageScrollbarSwitch);
window.onload = SetSwitchStateOnLoad;

function SetSwitchStateOnLoad(){
    if(document.title === 'Webber'){
        chrome.storage.local.get(['isScrollbarHidden']).then((result) => {
            scrollbarHidingSwitch.checked = result.isScrollbarHidden;
        });
    }
}

function ManageScrollbarSwitch(){
    chrome.storage.local.set({'isScrollbarHidden': scrollbarHidingSwitch.checked});
    chrome.runtime.sendMessage({ greeting: 'SwitchChangeScrollbarVisibility' });
}