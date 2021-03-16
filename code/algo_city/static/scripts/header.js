var header = {
    button: window.document.getElementById("menu-button"),
    dropdownMenu: window.document.getElementById("dropdown-menu"),
    showDropdownMenu: false
}

function toggleNavBar() {
    var toggleHeaderVisibility = function () {
        header.showDropdownMenu = !header.showDropdownMenu
    }
    var toggleNavIcon = function (isActive) {
        var icon = '📘'
        if (isActive) {
            icon = '📖'
        }
        var text = icon + ' Menu'
        header.button.innerHTML = text
    }
    var togglePressedBoxShadow = function (isActive) {
        var className = 'pressed'
        if (isActive) {
            header.button.classList.add(className)
        } else {
            header.button.classList.remove(className)
        }
    }
    var toggleDropdownMenuVisibility = function (isActive) {
        header.dropdownMenu.style.display = isActive ? 'block' : 'none'
    }

    toggleHeaderVisibility()
    toggleNavIcon(header.showDropdownMenu)
    togglePressedBoxShadow(header.showDropdownMenu)
    toggleDropdownMenuVisibility(header.showDropdownMenu)
}

function toSorting() {
    window.location.href = '/sorting'
}

function toDataStructures() {
    window.location.href = '/data-structures'
}