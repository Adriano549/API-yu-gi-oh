import { renderHook, act } from '@testing-library/react'
import useCardFilter from '../hooks/useCardFilter';

test('should initialize with default values', () => {
    const { result } = renderHook(() => useCardFilter());

    expect(result.current.filter).toBe('');
    // Verifica se o estado inicial do filtro é uma string vazia
    expect(result.current.selectedTypes).toEqual(new Set());
    // Verifica se o conjunto de tipos selecionados é um Set vazio
});

test('should update filter value', () => {
    const { result } = renderHook(() => useCardFilter());

    act(() => { // Utiliza act para garantir que as atualizações de estado sejam processadas
        result.current.setFilter('New Filter');// Atualiza o valor do filtro para 'New Filter'
    });

    expect(result.current.filter).toBe('New Filter');  // Verifica se o estado do filtro foi atualizado corretamente
});

test('should add type to selectedTypes', () => {
    const { result } = renderHook(() => useCardFilter());

    act(() => {// Simula a mudança do filtro 
        result.current.handleFilterChange({ target: { value: 'Spell Card' } } as React.ChangeEvent<HTMLInputElement>);
    });

    expect(result.current.selectedTypes).toContain('Spell Card'); // Verifica se o tipo 'Spell Card' foi adicionado ao conjunto de tipos selecionados
});
