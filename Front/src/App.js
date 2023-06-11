import './App.css';
import { BrowserRouter, Routes, Route } from 'react-router-dom';
import Header from './components/Header'
import SearchBar from './components/SearchBar';
import SearchPopUp from './pages/SearchPopUp';
import Card from './components/Card';
import Footer from "./components/Footer";
import ResultByID from "./components/ResultByID";
import Authors from './pages/authors';
import AuthorProfile from './pages/authorProfile'
import ProtectedRoute from './util/ProtectedRoute';
import Welcome from './pages/welcome'
import NotFound from './pages/NotFound';
// import AuthorScrapper from './AuthorScrapper';

function App() {
  return (
    <div className="App">
      <BrowserRouter>
        <Header>
          <Routes>
              <Route path="/" element = {<Welcome/>} />
              <Route path="/login" element = {<Login/>} />
              <Route path="/home" element = {<ProtectedRoute><SearchPopUp/></ProtectedRoute>} />
              <Route path="/authors" element = { <ProtectedRoute><Authors/></ProtectedRoute>} />
              <Route path="/resultbyid" element={<ProtectedRoute><ResultByID /></ProtectedRoute>} />
              <Route path="/authorProfile" element={<ProtectedRoute><AuthorProfile/></ProtectedRoute>} />
              <Route path="*" element={<NotFound/>} />
              {/* <Route path="/authorProfile/:engine/:authorParam/:authorInfo" element ={<></>} */}
              {/* <Route path="/scrapper" element={<AuthorScrapper />} /> */}
              {/* <Route path="/home" element = {}/>
              <Route path="/library" element = {}/>
              <Route path="/messages" element = {}/> */}

          </Routes>
        </Header>
      </BrowserRouter>


    </div>
  );
}

export default App;
