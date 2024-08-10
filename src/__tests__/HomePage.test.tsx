import { render, screen } from '@testing-library/react';
import { BrowserRouter } from 'react-router-dom';
import HomePage from '../components/apresentacao/Home';

test('renders WelcomeMessage component', () => {
    render(
        <BrowserRouter>
            <HomePage />
        </BrowserRouter>
    );
    const welcomeMessage = screen.getByText(/Bem-vindo ao Yu-Gi-Oh Card Viewer/i);
    expect(welcomeMessage).toBeInTheDocument();
});

test('renders Description component', () => {
    render(
        <BrowserRouter>
            <HomePage />
        </BrowserRouter>
    );
    const firstParagraph  = screen.getByText(/Esta aplicação utiliza a API do Yu-Gi-Oh para buscar e exibir cartas do jogo/i);
    expect(firstParagraph ).toBeInTheDocument();
    const secondParagraph = screen.getByText(/Estamos utilizando o Material-UI para estilização e o React Query para gerenciar as requisições à API./i);
    expect(secondParagraph).toBeInTheDocument();
});

test('renders button to view cards', () => {
    render(
        <BrowserRouter>
            <HomePage />
        </BrowserRouter>
    );
    const button = screen.getByRole('link', { name: /Ver Cartas/i });
    expect(button).toBeInTheDocument();
});

test('renders Kuriboh image', () => {
    render(
        <BrowserRouter>
            <HomePage />
        </BrowserRouter>
    );
    const kuribohImage = screen.getByAltText('');
    expect(kuribohImage).toBeInTheDocument();
});