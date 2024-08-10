import { render, screen, fireEvent, waitFor } from '@testing-library/react';
import { BrowserRouter } from 'react-router-dom';
import { QueryClient, QueryClientProvider } from 'react-query';
import CardMonsters from '../components/renderCards/yugi';
import useCardFilter from '../hooks/useCardFilter';
import { vi } from 'vitest';
import { Card } from '../types/typesCard';
 // Ajuste o caminho conforme necessário

vi.mock('../hooks/useCardFilter');
vi.mock('../components/filter/CardFilter', () => ({
    default: ({ cardTypes, selectedTypes, onTypeChange }: { cardTypes: string[], selectedTypes: Set<string>, onTypeChange: (event: React.ChangeEvent<HTMLInputElement>) => void }) => (
        <div>
            {cardTypes.map(type => (
                <label key={type}>
                    <input type="checkbox" checked={selectedTypes.has(type)} onChange={onTypeChange} value={type} />
                    {type}
                </label>
            ))}
        </div>
    )
}));
vi.mock('../components/list/CardList', () => ({
    default: ({ cards }: { cards: Card[] }) => (
        <ul>
            {cards.length === 0 ? (
                <li>Nenhuma carta encontrada.</li>
            ) : (
                cards.map(card => (
                    <li key={card.id}>{card.name}</li>
                ))
            )}
        </ul>
    )
}));

const queryClient = new QueryClient();

const mockUseCardFilter = useCardFilter as jest.MockedFunction<typeof useCardFilter>;

beforeEach(() => {
    // Mocka a função fetchCards
    vi.mock('../../api/cardApi', () => ({
        fetchCards: vi.fn().mockResolvedValue([{ id: 1, name: 'Blue-Eyes White Dragon', type: 'Monster Card', card_images: [{ image_url_small: 'url' }] }])
    }));

    mockUseCardFilter.mockReturnValue({
        filter: '',
        setFilter: vi.fn(),
        selectedTypes: new Set(),
        handleFilterChange: vi.fn(),
    });
});

test('renders search input', async () => {
    render(
        <QueryClientProvider client={queryClient}>
            <BrowserRouter>
                <CardMonsters />
            </BrowserRouter>
        </QueryClientProvider>
    );

    // Aguarda até que o carregamento termine
    await waitFor(() => expect(screen.queryByRole('progressbar')).not.toBeInTheDocument());

    const searchInput = screen.getByLabelText(/Pesquisar carta/i);
    expect(searchInput).toBeInTheDocument();
});

test('renders card list', async () => {
    render(
        <QueryClientProvider client={queryClient}>
            <BrowserRouter>
                <CardMonsters />
            </BrowserRouter>
        </QueryClientProvider>
    );

    // Aguarda até que o carregamento termine
    await waitFor(() => expect(screen.queryByRole('progressbar')).not.toBeInTheDocument());

    const cardList = await screen.findByRole('list');
    expect(cardList).toBeInTheDocument();
});

test('renders cards after search', async () => {
    mockUseCardFilter.mockReturnValue({
        filter: 'Blue-Eyes White Dragon',
        setFilter: vi.fn(),
        selectedTypes: new Set(),
        handleFilterChange: vi.fn(),
    });

    render(
        <QueryClientProvider client={queryClient}>
            <BrowserRouter>
                <CardMonsters />
            </BrowserRouter>
        </QueryClientProvider>
    );

    // Aguarda até que o carregamento termine
    await waitFor(() => expect(screen.queryByRole('progressbar')).not.toBeInTheDocument());

    const searchInput = screen.getByLabelText(/Pesquisar carta/i);
    fireEvent.change(searchInput, { target: { value: 'Blue-Eyes White Dragon' } });

    await waitFor(() => {
        const cardItems = screen.getAllByText(/Blue-Eyes White Dragon/i);
        expect(cardItems.length).toBeGreaterThan(0);
    });
});

test('renders no results message when no results', async () => {
    mockUseCardFilter.mockReturnValue({
        filter: 'Nonexistent Card',
        setFilter: vi.fn(),
        selectedTypes: new Set(),
        handleFilterChange: vi.fn(),
    });

    render(
        <QueryClientProvider client={queryClient}>
            <BrowserRouter>
                <CardMonsters />
            </BrowserRouter>
        </QueryClientProvider>
    );

    // Aguarda até que o carregamento termine
    await waitFor(() => expect(screen.queryByRole('progressbar')).not.toBeInTheDocument());

    const searchInput = screen.getByLabelText(/Pesquisar carta/i);
    fireEvent.change(searchInput, { target: { value: 'Nonexistent Card' } });

    await waitFor(() => {
        const noResultsMessage = screen.getByText(/Nenhuma carta encontrada/i);
        expect(noResultsMessage).toBeInTheDocument();
    });
});

