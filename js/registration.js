document.getElementById('registration-form').addEventListener('submit', function (e) {
    e.preventDefault(); // Prevent form submission

    // Retrieve user input values
    var username = document.getElementById('username').value;
    var email = document.getElementById('email').value;
    var password = document.getElementById('password').value;

    // Perform validation on the input data
    if (!username || !email || !password) {
        alert('Please fill in all fields.');
        return;
    }

    // Send an HTTP request to the server with user data
    var userData = {
        username: username,
        email: email,
        password: password
    };

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
            alert('Registration successful. You can now log in.');
        } else {
            alert('Registration failed. Please try again.');
        }
    })
    .catch(error => {
        console.error('Error:', error);
        alert('An error occurred during registration.');
    });
});