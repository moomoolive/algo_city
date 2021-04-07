function createOptionsSelector() {
    var options = window.document.getElementById('selection-options')
    var dropdownArrow = window.document.getElementById('dropdown-arrow')
    var algorithm = window.document.getElementById("algorithm-option")
    var theme = window.document.getElementById("theme-option")
    var itemsCount = window.document.getElementById("count-option")
    var themeOptions = {
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

function createItemSorter() {
    var container = window.document.getElementById("item-sorting")

    function createSortableItem(value, id) {
        var el = window.document.createElement("div")
        el.setAttribute("id", "sortable-" + id)
        
        var hungerLevelCaption = window.document.createElement("div")
        hungerLevelCaption.innerText = "Hunger Level: " + value
        el.appendChild(hungerLevelCaption)
        
        var image = window.document.createElement("img")
        image.src = "../pictures/sortables/dog.png"
        el.appendChild(image)
    
        return el
    }
    function removeSortableItem() {
        container.lastChild.remove()
    }

    return {
        updateItemsDisplay(count) {
            var currentDisplayCount = container.childElementCount
            var updatedCount = count - currentDisplayCount
            for (let i = 0; i < Math.abs(updatedCount); i++) {
                if (updatedCount > -1) {
                    var child = createSortableItem(68, currentDisplayCount)
                    container.appendChild(child)
                } else if (currentDisplayCount > 0) {
                    removeSortableItem()
                }
            }
        }
    }
}

var optionsSelector = createOptionsSelector()

var itemSorter = createItemSorter()
//itemSorter.updateItemsDisplay(optionsSelector.getItemCount())

var startButton = window.document.getElementById("start-button")
window.addEventListener('theme-change', function() {
    startButton.innerText = "Start Sorting " + optionsSelector.getThemeEmoji()
})