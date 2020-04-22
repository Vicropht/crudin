console.log('May node be with you')
const client = require('mongodb').MongoClient
const url = "mongodb+srv://dbUser:dbUser@cluster0-4b6gs.mongodb.net/test?retryWrites=true&w=majority"
const express = require('express')
const bParser = require('body-parser')
const app = express()

client.connect(url, { useUnifiedTopology: true })
	.then(client => {
		console.log('Connected to Database')
		const db = client.db('dbQuotes')
		const quotesCollection = db.collection('quotes')
		app.set('view engine', 'ejs')
		app.use(express.static('public'))
		app.use(bParser.urlencoded({ extended: true }))
		app.listen(3000, function() {
			console.log('listening on 3000')
		})
		app.get('/', (req, res) => {
			/*const cursor = db.collection('quotes').find()
			console.log(cursor)
			res.sendFile(__dirname + '/index.html')*/
			db.collection('quotes').find().toArray()
    		.then(results => {
				  res.render('index.ejs', { quotes: results })
			})
		})
		app.post('/quotes', (req, res) => {
			quotesCollection.insertOne(req.body)
			.then(result => {
				res.redirect('/')
			})
			.catch(error => console.error(error))
		})
})
.catch( error => console.error(error))
