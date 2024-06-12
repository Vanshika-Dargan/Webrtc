const fs=require('fs');
const express = require('express');
const app=express();
const https= require('https');
const socketIO=require('socket.io');

app.use(express.static(__dirname));

const key=fs.readFileSync('cert.key');
const cert=fs.readFileSync('cert.crt');

const options={
    key,
    cert
}

const PORT=3000;
const server=https.createServer(options,app).listen(PORT,()=>{
    console.log(`Server listening on port ${PORT}`)
})

const io=socketIO(server,{
    cors:{
        origin:[
            "https://localhost"
        ],
        methods:["GET","POST"]
    }
})

