import express from 'express';
import bodyParser from 'body-parser';
import db from './models/index.js';
import authRoutes from './routes/auth.route.js';
import bookRoutes from './routes/book.route.js';

const app = express();

app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));

db.sequelize.sync();

app.use('/api/auth', authRoutes);
app.use('/api/books', bookRoutes);

const PORT = 9999;
app.listen(PORT, () => {
    console.log(`Server is running on port ${PORT}.`);
});
