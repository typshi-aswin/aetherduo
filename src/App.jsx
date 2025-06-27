import FrontDesk from './pages/FrontDesk/FrontDesk';
import './App.module.css'
import Navbar from '../components/NavBar';
function App() {

  return (
    <div className='page-wrapper'>
       <Navbar />
          <FrontDesk />

</div>
); 
}

export default App;
