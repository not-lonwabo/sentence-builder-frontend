import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
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
        <Routes>
          <Route path="/" exact element={<SentenceBuilder/>}/>
          <Route path="/sentences" element={<Sentences/>}/>
        </Routes>
      </div>
    </Router>
  );
}

export default App;
