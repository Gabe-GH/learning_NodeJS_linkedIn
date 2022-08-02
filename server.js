const express = require('express');
const bodyParser = require('body-parser');
const app = express();
const http = require('http').Server(app);
const io = require('socket.io')(http);
const mongoose = require('mongoose');

mongoose.Promise = Promise;

const dbURL = 'mongodb+srv://user:user@cluster0.ey8ve.mongodb.net/?retryWrites=true&w=majority'
const PORT = process.env.PORT || 3000


const Message = mongoose.model('Message', {
    name: String,
    message: String
})

app.use(express.static(__dirname))
app.use(bodyParser.json())
app.use(bodyParser.urlencoded({
    extended: false
}))

app.get('/messages', (req,res) => {
    Message.find({}, (err, messages) => {
        res.send(messages);
    })
})

app.get('/messages/:user', (req,res) => {

    const user = req.params.user;

    Message.find({name: user}, (err, messages) => {
        res.send(messages);
    })
})

app.post('/messages', async (req,res) => {
    try {
        const message = new Message(req.body);
        const savedMessage = await message.save();
                
        console.log(`saved`);

        const censored = await Message.findOne({message:'badword'});
        
        if(censored) {await Message.deleteOne({_id: censored.id});}

        else {io.emit('message', req.body);}
            
        res.sendStatus(200);

    } catch (error) {
        res.sendStatus(500);
        return console.error(error);
    } finally {
        console.log(`message post called`)
    }
})



io.on('connection', (socket) => {
    console.log('a user connected');
})

mongoose.connect(dbURL, (err) => {
    console.log('mongo db connection', err)
})

http.listen(3000, () => {
    console.log(`server listening on ${PORT}`);
})