const Pool = require('pg').Pool
const path = require('path')
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

const getArticle = (request, response) => {
    const id = parseInt(request.params.id)
    pool.query('SELECT * FROM articles WHERE id = $1', [id], (error, results) => {
        if(error){
            throw(error)
        }
        response.status(200).json(results.rows)
    })
}

const getArticles = (request, response) => {
    pool.query('SELECT * FROM articles ORDER BY id ASC',(error, results) => {
        console.log('INSIDE GET ARTICLES');
        if(error){
            throw(error)
        }
        response.status(200).json(results.rows)
    })
}

const postArticle = (request, response) => {
    const {title, subtitle, link, userid} = request.body
    pool.query('INSERT INTO articles (title, subtitle, link, userid) VALUES ($1, $2, $3, $4)',[title, subtitle, link, userid], (error, result) => {
        if(error){
            throw(error)
        }
        response.status(200).send(`POSTED ARTICLE: ${result}`)
    })
}

const putArticle = (request, response) => {
    const id = parseInt(request.params.id)
    const {title, subtitle, link, userid} = request.body
    pool.query('UPDATE articles SET title = $1, subtitle = $2, link = $3, userid = $4 WHERE id = $5',[title, subtitle, link, userid, id], (error, result) => {
        if(error){
            throw(error)
        }
        response.status(200).send(`Article Modified With Id ${id} for ${result}`)
    })
}

const deleteArticle = (request, response) => {
    const id = parseInt(request.params.id)
    
    pool.query('DELETE FROM articles WHERE id = $1',[id], (error, result) => {
        if(error){
            throw(error)
        }
        response.status(200).send(`Article DELETED With Id ${id} for ${result}`)
    })
}

const getComment= (request, response) => {
    const id = parseInt(request.params.id)
    pool.query('SELECT * FROM comments WHERE id = $1', [id], (error, results) => {
        if(error){
            throw(error)
        }
        response.status(200).json(results.rows)
    })
}

const getComments = (request, response) => {
    pool.query('SELECT * FROM comments ORDER BY id ASC',(error, results) => {
        console.log('INSIDE GET COMMENTS');
        if(error){
            throw(error)
        }
        response.status(200).json(results.rows)
    })
}

const postComment = (request, response) => {
    const {comment, userid, articles} = request.body
    let time = new Date()
    pool.query('INSERT INTO comments (time, comment, userid, articles) VALUES ($1, $2, $3, $4)',[time, comment, userid, articles], (error, result) => {
        if(error){
            throw(error)
        }
        response.status(200).send(`POSTED COMMENT: ${result}`)
    })
}

const putComment = (request, response) => {
    const id = parseInt(request.params.id)
    const {comment, userid, articles} = request.body
    const time = new Date()
    pool.query('UPDATE comments SET time = $1, comment = $2, userid = $3, articles = $4  WHERE id = $5',[time, comment, userid, articles, id], (error, result) => {
        if(error){
            throw(error)
        }
        response.status(200).send(`Comment Modified With Id ${id} for ${result}`)
    })
}

const deleteComment = (request, response) => {
    const id = parseInt(request.params.id)
    
    pool.query('DELETE FROM comments WHERE id = $1',[id], (error, result) => {
        if(error){
            throw(error)
        }
        response.status(200).send(`Comment DELETED With Id ${id} for ${result}`)
    })
}

const getIndexPage = async (request, response) => {
    try{
        console.log('SEND HTML')
        response.sendFile(path.join(__dirname + '/index.html'))
    }catch(error){
        response.status(500).send(error)
    }
}

const getCSS = async (request, response) => {
    try{
        console.log('SEND CSS')
        response.sendFile(path.join(__dirname + '/index.css'))
    }catch(error){
        response.status(500).send(error)
    }
}

const getJS = async (request, response) => {
    try{
        console.log('SEND JS')
        response.sendFile(path.join(__dirname + '/main.js'))
    }catch(error){
        response.status(500).send(error)
    }
}


module.exports = {getJS, getIndexPage, getCSS, deleteComment,putComment,postComment,getComment,getComments,deleteArticle, putArticle ,getUser, postUser, getUsers, putUser, deleteUser, getArticle, postArticle, getArticles}

