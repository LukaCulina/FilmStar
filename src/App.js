import { HashRouter, Route, Routes} from 'react-router-dom';
import Header from "./components/Header/Header"
import { Container } from '@mui/system';
import Trending from './Pages/Trending/Trending';
import Movies from './Pages/Movies/Movies';
import Series from './Pages/Series/Series';
import { AuthContextProvider } from './context/AuthContext';
import Account from './Pages/Account/Account';
import Signup from './Pages/Signup/Signup';
import Login from './Pages/Login/Login';
import Home from './Pages/Home/Home';
import './App.css';


function App() {
  return (
      <HashRouter>
        <AuthContextProvider>
            <Header></Header>
            <div className="app">
              <Container maxWidth="xl">
                    <Routes>
                      <Route path='/' element={<Home/>} exact/>
                      <Route path='/trending' element={<Trending/>}/>
                      <Route path='/movies' element={<Movies/>}/>
                      <Route path='/series' element={<Series/>}/>
                      <Route path='/login' element={<Login/>}/>
                      <Route path='/signup' element={<Signup/>}/>
                      <Route path='/account' element={<Account/>}/>
                    </Routes>
              </Container>
            </div>
          </AuthContextProvider>
      </HashRouter>
  );
}

export default App;
