import './App.css';
import {BrowserRouter, Routes, Route} from 'react-router-dom';
import Login from './components/Login/Login';
import NotFound from './components/NotFound/NotFound';
import Main from './components/Main/Main';
import { createContext, useState } from 'react';
import { Provider } from 'react-redux';
import store from './slices/index';
import 'bootstrap/dist/css/bootstrap.min.css';

export const UserContext = createContext(null);

function App() {
  const [user, setUser] = useState({username: null, token: localStorage.getItem('token')});

  return (
    <UserContext.Provider value={user}>
      <Provider store={store}>
        <BrowserRouter>
          <Routes>
            <Route path="*" element={<NotFound/>}/>
            <Route path="login" element={<Login setUser={setUser}/>}/>
            <Route path="/" element={<Main/>}/>
          </Routes>
        </BrowserRouter>
      </Provider>
    </UserContext.Provider>
  );
}

export default App;
