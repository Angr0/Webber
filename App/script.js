const hideScrollbarSwitch = document.querySelector('.hideScrollbarSwitch')
const stateText = document.querySelector('.stateLabel')

hideScrollbarSwitch.addEventListener('change', ManageScrollbar)

window.onload = ManageScrollbar

function ManageScrollbar(){
    if (hideScrollbarSwitch.checked){
        stateText.innerHTML = "HIDDEN"
    }
    else {
        stateText.innerHTML = "VISIBLE"
    }
}