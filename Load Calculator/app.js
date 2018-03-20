// Listen for sumit
document.getElementById('loan-form').addEventListener('submit', function(e) {
    document.getElementById('results').style.display = 'none'
    document.getElementById('loading').style.display = 'block'

    setTimeout(calculateResults, 2000)
    e.preventDefault();
})

function calculateResults (e) {
    // UI Vars
    const amount = document.getElementById('amount')
    const interest = document.getElementById('interest')
    const years = document.getElementById('years')
    const monthlyPayment = document.getElementById('monthly-payment')
    const totalPayment = document.getElementById('total-payment')
    const totalInterest = document.getElementById('total-interest')

    const principal = parseFloat(amount.value)
    const calculatedInterest = parseFloat(interest.value) / 100 / 12
    const calculatedPayments = parseFloat(years.value) * 12 

    const x = Math.pow(1 + calculatedInterest, calculatedPayments)
    const monthly = (principal * x * calculatedInterest) / (x-1)

    if (isFinite(monthly)) {
        monthlyPayment.value = monthly.toFixed(2)
        totalPayment.value = (monthly * calculatedPayments).toFixed(2)
        totalInterest.value = ((monthly * calculatedPayments) - principal).toFixed(2)

        document.getElementById('loading').style.display = 'none'
        document.getElementById('results').style.display = 'block'
    } else {
        showError('Please check your numbers')
    }
}

function showError(error) {
    document.getElementById('loading').style.display = 'none'
    document.getElementById('results').style.display = 'none'
    const errorDiv = document.createElement('div')
    // Get elements
    const card = document.querySelector('.card')
    const heading = document.querySelector('.heading')

    errorDiv.className = 'alert alert-danger'
    errorDiv.appendChild(document.createTextNode(error))

    card.insertBefore(errorDiv, heading)

    setTimeout(clearError, 3000)
}

function clearError() {
    document.querySelector('.alert').remove()
}
