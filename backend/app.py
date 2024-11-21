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
    'database': 'weather_data'   # Thay your_database bằng tên cơ sở dữ liệu của bạn
}

# Kết nối tới MySQL
def get_db_connection():
    connection = mysql.connector.connect(**db_config)
    return connection

# API để lấy tất cả dữ liệu thời tiết theo ngayf
@app.route('/api/weather', methods=['GET'])
def get_weather_data():
    connection = get_db_connection()
    cursor = connection.cursor(dictionary=True)  # Trả về kết quả dưới dạng dictionary
    cursor.execute('SELECT * FROM weather_decomposition')
    weather_data = cursor.fetchall()  # Lấy tất cả dữ liệu từ bảng
    cursor.close()
    connection.close()
    return jsonify(weather_data)  # Trả về dữ liệu dưới dạng JSON
# API mới để lấy dữ liệu date và trend
@app.route('/api/weather/pattern3', methods=['GET'])
def get_weather_pattern3():
    connection = get_db_connection()
    cursor = connection.cursor(dictionary=True)  # Trả về kết quả dưới dạng dictionary
    cursor.execute('SELECT date, trend FROM weather_decomposition')  # Chỉ lấy date và residual
    weather_data = cursor.fetchall()  # Lấy tất cả dữ liệu từ bảng
    cursor.close()
    connection.close()
    return jsonify(weather_data)
# API mới để lấy dữ liệu date và residual
@app.route('/api/weather/pattern5', methods=['GET'])
def get_weather_pattern5():
    connection = get_db_connection()
    cursor = connection.cursor(dictionary=True)  # Trả về kết quả dưới dạng dictionary
    cursor.execute('SELECT date, residual FROM weather_decomposition')  # Chỉ lấy date và residual
    weather_data = cursor.fetchall()  # Lấy tất cả dữ liệu từ bảng
    cursor.close()
    connection.close()
    return jsonify(weather_data)  # Trả về dữ liệu dưới dạng JSON
# API mới để lấy dữ liệu date và seasonal
@app.route('/api/weather/pattern4', methods=['GET'])
def get_weather_pattern4():
    connection = get_db_connection()
    cursor = connection.cursor(dictionary=True)  # Trả về kết quả dưới dạng dictionary
    cursor.execute('SELECT date, seasonal FROM weather_decomposition')  # Chỉ lấy date và residual
    weather_data = cursor.fetchall()  # Lấy tất cả dữ liệu từ bảng
    cursor.close()
    connection.close()
    return jsonify(weather_data)  # Trả về dữ liệu dưới dạng JSON
# API để lấy tất cả dữ liệu thời tiết theo tuan
@app.route('/api/weather/daily', methods=['GET'])
def get_weather_data_daily():
    connection = get_db_connection()
    cursor = connection.cursor(dictionary=True)  # Trả về kết quả dưới dạng dictionary
    cursor.execute('SELECT * FROM daily_weather_data')
    weather_data = cursor.fetchall()  # Lấy tất cả dữ liệu từ bảng
    cursor.close()
    connection.close()
    return jsonify(weather_data)  # Trả về dữ liệu dưới dạng JSON
# API để lấy tất cả dữ liệu thời tiết theo tuan
@app.route('/api/weather/weekly', methods=['GET'])
def get_weather_data_weekly():
    connection = get_db_connection()
    cursor = connection.cursor(dictionary=True)  # Trả về kết quả dưới dạng dictionary
    cursor.execute('SELECT * FROM weekly_weather_data')
    weather_data = cursor.fetchall()  # Lấy tất cả dữ liệu từ bảng
    cursor.close()
    connection.close()
    return jsonify(weather_data)  # Trả về dữ liệu dưới dạng JSON

# API để lấy tất cả dữ liệu thời tiết theo thang
@app.route('/api/weather/monthly', methods=['GET'])
def get_weather_data_monthly():
    connection = get_db_connection()
    cursor = connection.cursor(dictionary=True)  # Trả về kết quả dưới dạng dictionary
    cursor.execute('SELECT * FROM monthly_weather_data')
    weather_data = cursor.fetchall()  # Lấy tất cả dữ liệu từ bảng
    cursor.close()
    connection.close()
    return jsonify(weather_data)  # Trả về dữ liệu dưới dạng JSON

if __name__ == '__main__':
    app.run(debug=True)


