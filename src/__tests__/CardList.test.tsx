import { render, screen } from '@testing-library/react';
import { BrowserRouter } from 'react-router-dom';
import { QueryClient, QueryClientProvider } from 'react-query';
import CardList from '../components/list/CardList';
import { Card } from '../types/typesCard';

const queryClient = new QueryClient();

const mockCards: Card[] = [
    {
        id: 1, name: 'Blue-Eyes White Dragon', type: 'Monster Card', card_images: [{
            image_url_small: 'url1',
            id: 0,
            image_url: ''
        }],
        frameType: '',
        desc: '',
        atk: 0,
        def: 0,
        level: 0,
        race: '',
        attribute: '',
        card_sets: []
    },
    {
        id: 2, name: 'Dark Magician', type: 'Spell Card', card_images: [{
            image_url_small: 'url2',
            id: 0,
            image_url: ''
        }],
        frameType: '',
        desc: '',
        atk: 0,
        def: 0,
        level: 0,
        race: '',
        attribute: '',
        card_sets: []
    }
];

test('renders "Nenhuma carta encontrada" when no cards are available', () => {
    render(
        <QueryClientProvider client={queryClient}>
            <BrowserRouter>
                <CardList cards={[]} />
            </BrowserRouter>
        </QueryClientProvider>
    );

    const noCardsMessage = screen.getByText(/Nenhuma carta encontrada/i);
    expect(noCardsMessage).toBeInTheDocument();
});

test('renders card list correctly when cards are available', () => {
    render(
        <QueryClientProvider client={queryClient}>
            <BrowserRouter>
                <CardList cards={mockCards} />
            </BrowserRouter>
        </QueryClientProvider>
    );

    const cardItems = screen.getAllByRole('img');
    expect(cardItems.length).toBe(mockCards.length);

    mockCards.forEach(card => {
        expect(screen.getByText(card.name)).toBeInTheDocument();
    });
});