import './App.css';
import { BrowserRouter, Routes, Route } from 'react-router-dom';
import Header from './components/Header'
import SearchBar from './components/SearchBar';
import SearchPopUp from './components/SearchPopUp';
import Card from './components/Card';

function App() {
  return (
    <div className="App">
      <BrowserRouter>
      
        <Header/>
        <SearchPopUp/>
        {/* <SearchBar/> */}
        
        
      </BrowserRouter>

      
    </div>
  );
}

export default App;
