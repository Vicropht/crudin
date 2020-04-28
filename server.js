const client = require('mongodb').MongoClient
const url = "mongodb+srv://dbUser:dbUser@quotes-4b6gs.mongodb.net/test?retryWrites=true&w=majority"
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
		app.use(bParser.json())
		app.listen(3000, function() {
			console.log('listening on 3000')
		})
		
		app.get('/', (req, res) => {
			db.collection('quotes').find().toArray().then(results => {
				res.render('index.ejs', { quotes: results })
			})
		})
		app.post('/quotes', (req, res) => {
			quotesCollection.insertOne(req.body).then(result => {
				res.redirect('/')
			}).catch(error => console.error(error))
		})
		app.put('/quotes', (req, res) => {
			console.log(req)
		})
}).catch( error => console.error(error))
