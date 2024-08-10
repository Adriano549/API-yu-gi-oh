import { render, screen } from '@testing-library/react';
import { BrowserRouter } from 'react-router-dom';
import Nav from '../components/header/header';

test('renders Home link', () => {
    render(
        <BrowserRouter>
            <Nav />
        </BrowserRouter>
    );
    const homeLink = screen.getByText(/Home/i);
    expect(homeLink).toBeInTheDocument();
});

test('renders Yu-gi-oh! Cards link', () => {
    render(
        <BrowserRouter>
            <Nav />
        </BrowserRouter>
    );
    const cardsLink = screen.getByText(/Yu-gi-oh! Cards/i);
    expect(cardsLink).toBeInTheDocument();
});