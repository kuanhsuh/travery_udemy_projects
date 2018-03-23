// Storage Controller
const StorageCtrl = (() => {
    return {
        storeItem(item) {
            let items = []
            if (localStorage.getItem('items') === null) {
                items = []
                items.push(item)
                localStorage.setItem('items', JSON.stringify(items))
            } else {
                items = JSON.parse(localStorage.getItem('items'))
                items.push(item)
                localStorage.setItem('items', JSON.stringify(items))
            }
            
        },
        getItemsFromStorage() {
            let items
            if(localStorage.getItem('items') === null) {
                items = []
            } else {
                items = JSON.parse(localStorage.getItem('items'))
            }
            return items
        },
        updateItemStorage(updatedItem) {
            let items = JSON.parse(localStorage.getItem('items'))
            items.forEach((item, index) => {
                if(updatedItem.id === item.id) {
                    items.splice(index, 1, updatedItem)
                }
            })
            localStorage.setItem('items', JSON.stringify(items))
        },
        deleteItemFromStorage(id) {
            let items = JSON.parse(localStorage.getItem('items'))
            items.forEach((item, index) => {
                if(item.id === id) {
                    items.splice(index, 1)
                }
            })
            localStorage.setItem('items', JSON.stringify(items))
        },
        clearItemsFromStorage() {
            localStorage.removeItem('items')
        }
    }
})()
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
        // items: [
            // {id: 0, name: 'Steak Dinner', calories: 1200},
            // {id: 1, name: 'Cookies', calories: 400},
            // {id: 2, name: 'Eggs', calories: 300},
        // ],
        items: StorageCtrl.getItemsFromStorage(),
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
        deleteItem(id) {
            const ids = data.items.map((item) => {
                return item.id
            })
            // get index
            const index = ids.indexOf(id)
            // remove item
            data.items.splice(index, 1)

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
        },
        clearAllItems() {
            data.items = []
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
        clearBtn: '.clear-btn',
        itemNameInput: '#item-name',
        itemCaloriesInput: '#item-calories',
        totalCalories: '.total-calories',
        
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
        deleteListItem(id) {
            const itemID = `#item-${id}`
            const item = document.querySelector(itemID)
            item.remove()
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
        },
        removeItems() {
            let listItems = document.querySelectorAll(UISelectors.listItems)
            listItems = [].slice.call(listItems)
            listItems.forEach((item) => {
                item.remove()
            })
        }
    }
})()

// App Controller
const App = ((ItemCtrl, UICtrl, StorageCtrl) => {
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
        // Back Button Event
        document.querySelector(UISelectors.deleteBtn).addEventListener('click', itemDeleteSubmit)
        // Back Button Event
        document.querySelector(UISelectors.clearBtn).addEventListener('click', clearAllItemsClick)
        // Back Button Event
        document.querySelector(UISelectors.backBtn).addEventListener('click', (e) => {
            UICtrl.clearEditState()
            e.preventDefault()
        })
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
            // Store in localStorage
            StorageCtrl.storeItem(newItem)
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
        StorageCtrl.updateItemStorage(updatedItem)
        UICtrl.clearEditState()
        e.preventDefault()
    }

    const itemDeleteSubmit = (e) => {
        // get current item
        const currentItem = ItemCtrl.getCurrentItem()
        ItemCtrl.deleteItem(currentItem.id)
        UICtrl.deleteListItem(currentItem.id)
        // Get total calories
        const totalCalories = ItemCtrl.getTotalCalories()
        //Add total calories to UI
        UICtrl.showTotalCalories(totalCalories)
        UICtrl.clearEditState()
        StorageCtrl.deleteItemFromStorage(currentItem.id)
        e.preventDefault()
    }

    const clearAllItemsClick = () => {
        ItemCtrl.clearAllItems()
        UICtrl.removeItems()
        // Get total calories
        const totalCalories = ItemCtrl.getTotalCalories()
        //Add total calories to UI
        UICtrl.showTotalCalories(totalCalories)
        UICtrl.removeItems()
        StorageCtrl.clearItemsFromStorage()
        UICtrl.hideList()
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
})(ItemCtrl, UICtrl, StorageCtrl)

// Init app
App.init()

