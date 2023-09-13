import './App.css';
import {BrowserRouter, Routes, Route} from 'react-router-dom';
import Login from './components/Login/Login';
import NotFound from './components/NotFound/NotFound';
import Chat from './components/Chat/Chat';
import { createContext, useState } from 'react';

export const UserContext = createContext(null);

function App() {
  const [user, setUser] = useState({username: null, token: null});

  return (
    <UserContext.Provider value={user}>
      <BrowserRouter>
        <Routes>
          <Route path="*" element={<NotFound/>}/>
          <Route path="login" element={<Login setUser={setUser}/>}/>
          <Route path="/" element={<Chat/>}/>
        </Routes>
      </BrowserRouter>
    </UserContext.Provider>
  );
}

export default App;
