console.log('May node be with you');
const client = require('mongodb').MongoClient;
const url = "mongodb+srv://dbUser:dbUser@cluster0-4b6gs.mongodb.net/test?retryWrites=true&w=majority";
const express = require('express');
const bParser = require('body-parser');
const app = express();

app.use(bParser.urlencoded({ extended: true }))

app.listen(3000, function() {
	console.log('listening on 3000');
});

app.get('/', (req, res) => {
	res.sendFile(__dirname + '/index.html');
});
app.post('/quotes', (req, res) => {
	console.log(req.body);
});

client.connect(url, { useUnifiedTopology: true })
	.then(client => {
		console.log('Connected to Database');
	}).catch( error => console.error(error))