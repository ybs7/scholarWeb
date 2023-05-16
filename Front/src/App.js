import './App.css';
import { BrowserRouter, Routes, Route } from 'react-router-dom';
import Header from './components/Header'
import SearchBar from './components/SearchBar';
import SearchPopUp from './components/SearchPopUp';
import Card from './components/Card';
import Footer from "./components/Footer";
import ResultByID from "./components/ResultByID";

function App() {
  return (
    <div className="App">
      <BrowserRouter>

        <Header/>

        <SearchPopUp/>
          <Routes>
              <Route path="/resultbyid" element={<ResultByID />} />
              {/* Other routes */}
          </Routes>

          <Footer />
      </BrowserRouter>


    </div>
  );
}

export default App;
