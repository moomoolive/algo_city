var headerButton = {
    element: window.document.getElementById("menu-button"),
    isActive: false
}

function toggleNavIcon(isActive) {
    return isActive ?  '📘' : '📖'
}

function toggleNavBar() {
    headerButton.element.innerHTML = toggleNavIcon(headerButton.isActive) + ' Menu'
    headerButton.isActive = !headerButton.isActive
}
