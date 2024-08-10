import { Card as MuiCard, CardContent, CardMedia, Typography, Grid } from '@mui/material';
import { Link } from 'react-router-dom';
import { Card } from '../../types/typesCard';


interface CardListProps {
    cards: Card[];
}
// CardList - rederiza as cartas na pagina (Yu-gi-oh! Cards)

const CardList= ({ cards } : CardListProps) => {
    return (
        <Grid container spacing={3} marginTop={1}>
            {cards.length === 0 && (
                <Grid item xs={12}>
                    <Typography>Nenhuma carta encontrada.</Typography>
                </Grid>
            )}
            {cards.slice(0, 100).map((card) => (
                <Grid item key={card.id} xs={12} sm={3} md={2} lg={2}>
                    <MuiCard sx={{ maxWidth: 300, margin: 'auto', backgroundColor: '#7772723a', boxShadow: '10px 10px 5px black'}}>
                        <Link to={`/cards/${card.id}`}>
                        <CardMedia 
                            component="img"
                            height="200"
                            image={card.card_images[0].image_url_small}
                            alt={card.name}
                            sx={{ objectFit: 'contain'  }}
                        />
                        <CardContent sx={{ height: 100, display: 'flex', alignItems: 'center', justifyContent: 'center' , borderTop:'2px solid #421647'}}>
                            <Typography gutterBottom  component="div" textAlign="center">
                                {card.name}
                            </Typography>
                        </CardContent>
                        </Link>
                    </MuiCard>
                </Grid>
            ))}
        </Grid>
    );
}

export default CardList;
