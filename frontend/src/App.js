import './App.css';
import {BrowserRouter, Routes, Route} from 'react-router-dom';
import Login from './components/Login/Login';
import NotFound from './components/NotFound/NotFound';
import Main from './components/Main/Main';
import { createContext, useState } from 'react';
import { Provider } from 'react-redux';
import store from './slices/index';
import 'bootstrap/dist/css/bootstrap.min.css';
import SignUp from './components/Login/SignUp';
import { Container } from 'react-bootstrap';

export const UserContext = createContext(null);

function App() {
  const [user, setUser] = useState({username: 'admin', token: localStorage.getItem('token')});

  return (
    <Container style={{width: '1500px', justifyContent: 'center'}}>
      <UserContext.Provider value={user}>
        <Provider store={store}>
          <BrowserRouter>
            <Routes>
              <Route path="*" element={<NotFound/>}/>
              <Route path="/" element={<Main/>}/>
              <Route path="login" element={<Login setUser={setUser}/>}/>
              <Route path="signUp" element={<SignUp setUser={setUser}/>}/>
            </Routes>
          </BrowserRouter>
        </Provider>
      </UserContext.Provider>
    </Container>
  );
}

export default App;
