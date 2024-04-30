require('dotenv').config()
const express = require("express");
const app = express();
const cors = require("cors");

let http = require('http').createServer(app);
let io = require('socket.io')(http);


const dbConnection = require('./dbConnection');
const projectRouter = require('./routers/projectRouter');



app.use(express.static(__dirname + '/public'));
app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(cors());

const port = process.env.PORT || 5500;

app.use((req, res, next) => {
    if (dbConnection.getCollection()) {
        next(); 
    } else {
        res.status(500).json({ message: 'Error connecting to DB' });  // Send error response if collection is not available
    }
});

// Use the router
app.use('/api/project', projectRouter);

http.listen(port, () => { 
    console.log(`App running at http://localhost:${port}`);
});

app.get('/addTwoNumbers/:firstNumber/:secondNumber', function(req,res,next){
    var firstNumber = parseInt(req.params.firstNumber)
    var secondNumber = parseInt(req.params.secondNumber)
    var result = firstNumber + secondNumber || null
    if(result == null) {
    res.json({result: result, statusCode: 400}).status(400)
    }
    else { res.json({result: result, statusCode: 200}).status(200) }
    })

io.on('connection', (socket) => {
    console.log('a user connected');
    socket.on('disconnect', () => {
    console.log('user disconnected');
    });
    setInterval(()=>{
        socket.emit('number', parseInt(Math.random()*10));
    }, 1000);
    });
