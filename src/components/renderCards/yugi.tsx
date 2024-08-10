import { useQuery } from 'react-query';
import { TextField, CircularProgress, Typography } from '@mui/material';
import CardFilter from '../filter/CardFilter';
import CardList from '../list/CardList';
import { Card } from '../../types/typesCard';
import useCardFilter from '../../hooks/useCardFilter';
import { fetchCards } from '../../api/cardApi';


//CardMonsters - Contem o  CardFilter e o CardList que são responsaveis por filtrar e mostrar as cartas
const CardMonsters = () => {
    const { data, error, isLoading } = useQuery<Card[], Error>('cards', fetchCards);
    const { filter, setFilter, selectedTypes, handleFilterChange } = useCardFilter();

    const filteredCards = data?.filter((card) =>
        card.name.toLowerCase().includes(filter.toLowerCase()) &&
        (selectedTypes.size === 0 || selectedTypes.has(card.type))
    );

    console.log(error, 'error object');
    console.log(error?.message, 'error message');

    if (isLoading) return <CircularProgress />;
    if (error) return <Typography color="error">Ocorreu um erro: {error.message}</Typography>;

    const cardTypes = Array.from(new Set(data?.map(card => card.type).filter(type => type) || []));

    return (
        <section>
            <TextField
                label="Pesquisar carta"
                variant="outlined"
                value={filter}
                onChange={(e) => setFilter(e.target.value)}
                fullWidth
                margin="normal"
            />
            <CardFilter
                cardTypes={cardTypes}
                selectedTypes={selectedTypes}
                onTypeChange={handleFilterChange}
            />
            <CardList cards={filteredCards || []} />
        </section>
    );
};

export default CardMonsters;