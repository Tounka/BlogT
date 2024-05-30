import './App.css';
import { BrowserRouter, Route, Routes } from 'react-router-dom';


import { UserPage } from './pages/UserPage/Index.jsx';
import {CreadorPost} from './pages/CreadorPost/Index.jsx'
import { Login } from './pages/LoginXe/Index.jsx';
import { Post } from './pages/Post/Index.jsx';
function App() {

  return (
    
      <div className="App">
        <BrowserRouter>
          <Routes>
            <Route index element={<Login />} />
            <Route path='userPage' element={<UserPage />} />
            <Route path='CrearPost' element={<CreadorPost />} />
            <Route path='Post' element={<Post />} />
          </Routes>
        </BrowserRouter>
      </div>
    

  );
}

export default App;
