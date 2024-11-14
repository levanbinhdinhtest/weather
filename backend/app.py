from flask import Flask, jsonify
from flask_cors import CORS  # Thêm dòng này để import CORS
import mysql.connector


app = Flask(__name__)
CORS(app)  # Kích hoạt CORS cho toàn bộ ứng dụng

# Cấu hình kết nối MySQL
db_config = {
    'host': 'localhost',
    'user': 'root',      # Thay your_username bằng tên người dùng MySQL của bạn
    'password': '',  # Thay your_password bằng mật khẩu MySQL của bạn
    'database': 'weather_data_db'   # Thay your_database bằng tên cơ sở dữ liệu của bạn
}

# Kết nối tới MySQL
def get_db_connection():
    connection = mysql.connector.connect(**db_config)
    return connection

# API để lấy tất cả dữ liệu thời tiết
@app.route('/api/weather', methods=['GET'])
def get_weather_data():
    connection = get_db_connection()
    cursor = connection.cursor(dictionary=True)  # Trả về kết quả dưới dạng dictionary
    cursor.execute('SELECT * FROM weather_data')
    weather_data = cursor.fetchall()  # Lấy tất cả dữ liệu từ bảng
    cursor.close()
    connection.close()
    return jsonify(weather_data)  # Trả về dữ liệu dưới dạng JSON


if __name__ == '__main__':
    app.run(debug=True)