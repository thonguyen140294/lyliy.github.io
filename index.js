const express = require('express');
const app = express();
const path = require('path');
const results = [];

app.set('view engine', 'ejs');
app.set('views', path.join(__dirname, 'views'));
app.use(express.static(path.join(__dirname, 'public')));

app.get('/', (req, res) => {
    res.render('index', { results: results });
});
app.get('/viet-quick-check', (req, res) => {
    res.render('viet-quick-check', { results: results });
});
app.get('/han-quick-check', (req, res) => {
    res.render('han-quick-check', { results: results });
});

module.exports = app;