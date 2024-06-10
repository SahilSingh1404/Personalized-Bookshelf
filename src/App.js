// App.js
import React from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import LoginPage from './LoginPage';
import SignupPage from './SignupPage';
import Bookshelf from './bookshelf';
import { BookshelfProvider } from './BookshelfContext';
import './App.css';

const App = () => {
    return (
        <BookshelfProvider>
            <Router>
                <div className="App">
                    <Routes>
                        <Route path="/" element={<SignupPage />} />
                        <Route path="/login" element={<LoginPage />} />
                        <Route path="/book" element={<Bookshelf />} />
                        <Route exact path="/" element={<h1>Welcome to my App</h1>} />
                    </Routes>
                </div>
            </Router>
        </BookshelfProvider>
    );
};

export default App;
