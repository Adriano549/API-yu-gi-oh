import { Container, Button } from '@mui/material';
import { Link } from 'react-router-dom';
import Kuriboh from "../../img/KURIBOH.gif";
import WelcomeMessage from './WelcomeMessage';
import Description from './Description';

const HomePage = () => {
    return (
        <Container maxWidth="md" style={{ marginTop: '2rem' }}>
            <WelcomeMessage />
            <Description />
            <Button variant="contained" color="primary" component={Link} to="/cards">
                Ver Cartas
            </Button>
            <div>
                <img src={Kuriboh} alt="" />
            </div>
        </Container>
    );
}

export default HomePage;