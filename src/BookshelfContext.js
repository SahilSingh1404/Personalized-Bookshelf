import React, { createContext, useState } from 'react';

const BookshelfContext = createContext();

const BookshelfProvider = ({ children }) => {
    const [bookshelf, setBookshelf] = useState([]);

    const addToBookshelf = (book) => {
        setBookshelf(prevBookshelf => [...prevBookshelf, book]);
    };

    const removeFromBookshelf = (bookId) => {
        setBookshelf(prevBookshelf => prevBookshelf.filter(book => book.id !== bookId));
    };

    return (
        <BookshelfContext.Provider value={{ bookshelf, addToBookshelf, removeFromBookshelf }}>
            {children}
        </BookshelfContext.Provider>
    );
};

export { BookshelfContext, BookshelfProvider };
