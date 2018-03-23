// Storage Controller

// Item Controller
const ItemCtrl = (() => {
    // Item Contructor
    const Item = function(id, name, calories) {
        this.id = id
        this.name = name
        this.calories = calories
    }

    // Data Structure / State
    const data = {
        items: [
            // {id: 0, name: 'Steak Dinner', calories: 1200},
            // {id: 1, name: 'Cookies', calories: 400},
            // {id: 2, name: 'Eggs', calories: 300},
        ],
        currentItem: null,
        totalCalories: 0
    }

    return {
        getItems() {
            return data.items
        },
        logData() {
            return data;
        },
        getItemById(id) {
            let found = null
            data.items.forEach((item) => {
                if(item.id ===id) {
                    found = item
                }
            })
            return found
        },
        updateItem(name, calories) {
            calories = parseInt(calories)
            let found = null
            data.items.forEach((item) => {
                if(item.id === data.currentItem.id) {
                    item.name = name
                    item.calories = calories
                    found = item
                }
            })
            return found
        },
        setCurrentItem(item) {
            data.currentItem = item
        },
        getCurrentItem() {
            return data.currentItem
        },
        getTotalCalories() {
            let total = 0
            data.items.forEach((item) => {
                total += item.calories
            })
            data.totalCalories = total
            return data.totalCalories
        },
        addItem(name, calories) {
            let ID;
            if (data.items.length > 0) {
                ID = data.items[data.items.length - 1].id + 1
            } else {
                ID = 0
            }
            // Calories to number
            let cal = parseInt(calories)
            // Create New Item
            newItem = new Item(ID, name, cal)
            // Add to items array
            data.items.push(newItem)
            return newItem
        }
    }
})()

// UI Controller
const UICtrl = (() => {
    const UISelectors = {
        itemList: '#item-list',
        listItems: '#item-list li',
        addBtn: '.add-btn',
        updateBtn: '.update-btn',
        deleteBtn: '.delete-btn',
        backBtn: '.back-btn',
        itemNameInput: '#item-name',
        itemCaloriesInput: '#item-calories',
        totalCalories: '.total-calories'
    }
    return {
        populateItemList(items) {
            let html = ''
            items.forEach((item) => {
                html += `<li class="collection-item" id="item-${item.id}"><strong>${item.name} </strong><em>${item.calories} Calories</em>
                <a href="#" class="secondary-content"><i class="edit-item fa fa-pencil"></i></a>
                </li>`
            })
            // Insert list items
            document.querySelector(UISelectors.itemList).innerHTML = html
        },
        addListIem(item) {
            document.querySelector(UISelectors.itemList).style.display = 'block'
            const li = document.createElement('li')
            li.className = 'collection-item'
            li.id = `item-${item.id}`

            li.innerHTML = `<strong>${item.name} </strong><em>${item.calories} Calories</em>
                <a href="#" class="secondary-content"><i class="edit-item fa fa-pencil"></i></a>`
            // insert item
            document.querySelector(UISelectors.itemList).insertAdjacentElement('beforeend', li)
        },
        getItemInput() {
            return {
                name: document.querySelector(UISelectors.itemNameInput).value,
                calories: document.querySelector(UISelectors.itemCaloriesInput).value
            }
        },
        clearInput() {
            document.querySelector(UISelectors.itemNameInput).value = ''
            document.querySelector(UISelectors.itemCaloriesInput).value = ''
        },
        addItemToForm() {
            document.querySelector(UISelectors.itemNameInput).value = ItemCtrl.getCurrentItem().name
            document.querySelector(UISelectors.itemCaloriesInput).value = ItemCtrl.getCurrentItem().calories
            UICtrl.showEditState()
        },
        hideList() {
            document.querySelector(UISelectors.itemList).style.display = 'none'
        },
        getSelectors() {
            return UISelectors
        },
        updateListItem (item) {
            let listItems = document.querySelectorAll(UISelectors.listItems)
            listItems = Array.from(listItems)
            listItems.forEach((listItem) => {
                const itemID = listItem.getAttribute('id')
                if(itemID === `item-${item.id}`) {
                    document.querySelector(`#${itemID}`).innerHTML = `<strong>${item.name} </strong><em>${item.calories} Calories</em>
                <a href="#" class="secondary-content"><i class="edit-item fa fa-pencil"></i></a>`
                }
            })
        },
        clearEditState() {
            UICtrl.clearInput()
            document.querySelector(UISelectors.updateBtn).style.display = 'none'
            document.querySelector(UISelectors.deleteBtn).style.display = 'none'
            document.querySelector(UISelectors.backBtn).style.display = 'none'
            document.querySelector(UISelectors.addBtn).style.display = 'inline'
        },
        showEditState() {
            document.querySelector(UISelectors.updateBtn).style.display = 'inline'
            document.querySelector(UISelectors.deleteBtn).style.display = 'inline'
            document.querySelector(UISelectors.backBtn).style.display = 'inline'
            document.querySelector(UISelectors.addBtn).style.display = 'none'
        },
        showTotalCalories(totalCalories) {
            document.querySelector(UISelectors.totalCalories).textContent = totalCalories
        }
    }
})()

// App Controller
const App = ((ItemCtrl, UICtrl) => {
    // Load Event Listeners
    const loadEventListeners = () => {
        // Get UI selectors
        const UISelectors = UICtrl.getSelectors()
        // Add Item Event
        document.querySelector(UISelectors.addBtn).addEventListener('click', itemAddSubmit)
        // Disable Submit on enter
        document.addEventListener('keypress', (e) => {
            if(e.keyCode === 13 || e.which === 13) {
                e.preventDefault()
                return false
            }
        })
        // Edit Icon click
        document.querySelector(UISelectors.itemList).addEventListener('click', itemEditClick)
        // Update Item Event
        document.querySelector(UISelectors.updateBtn).addEventListener('click', itemUpdateSubmit)
    }

    const itemAddSubmit = (e) => {
        // Get Form Input from UI Controller
        const input = UICtrl.getItemInput()

        // Check for name and calorie input
        if(input.name !== '' && input.calories !== '') {
            // Add Item
            const newItem = ItemCtrl.addItem(input.name, input.calories)
            // Add item to UI list
            UICtrl.addListIem(newItem)
            // Get total calories
            const totalCalories = ItemCtrl.getTotalCalories()
            //Add total calories to UI
            UICtrl.showTotalCalories(totalCalories)
            // clear fields
            UICtrl.clearInput()
        }
        e.preventDefault()
    }

    const itemEditClick = (e) => {
        if(e.target.classList.contains('edit-item')) {
            // Get list item id 
            const listId = e.target.parentNode.parentNode.id
            const listIdArr = listId.split('-')
            const id = parseInt(listIdArr[1])
            const itemToEdit = ItemCtrl.getItemById(id)
            ItemCtrl.setCurrentItem(itemToEdit)
            UICtrl.addItemToForm()
        }
        e.preventDefault()
    }

    const itemUpdateSubmit = (e) => {
        // get item input
        const input = UICtrl.getItemInput()
        const updatedItem = ItemCtrl.updateItem(input.name, input.calories)
        UICtrl.updateListItem(updatedItem)
        // Get total calories
        const totalCalories = ItemCtrl.getTotalCalories()
        //Add total calories to UI
        UICtrl.showTotalCalories(totalCalories)
        UICtrl.clearEditState()
        e.preventDefault()
    }

    return {
        init() {
            // clear edit state / set initial set
            UICtrl.clearEditState()
            // Fetch Items from data structure
            const items = ItemCtrl.getItems()
            // Check if any items
            if (items.length === 0) {
                UICtrl.hideList()
            } else {
                UICtrl.populateItemList(items)
            }
            // Get total calories
            const totalCalories = ItemCtrl.getTotalCalories()
            //Add total calories to UI
            UICtrl.showTotalCalories(totalCalories)
            // populate list with items
            UICtrl.populateItemList(items)
            // Load Event Listeners
            loadEventListeners()
        }
    }
})(ItemCtrl, UICtrl)

// Init app
App.init()

//  Finish 103