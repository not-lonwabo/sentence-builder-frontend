import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import './App.css';
import 'bootstrap/dist/css/bootstrap.min.css';

import NavBar from './components/NavBar';
import SentenceBuilder from './components/SentenceBuilder';
import Sentences from './components/Sentences';

function App() {
  return (
    <Router>
      <div className='container'>
        <NavBar />
        <br/>
        <div className='rest-of-body'>
          <Routes>
            <Route path="/" exact element={<SentenceBuilder/>}/>
            <Route path="/sentences" element={<Sentences/>}/>
          </Routes>
        </div>
      </div>
    </Router>
  );
}

export default App;
