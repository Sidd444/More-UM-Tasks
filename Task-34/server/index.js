const express=require('express');
const cors=require('cors')
const userModel=require('./models/userModel');
const mongoose=require('mongoose');
const bodyParser=require('body-parser');

const app=express();
const port=4000;

app.use(cors());
app.use(bodyParser.json());

const mongoUri="mongodb+srv://sid:9fo93AO8jzlGpnv6@clust.wocso.mongodb.net/?retryWrites=true&w=majority&appName=clust"

mongoose.connect(mongoUri, {
    useNewUrlParser: true,
    useUnifiedTopology: true,
})
.then(() => console.log('Connected to MongoDB Atlas'))
.catch((error) => console.error('MongoDB connection error:', error));


app.post('/', async (req, res) => {
    try {
        const { name, email, phoneNumber } = req.body;
        const newUser = new userModel({ name, email, phoneNumber });
        const savedUser = await newUser.save();
        res.status(201).json({
            message: `User with name ${name} created successfully`,
            data: savedUser
        });
    } catch (error) {
        res.status(500).json({ error: 'Error creating user', details: error.message });
    }
});


app.get('/', async (req, res) => {
    try {
        const allUsers = await userModel.find({});
        res.status(200).json(allUsers);
    } catch (error) {
        res.status(500).json({ error: 'Error retrieving users', details: error.message });
    }
});


app.listen(port, () => {
    console.log(`Server is running on port ${port}`);
});