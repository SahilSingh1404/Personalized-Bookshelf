// MyBookshelfPage.js
import React, { useContext } from 'react';
import { BookshelfContext } from './BookshelfContext';
import Box from '@mui/material/Box';
import Card from '@mui/material/Card';
import CardContent from '@mui/material/CardContent';
import Typography from '@mui/material/Typography';
import Navbarnew from './Navbarnew';
import Bookshelf from './bookshelf';

const MyBookshelfPage = () => {
    const { bookshelf } = useContext(BookshelfContext);

    return (
        <>
            <Navbarnew />
            <div style={{ width: '80%', margin: '20px auto' }}>
                <h2>My Bookshelf</h2>
                {bookshelf.length > 0 ? (
                    <div style={{ display: 'flex', flexWrap: 'wrap', justifyContent: 'flex-start', gap: '20px' }}>
                        {bookshelf.map((book, index) => (
                            <Box key={index} sx={{ width: 'calc(25% - 20px)', marginBottom: '20px' }}>
                                <Card variant="outlined" sx={{ width: '100%', height: '100%' }}>
                                    <CardContent style={{ height: '100%' }}>
                                        <Typography variant="h5" component="div">
                                            {book.volumeInfo.title}
                                        </Typography>
                                        <Typography sx={{ mb: 1.5 }} color="text.secondary">
                                            Author(s): {book.volumeInfo.authors && book.volumeInfo.authors.join(', ')}
                                        </Typography>
                                        <Typography variant="body2">
                                            Published Year: {book.volumeInfo.publishedDate}
                                        </Typography>
                                    </CardContent>
                                </Card>
                            </Box>
                        ))}
                    </div>
                ) : (
                    <p>No books added to your bookshelf yet. Add some books from the Book Search Page.</p>
                )}
            </div>
        </>
    );
};

export default MyBookshelfPage;
