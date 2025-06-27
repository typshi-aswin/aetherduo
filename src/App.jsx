import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import FrontDesk from './pages/FrontDesk/FrontDesk';
import './App.module.css'
import Navbar from '../components/NavBar';
import Schedule from './pages/Schedule/Schedule';
import Emergency from './pages/Emergency/Emergency';
function App() {

  return (
     <Router>
      <div className='page-wrapper'>
        <Navbar />
        <Routes>
          <Route path="/" element={<FrontDesk />} />
          <Route path="/schedules" element={<Schedule />} />
          <Route path='/emergency'element={<Emergency />} />
        </Routes>
      </div>
    </Router>
); 
}

export default App;
