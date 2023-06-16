// Assuming you have a reference to the registration form element
var form = document.getElementById('registration-form');

// Add an event listener to listen for form submission
form.addEventListener('submit', function(event) {
  event.preventDefault(); // Prevent default form submission behavior

  // Get form data
  var username = document.getElementById('username').value;
  var email = document.getElementById('email').value;
  var password = document.getElementById('password').value;

  // Perform validation on the input data
  if (!username || !email || !password) {
    alert('Please fill in all fields.');
    return;
  }

  // Create an object with the form data
  var userData = {
    username: username,
    email: email,
    password: password
  };

  // Send the form data to the server using Fetch API
  fetch('/register', {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json'
    },
    body: JSON.stringify(userData)
  })
  .then(response => response.json())
  .then(data => {
    // Handle the server response
    if (data.success) {
      alert('Registration successful!');
      // Redirect to another page or perform other actions as needed
    } else {
      alert('Registration failed. Please try again.');
    }
  })
  .catch(error => {
    console.error('Error:', error);
    alert('An error occurred during registration.');
  });
});
