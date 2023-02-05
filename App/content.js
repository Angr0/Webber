let styleSheet = document.createElement('style')
styleSheet.innerHTML = '::-webkit-scrollbar {display: none;}';

chrome.runtime.sendMessage({ greeting: 'PageLoaded' }, function (response){
    if (response.farewell === 'HidingScrollbar'){
        document.body.appendChild(styleSheet);
    }
});

chrome.runtime.onMessage.addListener(function (request){
    if (request.greeting === 'RemoveContentScriptCSS'){
        document.body.removeChild(styleSheet);
    }
})