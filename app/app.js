// Listen for submit

document.getElementById('loan-form').addEventListener('submit', function(e){
  
  document.querySelector('#loading ').style.display = 'block';
  setTimeout(calculateResult,2000);
  e.preventDefault();
});

function calculateResult(){
 
  // UI vars
  const amount = document.getElementById('amount');
  const interest = document.getElementById('interest');
  const years = document.getElementById('years');
  const monthlyPayment = document.getElementById('monthly-payment');
  const totalPayment = document.getElementById('total-payment');
  const totalInterest = document.getElementById('total-interest');

  const principal = parseFloat(amount.value);
  const calculatedInterest = parseFloat(interest.value)/100/12;
  const calculatedPayments = parseFloat(years.value)*12;

  // compute monthly payment

  const x = Math.pow(1 + calculatedInterest,  calculatedPayments);
  const monthly = (principal*x*calculatedInterest)/(x-1);

  if(isFinite(monthly)){
    monthlyPayment.value = monthly.toFixed(2);
    totalPayment.value = (monthly * calculatedPayments).toFixed(2);
    totalInterest.value = ((monthly * calculatedPayments)-principal).toFixed(2);
    
    document.querySelector('#result').style.display = 'block';
    document.querySelector('#loading ').style.display = 'none';
  }
  else{
    showError('Please Check your numbers');
  }
  
}

function showError(error){
  document.querySelector('#result').style.display = 'none';
  document.querySelector('#loading ').style.display = 'none';
  //create a div
  const errorDiv = document.createElement('div');
  // add claass

  const card = document.querySelector('.card');
  const heading = document.querySelector('.heading');

  errorDiv.className = 'alert alert-danger';
  errorDiv.appendChild(document.createTextNode(error));

  // insert above heading
  card.insertBefore(errorDiv, heading);

  setTimeout(clearError, 3000);

}

function clearError(){
  document.querySelector('.alert').remove();
}