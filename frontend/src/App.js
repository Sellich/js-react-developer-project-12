import './App.css';
import {BrowserRouter, Routes, Route} from 'react-router-dom';
import Login from './components/Login/Login';
import NotFound from './components/NotFound/NotFound';


function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="*" element={<NotFound/>}/>
        <Route path="login" element={<Login/>}/>
      </Routes>
    </BrowserRouter>
  );
}

export default App;
