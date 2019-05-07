const express = require('express')
const app = express()
const cors = require('cors')
const bodyParser = require('body-parser')
const models = require('./models')
const jwt = require('jsonwebtoken')

//We need cors so the browser will allow us to interact between sites, otherwise it will flag as a security risk
app.use(cors())
app.use(bodyParser.json())

//Array of book objects
let books = [
    {title: "1Q84", genre: "fiction", publisher: "Shinochosha", year: "2009", imageurl: "https://upload.wikimedia.org/wikipedia/en/b/b9/1Q84bookcover.jpg"},
    {title: "Brave New World", genre: "fiction", publisher: "Perennial", year: "1932", imageurl: "https://upload.wikimedia.org/wikipedia/en/thumb/6/62/BraveNewWorld_FirstEdition.jpg/220px-BraveNewWorld_FirstEdition.jpg"}
]

const users = [
  {username: 'eric', password: 'eric'}
]

app.post('/login',(req, res) => {

  let username = req.body.username
  let password = req.body.password

  let user =  users.find((user) => {
    return user.username == username && user.password == password
  })

  if(user) {
    // user exists and have correct password

    jwt.sign({ username: username }, 'pinkflamingo', function(err, token) {

        if(token) {
          res.json({token: token})
        } else {
          res.status(500).json({message: 'Can\t do that token bud'})
        }

    });

  }

})
//Respond with a json of the books array when a request is sent on /api/books
// app.get('/api/books',(req,res) => {
//     res.json(books)
// })
app.post('/api/books/delete',(req,res) => {
  let id = req.body.idbook
  console.log("HEY OVER HERE")
  console.log(id)
  models.Book.destroy({
    where: {
      id: id
    }
  }).then(() => {
    res.json({success: true, message: "BOOK ELIMINATED"})
  })
})

function authentication(req,res,next) {
  let headers = req.headers["authorization"]
  let token = headers.split(' ')[1]

  jwt.verify(token,'pinkflamingo',(err,decoded) => {
    if(decoded) {
      if(decoded) {
      next()
    } else {
      res.status(401).json({messages: 'Bad token bud'})
    }
  } else {
    res.status(401).json({messages: 'Bad token bud'})
  }
  })
}

app.get('/api/books',(req,res) => {
  models.Book.findAll().then((books) => res.json(books))
 })

app.post('/api/books',(req,res) => {

  
    let title = req.body.title
    let genre = req.body.genre
    let publisher = req.body.publisher
    let year = req.body.year
    let imageurl = req.body.imageurl

    let book = models.Book.build({
      title: title,
      genre: genre,
      publisher: publisher,
      year: year,
      imageurl: imageurl
    })
    
    book.save().then((savedBook) => {
      console.log(savedBook)
    })
    .then(() => {
      console.log("Ay pretty good")
    }).then(() =>{
    books.push({title: title, genre: genre, publisher: publisher, year: year, imageurl: imageurl})
    res.json({success: true, message: 'Book was added!'})
  })
})


app.listen(8080,() => {
    console.log('Server is running')
  })