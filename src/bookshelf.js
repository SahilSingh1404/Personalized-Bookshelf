import React, { useState, useEffect, useContext } from 'react';
import axios from 'axios';
import Box from '@mui/material/Box';
import Card from '@mui/material/Card';
import CardContent from '@mui/material/CardContent';
import Typography from '@mui/material/Typography';
import Button from '@mui/material/Button';
import { BookshelfContext } from './BookshelfContext';
import './bookshelf.css';
import Navbarnew from './Navbarnew';

const Bookshelf = () => {
    const [query, setQuery] = useState('');
    const [results, setResults] = useState(Array.from({ length: 10 })); // Initialize with 10 empty slots
    const [totalResults, setTotalResults] = useState(0);
    const [currentPage, setCurrentPage] = useState(1);
    const { addToBookshelf, removeFromBookshelf, bookshelf } = useContext(BookshelfContext);
    const [myBookshelf, setMyBookshelf] = useState([]); // State to store books added to the bookshelf
    const limitPerPage = 10;

    useEffect(() => {
        fetchResults(query, currentPage);
    }, [query, currentPage]);

    const handleChange = (e) => {
        setQuery(e.target.value);
        setCurrentPage(1); // Reset current page when query changes
    };

    const fetchResults = async (query, page) => {
        try {
            if (!query) {
                const response = await axios.get(`https://www.googleapis.com/books/v1/volumes?q=javascript&maxResults=${limitPerPage}&startIndex=${(page - 1) * limitPerPage}`);
                const books = response.data.items || [];
                setResults(books);
                setTotalResults(books.length);
            } else {
                const response = await axios.get(`https://www.googleapis.com/books/v1/volumes?q=${query}&maxResults=${limitPerPage}&startIndex=${(page - 1) * limitPerPage}`);
                const books = response.data.items || [];
                const total = response.data.totalItems || 0;
                setResults(books);
                setTotalResults(total);
            }
        } catch (error) {
            console.error('Error fetching search results:', error);
        }
    };
    
    
    const handlePrevPage = () => {
        setCurrentPage(currentPage - 1);
    };

    const handleNextPage = () => {
        setCurrentPage(currentPage + 1);
    };

    const handleToggleBookshelf = (book) => {
        if (bookshelf.some(b => b.id === book.id)) {
            removeFromBookshelf(book.id);
            setMyBookshelf(prevBookshelf => prevBookshelf.filter(b => b.id !== book.id)); // Remove from myBookshelf
        } else {
            addToBookshelf(book);
            setMyBookshelf(prevBookshelf => [...prevBookshelf, book]); // Add to myBookshelf
        }
    };

    const totalPages = Math.ceil(totalResults / limitPerPage);
    const hasNextPage = currentPage < totalPages;

    return (
        <>
            <Navbarnew />
            <div style={{ width: '80%', margin: '0 auto' }}>
                <h2>Book Search Page</h2>
                <input
                    type="text"
                    value={query}
                    onChange={handleChange}
                    placeholder="Search for a book..."
                />
                <div style={{ display: 'flex', flexWrap: 'wrap', justifyContent: 'flex-start', gap: '20px' }}>
                    {results.map((book, index) => (
                        <Box key={index} sx={{ width: 'calc(50% - 20px)', marginBottom: '20px', '@media (min-width: 600px)': { width: 'calc(33.33% - 20px)' }, '@media (min-width: 960px)': { width: 'calc(25% - 20px)' } }}>
                            <Card variant="outlined" sx={{ width: '100%', height: '100%' }}>
                                <CardContent style={{ height: '100%' }}>
                                    <Typography variant="h5" component="div">
                                        {book?.volumeInfo?.title || 'Loading...'}
                                    </Typography>
                                    <Typography sx={{ mb: 1.5 }} color="text.secondary">
                                        Author(s): {book?.volumeInfo?.authors?.join(', ') || 'Loading...'}
                                    </Typography>
                                    <Typography variant="body2">
                                        Published Year: {book?.volumeInfo?.publishedDate || 'Loading...'}
                                    </Typography>
                                    <button
                                        className='shelf'
                                        onClick={() => handleToggleBookshelf(book)}
                                        title={bookshelf.some(b => b.id === book.id) ? 'Remove from Bookshelf' : 'Add to Bookshelf'}
                                    >
                                        {bookshelf.some(b => b.id === book.id) ? 'Remove from Bookshelf' : 'Add to Bookshelf'}
                                    </button>
                                </CardContent>
                            </Card>
                        </Box>
                    ))}
                </div>
                {totalResults > limitPerPage && (
                    <div style={{ marginTop: '20px', textAlign: 'center', marginBottom: '20px' }}>
                        <Button
                            variant="contained"
                            color="primary"
                            disabled={currentPage === 1}
                            onClick={handlePrevPage}
                        >
                            Prev Page
                        </Button>
                        <span style={{ margin: '0 10px' }}>Page {currentPage}</span>
                        <Button
                            variant="contained"
                            color="primary"
                            disabled={!hasNextPage}
                            onClick={handleNextPage}
                        >
                            Next Page
                        </Button>
                    </div>
                )}
            </div>

            <div style={{ width: '80%', margin: '20px auto' }}>
                <h2>My Bookshelf</h2>
                {myBookshelf.length === 0 && <p>No books added to your bookshelf yet. Start adding books!</p>}
                <div style={{ display: 'flex', flexWrap: 'wrap', justifyContent: 'flex-start', gap: '20px' }}>
                    {myBookshelf.map((book, index) => (
                        <Box key={index} sx={{ width: 'calc(50% - 20px)', marginBottom: '20px', '@media (min-width: 600px)': { width: 'calc(33.33% - 20px)' }, '@media (min-width: 960px)': { width: 'calc(25% - 20px)' } }}>
                            <Card variant="outlined" sx={{ width: '100%', height: '100%' }}>
                                <CardContent style={{ height: '100%' }}>
                                    <Typography variant="h5" component="div">
                                        {book?.volumeInfo?.title || 'Loading...'}
                                    </Typography>
                                    <Typography sx={{ mb: 1.5 }} color="text.secondary">
                                        Author(s): {book?.volumeInfo?.authors?.join(', ') || 'Loading...'}
                                    </Typography>
                                    <Typography variant="body2">
                                        Published Year: {book?.volumeInfo?.publishedDate || 'Loading...'}
                                    </Typography>
                                </CardContent>
                            </Card>
                        </Box>
                    ))}
                </div>
            </div>
        </>
    );
};

export default Bookshelf;
