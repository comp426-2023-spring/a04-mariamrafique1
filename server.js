import parseArgs from "minimist";

//import rps, rpsls from lab3 

import { rps, rpsls } from "./lib/rpsls.js";

import express from "express";


const app = express()
let hostname = "128.0.0.1"


app.use(express.json())

//setting port at 5000 or if user chosen 
var args = parseArgs(process.argv.slice(2), {string: 'port'});


var port = ('port' in args) ? parseInt(args.port) : 5000;

//endpoint at app/ will return 200 ok
app.get('/app/', (req, res) => {
    
    res.set('Content-Type', 'text/html')
    res.status(200).send("200 OK")
})
//accept correct request 
app.get('/app/rps', (req, res) => {

    res.set('Content-Type', 'text/html')
    res.send(JSON.stringify(rps()))
})

// enpoint
app.get('/app/rpsls', (req, res) => {

    res.set('Content-Type', 'text/html')
    res.send(JSON.stringify(rpsls()))
})

app.get('/app/rps/play', (req, res) => {

    res.set('Content-Type', 'text/html')
    res.send(JSON.stringify(rps(req.query.shot)))
})

app.get('/app/rpsls/play', (req, res) => {

    res.set('Content-Type', 'text/html')
    res.send(JSON.stringify(rpsls(req.query.shot)))
})

app.post('/app/rps/play', (req, res) => {

    res.set('Content-Type', 'text/html')
    res.send(JSON.stringify(rps(req.body.shot)))
})

app.post('/app/rpsls/play', (req, res) => {

    res.set('Content-Type', 'text/html')
    res.send(JSON.stringify(rpsls(req.body.shot)))
})

app.get('/app/rps/play/:shot', (req, res) => {

    res.set('Content-Type', 'text/html')
    res.send(JSON.stringify(rps(req.params.shot)))
})

app.get('/app/rpsls/play/:shot', (req, res) => {

    res.set('Content-Type', 'text/html')
    res.send(JSON.stringify(rpsls(req.params.shot)))
})
//default endpount - error 
app.use((req, res, next) => {
    res.status(404).send("404 NOT FOUND")
})

// creating/runnign server  
app.listen(port, () => {
    console.log(`Listening on port ${port}`);
})