import './App.css';
import Navbar from './components/Navbar';
import Layout from './components/Layout';
import Board from './pages/Board';
import { NavbarProvider } from './contexts/NavbarContext';

function App() {
  return (
    <NavbarProvider>
      <Navbar />
      <Layout>
        <Board />
      </Layout>
    </NavbarProvider>
  );
}

export default App;
