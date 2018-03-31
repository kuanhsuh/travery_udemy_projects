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
        inputBtn: '.add__btn',
        incomeContainer: '.income__list',
        expensesContainer: '.expenses__list'
    }
    return {
        getinput() {
            return {
                type: document.querySelector(DOMstrings.inputType).value,  // inc or exp
                descption: document.querySelector(DOMstrings.inputDescription).value,
                value: parseFloat(document.querySelector(DOMstrings.inputValue).value)
            }
        },
        addListItem(obj, type) {
            var html, newHtml
            // Create HTML string with placeholder text
            if (type === 'inc') {
                element = DOMstrings.incomeContainer
                html = '<div class="item clearfix" id="income-%id%"><div class="item__description">%description%</div><div class="right clearfix"><div class="item__value">%value%</div><div class="item__delete"><button class="item__delete--btn"><i class="ion-ios-close-outline"></i></button></div></div></div>'
            } else if (type === 'exp') {
                element = DOMstrings.expensesContainer
                html = '<div class="item clearfix" id="expense-%id%"><div class="item__description">%description%</div><div class="right clearfix"><div class="item__value">%value%</div><div class="item__percentage">21%</div><div class="item__delete"><button class="item__delete--btn"><i class="ion-ios-close-outline"></i></button></div></div></div>'
            }
            // Replace the placeholder text with some actual data
            newHtml = html.replace('%id%', obj.id)
            newHtml = newHtml.replace('%description%', obj.description)
            newHtml = newHtml.replace('%value%', obj.value)
            // Insert HTML into DOM
            document.querySelector(element).insertAdjacentHTML('beforeend', newHtml)

        },
        clearFields() {
            var fields, fieldsArr
            fields = document.querySelectorAll(DOMstrings.inputDescription + ', ' + DOMstrings.inputValue)
            var fields, fieldsArr
            fieldsArr = Array.prototype.slice.call(fields)
            fieldsArr.forEach((current, index, arr) => {
                current.value = ''
            });
            fieldsArr[0].focus()
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

    var updateBudget = () => {
        // 1. Calculate the budget

        // 2. Return the budget

        // 3. Display the budget on the UI
    }


    var ctrlAddItem = () => {
        var input, newItem
        // 1. Get the filed input data
        input = UICtrl.getinput()
        if(input.description !== '' && !isNaN(input.value) && input.value > 0) {
            // 2. add the item to the budget controller
            newItem = budgetCtrl.addItem(input.type, input.descption, input.value)
            // 3. add the item to the ui
            UICtrl.addListItem(newItem, input.type)
            // 4. Clear the fields
            UICtrl.clearFields()
            // 5. Calculate and update budget
            updateBudget()
        }

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