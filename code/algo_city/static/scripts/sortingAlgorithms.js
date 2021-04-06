function createOptionsSelector() {
    var options = window.document.getElementById('selection-options')
    var dropdownArrow = window.document.getElementById('dropdown-arrow')
    var algorithm = window.document.getElementById("algorithm-option")
    var theme = window.document.getElementById("theme-option")
    var itemsCount = window.document.getElementById("count-option")
    var themeOptions = {
        bird: "Parakeets 🦜",
        dog: "Dogs 🐕",
        cat:  "cat 🐈"
    }
    var availableAlgorithms = [
        "quick",
        "merge"
    ]

    function toggleDropDownArrow() {
        dropdownArrow.classList.toggle("showing-options")
    }
    function createThemeOptions() {
        for (var [k, v] of Object.entries(themeOptions)) {
            var el = window.document.createElement("option")
            el.value = k
            el.text = v
            theme.appendChild(el)
        }
    }
    function createAvailableAlgorithms() {
        for (var a of availableAlgorithms) {
            var el = window.document.createElement('option')
            el.value = a
            el.text = a.slice(0,1).toUpperCase() + a.slice(1) + "-Sort"
            algorithm.appendChild(el)
        }
    }
    function init() {
        createThemeOptions()
        createAvailableAlgorithms()
    }

    init()

    return {
        toggleOptionVisibility: function() {
            options.classList.toggle("hide-options")
            return toggleDropDownArrow()
        },
        getItemCount() {
            return parseInt(itemsCount.innerText)
        },
        incrementItemCount: function(increment) {
            var newNum = this.getItemCount() + increment
            if (newNum < 5) {
                return window.alert("You must have at least five elements!")
            } else {
                itemsCount.innerText = newNum
            }
            return window.dispatchEvent(new Event('count-change'))
        },
        getThemeEmoji() {
            var text = themeOptions[theme.value]
            return text.split(' ')[1]
        },
        themeChange() {
            return window.dispatchEvent(new Event('theme-change'))
        },
        getSelectedAlgorithm() {
            return algorithm.value
        }
    }
}

var optionsSelector = createOptionsSelector()

var startButton = window.document.getElementById("start-button")
window.addEventListener('theme-change', function() {
    startButton.innerText = "Start Sorting " + optionsSelector.getThemeEmoji()
})