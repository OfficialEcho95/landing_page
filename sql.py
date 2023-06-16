from flask import Flask, render_template, request, jsonify
from flask_mysqldb import MySQL

app = Flask(__name__)

# MySQL configurations
app.config['MYSQL_HOST'] = 'localhost'
app.config['MYSQL_USER'] = 'your_username'
app.config['MYSQL_PASSWORD'] = 'your_password'
app.config['MYSQL_DB'] = 'your_database_name'
app.config['MYSQL_CURSORCLASS'] = 'DictCursor'

# Create MySQL instance
mysql = MySQL(app)

@app.route('/')
def index():
    return render_template('index.html')

@app.route('/register', methods=['POST'])
def register():
    data = request.get_json()
    username = data['username']
    email = data['email']
    password = data['password']

    # Perform validation on the input data (e.g., check for existing username or email)

    # Create a new user object
    user = {
        'username': username,
        'email': email,
        'password': password
    }

    # Store the user in the MySQL database
    cursor = mysql.connection.cursor()
    cursor.execute("INSERT INTO users (username, email, password) VALUES (%s, %s, %s)",
                   (user['username'], user['email'], user['password']))
    mysql.connection.commit()
    cursor.close()

    # Return success response
    return jsonify({'success': True})

@app.route('/login', methods=['POST'])
def login():
    data = request.get_json()
    email = data['email']
    password = data['password']

    # Check if the user exists and the password matches
    cursor = mysql.connection.cursor()
    cursor.execute("SELECT * FROM users WHERE email = %s AND password = %s", (email, password))
    user = cursor.fetchone()
    cursor.close()

    if user:
        # Return success response
        return jsonify({'success': True})

    # Return failure response
    return jsonify({'success': False})

if __name__ == '__main__':
    app.run()