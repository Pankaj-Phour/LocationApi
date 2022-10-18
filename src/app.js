const express = require('express');
require('dotenv').config()
const cors = require('cors');
const mongoose = require('mongoose');
const PORT = process.env.PORT || 3000

const app = express();
app.use(cors());
app.use(express.json({limit:"200mb"}));
mongoose.connect('mongodb+srv://' + (process.env.MONGO).toString(),(req, res) => {
    console.log(`Mongo db connection established: ${process.env.MONGO}`)
})


const location = mongoose.Schema({
    name:{
        type: String,
        require: true,
    },
    longitude:{
        type: Number,
        require: true
    },
    latitude:{
        type: Number,
        require: true
    }
})

const locationModel = mongoose.model('location', location);


app.get('/',(req,res)=>{
    res.send('<div style="text-align:center;"><h1>Location Api Project</h1><h3>By Pankaj Phour</h3></div>')
})

app.get('/allUsers', async (req,res)=>{
    const response = await locationModel.find().lean();
    res.status(200).send({
        error:false,
        code:200,
        message:"Success",
        response:response
    })
})

app.post('/postLocation', async (req,res)=>{
    const data = req.body;
    const user = new locationModel({
        name: data.name,
        latitude: data.latitude,
        longitude: data.longitude
    })
    user.save();

    res.status(200).send({
        error:false,
        code:200,
        message:"Success",
        response:user
    })
})










app.listen(PORT, ()=>{
    console.log(`listening on port ${PORT}`);
})