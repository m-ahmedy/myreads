import React from 'react'
import { update } from '../../BooksAPI'

export default function Book({ book }) {
    const { id, title, shelf, authors, imageLinks: { thumbnail } } = book

    function handleSelectChange (e) {
        update(book, e.target.value)
    }

    return (

        <div className="book">
            <div className="book-top">
                <div className="book-cover" style={{ width: 128, height: 193, backgroundImage: `url(${thumbnail})` }}></div>
                <div className="book-shelf-changer">
                    <select onChange={handleSelectChange} defaultValue={shelf}>
                        <option value='moveTo' disabled>Move to...</option>
                        <option value="currentlyReading">Currently Reading</option>
                        <option value="wantToRead">Want to Read</option>
                        <option value="read">Read</option>
                        <option value="none">None</option>
                    </select>
                </div>
            </div>
            <div className="book-title">{title}</div>
            <div className="book-authors">{authors && authors.length && authors.join(', ')}</div>
        </div>
    )
}
