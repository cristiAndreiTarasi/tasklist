const express = require('express');
const cors = require('cors');
const bodyParser = require('body-parser');
const authRoutes = require('./routes/authRoutes');
const taskRoutes = require('./routes/taskRoutes');
require('dotenv').config();
const mongoose = require('mongoose');
const mongodb = require('mongodb');

const port = process.env.PORT || 8000;
const app = express();

mongoose.connect(/* process.env.MONGO_SRV */ 'mongodb://localhost/Taskist', { 
    useUnifiedTopology: true, 
    useNewUrlParser: true,
    useCreateIndex: true,
    useFindAndModify: false
})
    .then(() => {
        console.log('Connected to DB');
        app.listen(port, () => console.log(`Server listening on port ${port}`));
    })
    .catch((error) => console.log(`DB Connection error: ${error}`));

app.use(bodyParser.urlencoded({ extended: false }));
app.use(bodyParser.json());

app.use(cors());

app.use('/api', authRoutes);
app.use('/api', taskRoutes);
