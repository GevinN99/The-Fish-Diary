const express = require('express');
const mongoose = require('mongoose');
const passport = require('passport');
const bodyParser = require('body-parser');
const cookieParser = require('cookie-parser');
const cors = require('cors');
const session = require('express-session');

require('dotenv').config();

const app = express();

app.use(cors({
    origin: ['http://localhost:3000'],
    methods: ['GET', 'POST', 'PUT', 'DELETE'],
    credentials: true,
}));

app.use(bodyParser.json());
app.use(express.urlencoded({ extended: false }));
app.use(cookieParser());
app.use(session({ secret: process.env.SECRET_OR_KEY, resave: false, saveUninitialized: true }));

// Passport middleware
app.use(passport.initialize());
app.use(passport.session());

require('./config/passport');

mongoose.connect(process.env.MONGO_URI, {
    useNewUrlParser: true,
    useUnifiedTopology: true
})
    .then(() => console.log('MongoDB connected'))
    .catch(err => console.log(err));

// Routes
const authRoutes = require('./routes/authRoutes');
const userRoutes = require('./routes/userRoutes');
const fishRoutes = require('./routes/fishRoutes');
const tankRoutes = require('./routes/tankRoutes');
const medicRoutes = require('./routes/medicRoutes');
const accessoryRoutes = require('./routes/accessoryRoutes');

app.use('/api/auth', authRoutes);
app.use('/api/users', userRoutes);
app.use('/api/fish', fishRoutes);
app.use('/api/tanks', tankRoutes);
app.use('/api/medics', medicRoutes);
app.use('/api/accessories', accessoryRoutes);

const PORT = process.env.PORT || 8070;
app.listen(PORT, () => console.log(`Server running on port ${PORT}`));
