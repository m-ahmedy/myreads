import React, { Component } from 'react'
import Header from '../components/layout/Header'
import Shelf from '../components/Shelf'
import LinkToSearch from '../components/LinkToSearch'

export default class Home extends Component {
    render() {
        const { shelves, storedBooks } = this.props

        return (
            <div className="list-books">
                <Header />
                <div className="list-books-content">
                    <div>
                        {shelves && shelves.map(shelf => (
                            <Shelf
                                key={shelf.id}
                                id={shelf.id}
                                title={shelf.title}
                                books={storedBooks && storedBooks[shelf.id]}
                            />
                        ))}
                    </div>
                    <LinkToSearch />
                </div>
            </div>
        )
    }
}
