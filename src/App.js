import React from 'react'
// import * as BooksAPI from './BooksAPI'
import { getAll } from './BooksAPI'
import './App.css'
import { Switch, Route } from 'react-router'
import Search from './routes/Search'
import Home from './routes/Home'

class BooksApp extends React.Component {
  state = {
    shelves: [
      {
        id: 'currentlyReading',
        title: 'Currently Reading',
      },
      {
        id: 'wantToRead',
        title: 'Want to Read',
      },
      {
        id: 'read',
        title: 'Read',
      }
    ],
    books: {

    }
  }

  componentDidMount() {
    const libraryBooks = { all: []}

    getAll()
      .then(books => {
        console.log('Fetched books', books)
        books.forEach(book => {
          console.log(book.shelf)

          if (libraryBooks[book.shelf]) {
            libraryBooks[book.shelf].push(book)
          } else {
            libraryBooks[book.shelf] = [book]
          }

          libraryBooks.all.push(book)

        })

        this.setState({ books: libraryBooks })
      })

  }

  render() {
    return (
      <div className="app">
        <Switch>
          <Route path='/search' render={() => <Search storedBooks={this.state.books}/>} />
          <Route path='/' render={() => <Home shelves={this.state.shelves} storedBooks={this.state.books} />} />
        </Switch>
      </div>
    )
  }
}

export default BooksApp
