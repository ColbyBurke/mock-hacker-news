const Pool = require('pg').Pool
const pool = new Pool({
    host: 'localhost',
    database: 'hackernews',
    port: 5432
})

const getUser = (request, response) => {
    const id = parseInt(request.params.id)
    pool.query('SELECT * FROM users WHERE id = $1', [id], (error, results) => {
        if(error){
            throw(error)
        }
        response.status(200).json(results.rows)
    })
}

const postUser = (request, response) => {
    const {username, password} = request.body
    pool.query('INSERT INTO users (username, password) VALUES ($1, $2)',[username, password], (error, result) => {
        if(error){
            throw(error)
        }
        response.status(200).send(`POSTED USER: ${result}`)
    })
}

const getUsers = (request, response) => {
    pool.query('SELECT * FROM users ORDER BY id ASC',(error, results) => {
        console.log('INSIDE GET USERS');
        if(error){
            throw(error)
        }
        response.status(200).json(results.rows)
    })
}

const putUser = (request, response) => {
    const id = parseInt(request.params.id)
    const {username, password} = request.body
    pool.query('UPDATE users SET username = $1, password = $2 WHERE id = $3',[username, password, id], (error, result) => {
        if(error){
            throw(error)
        }
        response.status(200).send(`user Modified With Id ${id} for ${result}`)
    })
}

const deleteUser = (request, response) => {
    const id = parseInt(request.params.id)
    
    pool.query('DELETE FROM users WHERE id = $1',[id], (error, result) => {
        if(error){
            throw(error)
        }
        response.status(200).send(`User DELETED With Id ${id} for ${result}`)
    })
}

module.exports = {getUser, postUser, getUsers, putUser, deleteUser}

