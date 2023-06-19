from flask import Flask, jsonify
from flask_mysqldb import MySQL

app = Flask(__name__)
app.config['MYSQL_HOST'] = '18.234.193.12'
app.config['MYSQL_USER'] = 'emmanuel'
app.config['MYSQL_PASSWORD'] = 'password'
app.config['MYSQL_DB'] = 'weatherapp'

mysql = MySQL(app)

@app.route('/users')
def get_users():
    cur = mysql.connection.cursor()
    cur.execute('SELECT * FROM weatherapp')
    data = cur.fetchall()
    cur.close()
    return jsonify(data)

if __name__ == '__main__':
    app.run(host='0.0.0.0', port=5000)

