function createHeader() {
    var button = window.document.getElementById("menu-button")
    var dropdownMenu = window.document.getElementById("dropdown-menu")
    var showDropdownMenu = false

    function toggleHeaderVisibility () {
        showDropdownMenu = !showDropdownMenu
    }
    function toggleNavIcon (isActive) {
        var icon = '📘'
        if (isActive) {
            icon = '📖'
        }
        var text = icon + ' Menu'
        button.innerHTML = text
    }
    function togglePressedBoxShadow (isActive) {
        var className = 'pressed'
        if (isActive) {
            button.classList.add(className)
        } else {
            button.classList.remove(className)
        }
    }
    function toggleDropdownMenuVisibility (isActive) {
        dropdownMenu.style.display = isActive ? 'block' : 'none'
    }

    return {
        toggleNavBar: function() {
            toggleHeaderVisibility()
            toggleNavIcon(showDropdownMenu)
            togglePressedBoxShadow(showDropdownMenu)
            toggleDropdownMenuVisibility(showDropdownMenu)
        }
    }
}

var header = createHeader()

function toSorting() {
    window.location.href = '/sorting'
}

function toDataStructures() {
    window.location.href = '/data-structures'
}