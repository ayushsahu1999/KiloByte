const express = require('express');
const mongoConnect = require('./util/database').mongoConnect;

const authRoutes = require('./routes/auth');
const customerRoutes = require('./routes/customer');

const app = express();

app.use(express.urlencoded({extended: true}));
app.use(express.json());

app.use('/auth', authRoutes);
app.use('/cust', customerRoutes);

app.use((error, req, res, next) => {
    console.log('showing error');
    console.log(error);
    const status = error.statusCode || 500;
    const message = error.message;
    const data = error.data;
    res.status(status).json({ message: message, status: status });
});

mongoConnect(() => {
    app.listen(3000, () => {
        console.log('App started successfully');
    });
});
