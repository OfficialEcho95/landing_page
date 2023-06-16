document.getElementById('login-form').addEventListener('submit', function (e) {
    e.preventDefault(); // Prevent form submission

    // Retrieve user input values
    var email = document.getElementById('email').value;
    var password = document.getElementById('password').value;

    // Perform validation on the input data
    if (!email || !password) {
        alert('Please fill in all fields.');
        return;
    }

    // Send an HTTP request to the server with login credentials
    var credentials = {
        email: email,
        password: password
    };

    fetch('/login', {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json'
        },
        body: JSON.stringify(credentials)
    })
    .then(response => response.json())
    .then(data => {
        // Handle the server response
        if (data.success) {
            alert('Login successful. Welcome!');
        } else {
            alert('Invalid credentials. Please try again.');
        }
    })
    .catch(error => {
        console.error('Error:', error);
        alert('An error occurred during login.');
    });
});
