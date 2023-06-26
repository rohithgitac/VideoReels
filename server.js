import express from 'express'

import db from './connection.js'
import video from './model.js';
import dotenv from 'dotenv'
//Config
dotenv.config()
const app = express()
db();
const PORT = process.env.PORT || 9000
//Middleware
app.use(express.json())
app.use((req,res,next) => {
    res.setHeader('Access-Control-Allow-Origin','*')
    res.setHeader('Access-Control-Allow-Headers','*')
    next()
})

//End points
app.get('/',(req,res)=> {
    res.send('HI world......')
})
app.get('/tiktok',async(req,res) => {
    try {
        const allVideo = await video.find()
        res.status(200).json(allVideo)
    } catch (error) {
        console.log(error)
        res.status(500).send('First page internal server error');
    }
})
app.post('/tiktok',async(req,res) => {
    try {
        
        const bestVideo = req.body;
        const vid = await new video(bestVideo)
        await vid.save().then(console.log('Added to database'))
        const allVideo = await video.find()
        res.status(200).json(allVideo)
    } catch (error) {
        console.log(error.message)
        res.status(500).send('Internal server error...!!')
        
    }
    
})

app.get('/delete/:id',async(req,res) => {
    try {
        
        const videoId = req.params.id;
        const outDelete = await video.findOneAndDelete({_id:videoId})
        const updated = await video.find()
        res.status(200).json(updated)
    } catch (error) {
        console.log(error);
        res.status(404).send('video not found..!')
    }
})

app.listen(PORT,()=> {
    console.log(`Server running on port ${PORT}`)
})