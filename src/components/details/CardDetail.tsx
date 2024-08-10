import { useParams } from 'react-router-dom';
import { Typography, Card as MuiCard, CardContent, CardMedia, List, ListItem, ListItemText, Grid, Paper } from '@mui/material';
import { useQuery } from 'react-query';
import { CardSet } from '../../types/typesCard';
import { getCardById } from '../../api/apiYugi';

//CardDetail - Responsavel por renderizar a informação das cartas 
const CardDetail = () => {
    const { id } = useParams<{ id: string }>();
    const { data: card, isLoading, error } = useQuery(['card', id ?? ''], () => getCardById(id ?? ''));

    if (isLoading) return <Typography>Carregando...</Typography>;
    if (error) return <Typography color="error">Erro ao carregar os detalhes da carta.</Typography>;

    return (
        <MuiCard sx={{ bgcolor: 'transparent' }} >
            <Grid container spacing={2} marginTop={10}>
                <Grid item xs={12} sm={4}>
                    <CardMedia
                        component="img"
                        height="auto"
                        image={card.card_images[0].image_url}
                        alt={card.name}
                    />
                </Grid>
                <Grid item xs={12} sm={8}>
                    <CardContent>
                        <Typography gutterBottom variant="h4">
                            {card.name}
                        </Typography>
                        <Typography variant="body1" paragraph>
                            {card.desc}
                        </Typography>
                        <Grid container spacing={1}>
                            <Grid item xs={10} sm={5}>
                                <Paper sx={{ padding: 2, borderRadius: 2, boxShadow: 3, bgcolor: 'transparent' }}>
                                    <Typography variant="h6" gutterBottom>Detalhes</Typography>
                                    <Grid container spacing={1}>
                                        <Grid item xs={6}>
                                            <Typography variant="subtitle2">Tipo:</Typography>
                                            <Typography variant="body2">{card.type}</Typography>
                                        </Grid>
                                        <Grid item xs={6}>
                                            <Typography variant="subtitle2">Atributo:</Typography>
                                            <Typography variant="body2">{card.attribute}</Typography>
                                        </Grid>
                                        <Grid item xs={6}>
                                            <Typography variant="subtitle2">Nível:</Typography>
                                            <Typography variant="body2">{card.level}</Typography>
                                        </Grid>
                                        <Grid item xs={6}>
                                            <Typography variant="subtitle2">Raça:</Typography>
                                            <Typography variant="body2">{card.race}</Typography>
                                        </Grid>
                                        <Grid item xs={6}>
                                            <Typography variant="subtitle2">Ataque:</Typography>
                                            <Typography variant="body2">{card.atk}</Typography>
                                        </Grid>
                                        <Grid item xs={6}>
                                            <Typography variant="subtitle2">Defesa:</Typography>
                                            <Typography variant="body2">{card.def}</Typography>
                                        </Grid>
                                        <Grid item xs={6}>
                                            <Typography variant="subtitle2">Frame Type:</Typography>
                                            <Typography variant="body2">{card.frameType}</Typography>
                                        </Grid>
                                    </Grid>
                                </Paper>
                            </Grid>
                            <Grid item xs={12} sm={6}>
                                <Paper sx={{ padding: 2, borderRadius: 2, boxShadow: 3, bgcolor: 'transparent' }}>
                                    <Typography variant="h6" gutterBottom>Conjuntos de Cartas</Typography>
                                    <List>
                                        {card.card_sets.map((set: CardSet) => (
                                            <ListItem key={set.set_code} >
                                                <ListItemText primary={set.set_name} secondary={`Raridade: ${set.set_rarity}`} />
                                            </ListItem>
                                        ))}
                                    </List>
                                </Paper>
                            </Grid>
                        </Grid>
                    </CardContent>
                </Grid>
            </Grid>
        </MuiCard>
    );
};

export default CardDetail;
