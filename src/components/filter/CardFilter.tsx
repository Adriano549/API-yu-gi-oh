import { FormControlLabel, Checkbox, Grid } from '@mui/material';

interface CardFilterProps {
    cardTypes: string[];
    selectedTypes: Set<string>;
    onTypeChange: (event: React.ChangeEvent<HTMLInputElement>) => void;
}
//CardFilter - Responsavel pelas opçoes do checkBox
const CardFilter= ({ cardTypes, selectedTypes, onTypeChange } : CardFilterProps) => {
    return (
        <Grid container spacing={1} >
            {cardTypes.map((type) => (
                <Grid item xs={6} sm={3} md={2} key={type}>
                    <FormControlLabel 
                        key={type}
                        control={
                            <Checkbox  size='small'
                                value={type}
                                checked={selectedTypes.has(type)}
                                onChange={onTypeChange}
                            />
                        }
                        label={type}
                    />
                </Grid>
            ))}
        </Grid>
    );
}

export default CardFilter;
