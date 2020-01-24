const express = require('express')
const bodyParser = require('body-parser')
const cors = require('cors')
const bcryptjs = require('bcryptjs')
const knex = require('knex')

const signup = require('./controllers/signup')
const signin = require('./controllers/signin')
const profile = require('./controllers/profile')
const entryUpdate = require('./controllers/entryUpdate')


const app = express()
app.use(bodyParser.json())
app.use(cors())

const dbaseSql = knex({
    client: 'pg',
    connection: {
        connectionString: process.env.DATABASE_URL,
        ssl: true,
    }
})

app.get('/', (req, res) => { res.send('The get request is received successfully') })
app.get('/profile/:id', (req, res) => { profile.profileGet(req, res, bcryptjs, dbaseSql) })
app.post('/signin', (req, res) => { signin.handleSignin(req, res, bcryptjs, dbaseSql) })
app.post('/signup', (req, res) => { signup.handleSignup(req, res, bcryptjs, dbaseSql) })

app.put('/updatefavorites', (req, res) => { entryUpdate.updateFavorites(req, res, dbaseSql) })


app.listen(process.env.PORT || 3100, () => {
    //app.listen(3100, () => {
        console.log("Express server listening");
})