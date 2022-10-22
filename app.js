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

const userRecordVideo = mongoose.Schema({
    name:{
        type: String,
        require:true
    },
    data:{
        type:String,
        require:true
    }
})

const locationModel = mongoose.model('location', location);
const userRecordVideoModel = mongoose.model('userRecordVideo', userRecordVideo);



app.get('/',(req,res)=>{
    res.send('<div style="display:flex;justify-content:center;align-items:center;width:100%;height:100%;background-size:cover;background-repeat:no-repeat;flex-direction:column;background:url(https://www.myfreewalls.com/public/uploads/preview/dark-world-map-hd-wallpaper-background-11653063897b8qurtwcxt.jpg);padding:0px;margin:0px;overflow:hidden;color:white;"><h1>Location Api Project</h1><h3>By Pankaj Phour</h3></div>')
})

app.get('/allUsers',  async (req,res)=>{
    const response = await locationModel.find().lean();
    // console.log(response);
    res.status(200).send({
        error:false,
        code:200,
        message:"Success",
        response:response
    })
})


app.get('/allUsersVideos',  async (req,res)=>{
    const response = await userRecordVideoModel.find().lean();
    // console.log(response);
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


app.post('/postVideo', async (req,res)=>{
    const data = req.body;
    const user = new userRecordVideoModel({
        name: data.name,
        data: data.data
    })
    user.save();

    res.status(200).send({
        error:false,
        code:200,
        message:"Success",
        response:"Hello " + user.name + 'Your video is saved successfully.'
    })
})










app.listen(PORT, ()=>{
    console.log(`listening on port ${PORT}`);
})