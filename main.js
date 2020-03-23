function displayComments() {
    getComments('http://localhost:3000/comments')
}

async function getComments (url){
    let myPromise = await fetch(url)
    let myReponse = await myPromise.json()
    console.log('Response');
    

    document.getElementById('comments').innerHTML = 'Comments: ' + myReponse.map(x => x.comment + '<br/>' + 'User: ' +  x.userid)
}

function displayArticles(){
    getArticles('http://localhost:3000/articles')
}

async function getArticles(url){
    let myPromise = await fetch(url)
    let myReponse = await myPromise.json()
    console.log('Response');
    document.getElementById('articles').innerHTML = '<ol>' + myReponse.map(x => '<li>' + x.title + ` (${x.subtitle})` + '<br/>' + '</li>').reverse().join('') + '</ol>'
}