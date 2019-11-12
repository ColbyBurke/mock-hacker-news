const express = require('express')
const bodyParser = require('body-parser')
const db = require('./queries')
const PORT = 3000
const app = express()

app.use(bodyParser.json())
app.use(
    bodyParser.urlencoded({
        extended: true
    })
)
app.listen(PORT, ()=>{
    console.log(`App running on port ${PORT}`);
    
})

app.get('/', (request, response) => {
    response.json({
        info: 'Node.js, Postgres, hackernews mock site'
    })
})

app.get('/users', db.getUsers)
app.get('/users/:id', db.getUser)
app.post('/users', db.postUser)
app.put('/users/:id', db.putUser)
app.delete('/users/:id', db.deleteUser)