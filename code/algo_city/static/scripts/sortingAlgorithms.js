function createOptionsSelector() {
    var options = window.document.getElementById('selection-options')
    var dropdownArrow = window.document.getElementById('dropdown-arrow')
    var algorithm = window.document.getElementById("algorithm-option")
    var theme = window.document.getElementById("theme-option")
    var itemsCount = window.document.getElementById("count-option")
    var startButton = window.document.getElementById("start-button")
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
    function changeStartButtonText() {
        var themeEmoji = themeOptions[theme.value].split(' ')[1]
        startButton.innerText = "Start Sorting " + themeEmoji
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
            var event = window.document.createEvent("Event")
            event.initEvent("count-change", true, true)
            return window.dispatchEvent(event)
        },
        themeChange() {
            changeStartButtonText()
            var event = window.document.createEvent("Event")
            event.initEvent("theme-change", true, true)
            return window.dispatchEvent(event)
        },
        getSelectedAlgorithm() {
            return algorithm.value
        },
        getCurrentTheme() {
            return theme.value
        }
    }
}

function createItemSorter() {
    var container = window.document.getElementById("item-sorting")

    function themeImageEndpoint(themeName) {
        return "/sortables/" + themeName || 'dog'
    }
    function createSortableItem(id, themeName) {
        var el = window.document.createElement("div")
        el.setAttribute("id", "sortable-" + id)
        el.classList.add("sortable-item")
        
        var hungerLevelCaption = window.document.createElement("div")
        hungerLevelCaption.innerText = "Hunger Level: "

        var hungerLevelValue = window.document.createElement('span')
        var randomHungerLevel = Math.round(Math.random() * 100)
        hungerLevelValue.innerText = randomHungerLevel
        hungerLevelValue.style.fontWeight = "bold"
        if (randomHungerLevel > 65) {
            hungerLevelValue.style.color = "red"
        } else if (randomHungerLevel > 30) {
            hungerLevelValue.style.color = "yellow"
        } else {
            hungerLevelValue.style.color = "green"
        }
        hungerLevelCaption.appendChild(hungerLevelValue)
        el.appendChild(hungerLevelCaption)
        
        var image = window.document.createElement("img")
        image.src = themeImageEndpoint(themeName)
        image.classList.add("sortable-image")
        el.appendChild(image)
        
        return el
    }
    function removeSortableItem() {
        container.lastChild.remove()
    }

    return {
        updateItemsDisplay(count, themeName) {
            var currentDisplayCount = container.childElementCount
            var updatedCount = count - currentDisplayCount
            for (let i = 0; i < Math.abs(updatedCount); i++) {
                if (updatedCount > -1) {
                    var child = createSortableItem(currentDisplayCount, themeName)
                    container.appendChild(child)
                } else if (currentDisplayCount > 0) {
                    removeSortableItem()
                }
            }
        },
        changeSortableTheme(themeName) {
            var children = container.children
            for (let i = 0; i < children.length; i++) {
                var img = children[i].getElementsByClassName("sortable-image")
                img.src = themeImageEndpoint(themeName)
            }
        },
        destroyAllSortables() {
            while (container.firstChild) {
                removeSortableItem()
            }
        }
    }
}

var optionsSelector = createOptionsSelector()

var itemSorter = createItemSorter()
itemSorter.updateItemsDisplay(optionsSelector.getItemCount(),  optionsSelector.getCurrentTheme())

window.addEventListener("count-change", function() {
    itemSorter.updateItemsDisplay(optionsSelector.getItemCount(), optionsSelector.getCurrentTheme())
})
window.addEventListener("theme-change", function() {
    itemSorter.destroyAllSortables()
    itemSorter.updateItemsDisplay(optionsSelector.getItemCount(), optionsSelector.getCurrentTheme())
})