
import { Typography } from '@mui/material';

const Description = () => (
    <>
        <Typography variant="body1" paragraph>
            Esta aplicação utiliza a API do Yu-Gi-Oh para buscar e exibir cartas do jogo.
        </Typography>
        <Typography variant="body1" paragraph>
            Estamos utilizando o Material-UI para estilização e o React Query para gerenciar as requisições à API.
        </Typography>
    </>
);

export default Description;
