import React from 'react';
import ReactDOM from 'react-dom/client';
import { BrowserRouter, Route, Routes } from 'react-router';
import AlgorithmProvider from './components/algorithm-provider';
import Header from './components/layout/header';
import './index.css';
import PathFinderApp from './path-finder-app';

import reportWebVitals from './reportWebVitals';
import SortingApp from './sorting-app';

const root = ReactDOM.createRoot(
    document.getElementById('root') as HTMLElement
);

root.render(
    <React.StrictMode>
        <BrowserRouter>
            <AlgorithmProvider>
                <Header />
                <Routes>
                    <Route path='/' element={<PathFinderApp />} />
                    <Route path='/sort' element={<SortingApp />} />
                </Routes>
            </AlgorithmProvider>
        </BrowserRouter>
    </React.StrictMode>
);

// If you want to start measuring performance in your app, pass a function
// to log results (for example: reportWebVitals(console.log))
// or send to an analytics endpoint. Learn more: https://bit.ly/CRA-vitals
reportWebVitals();
