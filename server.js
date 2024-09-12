const express = require('express');
const mysql = require('mysql2');
const path = require('path');
const app = express();
const PORT = process.env.PORT || 3000;

// إعداد الاتصال بقاعدة البيانات
const connection = mysql.createConnection({
    host: "localhost",
    user: "root",
    password: "root",
    port: "3306",
    database: "matching",
});

// الاتصال بقاعدة البيانات
connection.connect((err) => {
    if (err) {
        console.error('Error connecting to the database:', err.stack);
        return;
    }
    console.log('Connected to the database.');
});

// خدمة الملفات الثابتة
app.use(express.static(path.join(__dirname, 'public')));

// API لجلب بيانات الشركات
app.get('/api/company-details', (req, res) => {
    connection.query('SELECT * FROM company_details', (err, results) => {
        if (err) {
            console.error('Error fetching data:', err.stack);
            return res.status(500).send('Error fetching data');
        }
        res.json(results);
    });
});

// بدء تشغيل الخادم
app.listen(PORT, () => {
    console.log(`Server is running on http://localhost:${PORT}`);
});