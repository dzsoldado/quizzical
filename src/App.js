import './App.css';
import {BrowserRouter as Router, Routes, Route } from 'react-router-dom'
import Home from './routes/Home'
import Quiz from './routes/Quiz'

function App() {
  return (
    <Router>
      <Routes>
        <Route path='/' element={<Home />} />
        <Route path='/quiz' element={<Quiz />} />
        <Route path='*' element={<Home />}/>
      </Routes>   
    </Router>
);
}

export default App;
