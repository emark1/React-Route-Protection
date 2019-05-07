import React, {Component} from 'react';
import {Link, NavLink} from 'react-router-dom'
 
export class AddBook extends Component {

    constructor() {

        super()
    
        this.state = {
          //books will be an array filled with objects sent from the server
          books: [],
          title: '',
          genre: '',
          publisher: '',
          year: 0,
          imageurl: ''
          }
      }
      
    handleTextBoxChange = (e) => {
    this.setState({
        [e.target.name]: e.target.value
    })
    }

    handleSaveBookClick = () => {
    let book = {title: this.state.title, genre: this.state.genre, publisher: this.state.publisher, year: this.state.year, imageurl: this.state.imageurl}
    fetch('http://localhost:8080/api/books', {
        method: 'POST',
        headers: {
        'Content-Type': 'application/json'
        },
        body: JSON.stringify(book)
    })
    }
    
    render() {
        return (
        <div>
            <h1>Add a book: </h1>
            <input type="text" onChange={this.handleTextBoxChange} placeholder="Enter title" name="title" />
            <input type="text" onChange={this.handleTextBoxChange} placeholder="Enter genre" name="genre" />
            <input type="text" onChange={this.handleTextBoxChange} placeholder="Enter publisher" name="publisher" />
            <input type="text" onChange={this.handleTextBoxChange} placeholder="Enter year" name="year" />
            <input type="text" onChange={this.handleTextBoxChange} placeholder="Enter imageurl" name="imageurl" />
            <button onClick={this.handleSaveBookClick}><Link to="/view-all-books">Save</Link></button>
        </div>
        )
    }
}