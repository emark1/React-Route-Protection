import React,{Component} from 'react';
import logo from './logo.svg';
import './App.css';
import Login from './components/Login'

// In this assignment you are going to create a custom API using NodeJS which will perform CRUD operations on a database. You can use any database you want. 
// - Allow the user to add new books 
// - Allow the user to view all books 
// - Allow the user to delete books 
// - Allow the user to update books 
// - Create separate pages for adding, viewing the books using React Router 
// - Allow the user to filter books based on the genre


class App extends Component {
  render() {
  return (
      <div>
        <h1>HOME PAGE</h1>
        <Login />
        <img src="https://www.realtymonks.com/wp-content/uploads/2018/01/Smart-Home-Buyers.jpg" />
        

      </div>
    )
  }
}

export default App;
