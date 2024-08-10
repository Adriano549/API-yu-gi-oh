import { render, screen, fireEvent } from '@testing-library/react';
import CardFilter from '../components/filter/CardFilter';
import { vi } from 'vitest';

describe('CardFilter', () => {
    const cardTypes = ['Monster Card', 'Spell Card', 'Trap Card'];
    const selectedTypes = new Set(['Monster Card']);
    const onTypeChange = vi.fn();

    beforeEach(() => {
        vi.clearAllMocks();
    });

    test('renders checkboxes for each card type', () => {
        render(<CardFilter cardTypes={cardTypes} selectedTypes={selectedTypes} onTypeChange={onTypeChange} />);

        cardTypes.forEach(type => {
            const checkbox = screen.getByLabelText(type);
            expect(checkbox).toBeInTheDocument();
        });
    });

    test('checkboxes are checked based on selectedTypes', () => {
        render(<CardFilter cardTypes={cardTypes} selectedTypes={selectedTypes} onTypeChange={onTypeChange} />);

        cardTypes.forEach(type => {
            const checkbox = screen.getByLabelText(type) as HTMLInputElement;
            if (selectedTypes.has(type)) {
                expect(checkbox.checked).toBe(true);
            } else {
                expect(checkbox.checked).toBe(false);
            }
        });
    });

    test('calls onTypeChange when a checkbox is changed', () => {
        render(<CardFilter cardTypes={cardTypes} selectedTypes={selectedTypes} onTypeChange={onTypeChange}/>);
    
        const checkbox = screen.getByLabelText('Spell Card') as HTMLInputElement;
        fireEvent.click(checkbox);
    
        expect(onTypeChange).toHaveBeenCalled();
        expect(onTypeChange.mock.calls[0][0].target.value).toBe('Spell Card');
    });
});