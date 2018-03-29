var budgetController = (() => {

    var Expense = function (id, description, value) {
        this.id
        this.description = description
        this.value = value
    }

    var Income = function (id, description, value) {
        this.id
        this.description = description
        this.value = value
    }

    var data = {
        allItems: {
            exp: [],
            inc: []
        },
        totals: {
            exp: 0,
            inc: 0
        }
    }

    return {
        addItem(type, des, val) {
            var newItem, ID
            // Create New ID
            if (data.allItems[type].length > 0) {
                ID = data.allItems[type][data.allItems[type].length -1].id + 1
            } else {
                ID = 0
            }
            //Create new Item base on 'inc' or 'exp' type
            if (type === 'exp') {
                newItem = new Expense(ID, des, val)
            } else if ( type === 'inc') {
                newItem = new Income(ID, des, val)
            }
            // push it to our data structure
            data.allItems[type].push(newItem)
            return newItem
        },
        logData() {
            console.log(data)
        }
    }
})()

var UIController = (() => {
    var DOMstrings = {
        inputType: '.add__type',
        inputDescription: '.add__description',
        inputValue: '.add__value',
        inputBtn: '.add__btn'
    }
    return {
        getinput() {
            return {
                type: document.querySelector(DOMstrings.inputType).value,  // inc or exp
                descption: document.querySelector(DOMstrings.inputDescription).value,
                value: document.querySelector(DOMstrings.inputValue).value,
            }
        },
        getDOMstrings() {
            return DOMstrings
        }
    }
})()


var controller = ((budgetCtrl, UICtrl) => {

    var setupEventListeners = () => {
        var DOM = UICtrl.getDOMstrings()
        document.querySelector(DOM.inputBtn).addEventListener('click', ctrlAddItem)
        document.addEventListener('keypress', (e) => {
            if (e.keyCode === 13 || e.which === 13) {
                ctrlAddItem()
            }
        })
    }


    var ctrlAddItem = () => {
        var input, newItem
        // 1. Get the filed input data
        input = UICtrl.getinput()
        // 2. add the item to the budget controller
        newItem = budgetCtrl.addItem(input.type, input.descption, input.value)
        // 3. add the item to the ui
    
        // 4. Calculate the budget
    
        // 5. Display the budget on the UI
        console.log(input)
    }

    return {
        init() {
            console.log('init...')
            setupEventListeners()
        }
    }

})(budgetController, UIController)

controller.init()

// Finish 73