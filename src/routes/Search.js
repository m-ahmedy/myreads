import _ from 'lodash'
import React, { Component } from 'react'
import { Link } from 'react-router-dom'
import { search } from '../BooksAPI'
import Book from '../components/Book'

export default class Search extends Component {
    state = {
        query: '',
        results: []
    }

    onQueryChange = (e) => {
        console.log('query change!', e.target.value)
        this.setState({ query: e.target.value })
    }

    submitQuery = (e) => {
        if (e.key === 'Enter') {
            search(this.state.query)
                .then(response => {
                    const { storedBooks } = this.props

                    const updatedResponse = response.map(book => {
                        console.log('Book id', book.id)

                        const index = storedBooks.all.findIndex(b => book.id === b.id)
                        
                        console.log(index)

                        if (index !== -1) {
                            return {
                                ...book,
                                shelf: storedBooks.all[index].shelf
                            }
                        } else {
                            return {
                                ...book,
                                shelf: 'none'
                            }
                        }
                    })

                    this.setState({ results: updatedResponse })
                })
        }
    }

    render() {
        console.log(this.state.results)

        return (
            <div className="search-books">
                <div className="search-books-bar">
                    <Link className="close-search" to='/'>Close</Link>
                    <div className="search-books-input-wrapper">

                        <input
                            value={this.state.query}
                            onChange={this.onQueryChange}
                            onKeyDown={this.submitQuery}
                            type="text"
                            placeholder="Search by title or author"
                        />

                    </div>
                </div>
                <div className="search-books-results">
                    <ol className="books-grid">
                        {this.state.results.map(book => (
                            <li key={book.id}>
                                <Book book={book} />
                            </li>
                        ))}
                    </ol>
                </div>
            </div>
        )
    }
}
