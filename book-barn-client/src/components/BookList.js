import React, {Component} from 'react';

export class BookList extends Component {
    constructor() {

        super()
    
        this.state = {
          //books will be an array filled with objects sent from the server
          books: [],
          title: '',
          genre: '',
          publisher: '',
          year: 0,
          imageurl: '',
          isUpdated:false
          }
      }
    componentDidMount() {
        let url = 'http://localhost:8080/api/books'
        fetch(url)
        .then(response => response.json())
        .then(json => {
            console.log("setting the state.")
          this.setState({
            //Sets value of the books array in the state to the json
            books: json
          })
        })
    
      }

      populateBooks() {
        console.log("POPULATE BOOKS OVAH HERE")
        let url = 'http://localhost:8080/api/books'
        fetch(url)
        .then(response => response.json())
        .then(json => {
            console.log("setting the state.")
          this.setState({
            //Sets value of the books array in the state to the json
            books: json
          })
        })
    
      }
      componentDidUpdate() {

        if(!this.state.isUpdated){
        
        let url = 'http://localhost:8080/api/books'
        fetch(url)
        .then(response => response.json())
        .then(json => {
            console.log("setting the state.")
          this.setState({
            books: json,
            isUpdated:true

          })
        } 
        )
    }
     }

    deleteClick(book) {
        // let book = {title: this.state.title, genre: this.state.genre, publisher: this.state.publisher, year: this.state.year, imageurl: this.state.imageurl}
        fetch('http://localhost:8080/api/books/delete', {
            method: 'POST',
            headers: {
            'Content-Type': 'application/json'
            },
            body: JSON.stringify({idbook:book.id})
        }).then(() => {
            this.populateBooks()
        })
        
    }

    render() {
        let books = this.state.books
        let bookItems = books.map((book) => {

          return (
            <li>{book.title} - {book.genre} - {book.year}
            <p></p><img src={book.imageurl}/> - <button onClick={() => this.deleteClick(book)}>Delete</button></li>
          )
        })
        return (
            <div>
            <h1>List Of All Books: </h1>
            <ul>{bookItems}</ul>
            </div>
        )
    }
}