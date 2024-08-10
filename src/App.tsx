import { Outlet } from 'react-router-dom';
import { AppBar, Toolbar, Container } from '@mui/material';
import Nav from './components/header/header';

function App() {
  return (
    <>
      <AppBar position="static">
        <Toolbar>
          <Nav />
        </Toolbar>
      </AppBar>
      <Container>
        <Outlet />
      </Container>
    </>
  );
}

export default App;