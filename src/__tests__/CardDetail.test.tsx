import { render, screen, fireEvent, waitFor } from '@testing-library/react';
import { BrowserRouter } from 'react-router-dom';
import { QueryClient, QueryClientProvider } from 'react-query';
import CardMonsters from '../components/renderCards/yugi';
import useCardFilter from '../hooks/useCardFilter';
import { vi } from 'vitest';
import { Card } from '../types/typesCard';

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
    vi.mock('../../api/cardApi', () => ({
        fetchCards: vi.fn().mockResolvedValue([
            { id: 1, name: 'Blue-Eyes White Dragon', type: 'Monster Card', card_images: [{ image_url_small: 'url' }] },
            { id: 2, name: 'Dark Magician', type: 'Spell Card', card_images: [{ image_url_small: 'url' }] }
        ])
    }));

    mockUseCardFilter.mockReturnValue({
        filter: '',
        setFilter: vi.fn(),
        selectedTypes: new Set(),
        handleFilterChange: vi.fn(),
    });
});

test('calls onTypeChange when a checkbox is changed', async () => {
    render(
        <QueryClientProvider client={queryClient}>
            <BrowserRouter>
                <CardMonsters />
            </BrowserRouter>
        </QueryClientProvider>
    );

    await waitFor(() => expect(screen.getByLabelText('Spell Card')).toBeInTheDocument());

    const checkbox = screen.getByLabelText('Spell Card') as HTMLInputElement;
    fireEvent.click(checkbox);

    const { handleFilterChange } = useCardFilter();
    expect(handleFilterChange).toHaveBeenCalled();
    expect(handleFilterChange).toHaveBeenCalledWith(expect.objectContaining({
        target: expect.objectContaining({
            value: 'Spell Card'
        })
    }));
});