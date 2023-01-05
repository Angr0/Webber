const scrollbarHidingSwitch = document.querySelector('.hideScrollbarSwitch');
//----------------------  TO DELETE  -----------------------------
const stateText = document.querySelector('.stateLabel');
//----------------------------------------------------------------

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

function ChangeScrollbarVisibility(isHidden){
    if (isHidden){
        stateText.innerHTML = "Scrollbar HIDDEN";
    }
    else {
        stateText.innerHTML = "Scrollbar VISIBLE";
    }
}