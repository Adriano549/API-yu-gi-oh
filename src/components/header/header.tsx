import { Link } from "react-router-dom";
import { Grid, Typography } from "@mui/material";

const Nav = () => {
    return (
        <nav>
            <Grid container spacing={4} alignItems="center" justifyContent="center">
                <Grid item>
                    <Typography
                        variant="h5"
                        component={Link}
                        to="/"
                        sx={{
                            '&:hover': {
                                color: '#9e0fca',
                            },
                        }}
                    >
                        Home
                    </Typography>
                </Grid>
                <Grid item>
                    <Typography
                        variant="h5"
                        component={Link}
                        to="/cards"
                        sx={{
                            '&:hover': {
                                color: '#9e0fca',
                            },
                        }}
                    >
                        Yu-gi-oh! Cards
                    </Typography>
                </Grid>
            </Grid>
        </nav>
    );
}

export default Nav;