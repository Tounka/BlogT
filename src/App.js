import './App.css';
import { BrowserRouter, Route, Routes } from 'react-router-dom';

import { Login } from './pages/LoginX/Index.jsx';
import { UserPage } from './pages/UserPage/Index.jsx';
import {CreadorPost} from './pages/CreadorPost/Index.jsx'

function App() {


  return (
    <div className="App">
      <BrowserRouter>
        <Routes>
          <Route index element={<Login />} />
          <Route path='userPage' element={<UserPage />} />
          <Route path='CrearPost' element={<CreadorPost />} />
        </Routes>
      </BrowserRouter>
    </div>
  );
}

export default App;
