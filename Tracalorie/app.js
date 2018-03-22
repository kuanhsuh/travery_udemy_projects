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
            {id: 0, name: 'Steak Dinner', calories: 1200},
            {id: 1, name: 'Cookies', calories: 400},
            {id: 2, name: 'Eggs', calories: 300},
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
        addBtn: '.add-btn',
        itemNameInput: '#item-name',
        itemCaloriesInput: '#item-calories'
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
        getItemInput() {
            return {
                name: document.querySelector(UISelectors.itemNameInput).value,
                calories: document.querySelector(UISelectors.itemCaloriesInput).value
            }
        },
        getSelectors() {
            return UISelectors
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
    }

    const itemAddSubmit = (e) => {
        // Get Form Input from UI Controller
        const input = UICtrl.getItemInput()

        // Check for name and calorie input
        if(input.name !== '' && input.calories !== '') {
            // Add Item
            const newItem = ItemCtrl.addItem(input.name, input.calories)
        }
        e.preventDefault()
    }
    return {
        init() {
            // Fetch Items from data structure
            const items = ItemCtrl.getItems()
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