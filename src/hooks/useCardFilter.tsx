import { useState } from 'react';

//logica do filtro 
const useCardFilter = () => {
    const [filter, setFilter] = useState<string>('');
    const [selectedTypes, setSelectedTypes] = useState<Set<string>>(new Set());

    const handleFilterChange = (event: React.ChangeEvent<HTMLInputElement>) => {
        const value = event.target.value;
        setSelectedTypes(prev => {
            const newSet = new Set(prev);
            if (newSet.has(value)) {
                newSet.delete(value);
            } else {
                newSet.add(value);
            }
            return newSet;
        });
    };

    return { filter, setFilter, selectedTypes, handleFilterChange };
};

export default useCardFilter;