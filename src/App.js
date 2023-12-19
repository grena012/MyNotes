
import './App.css';
import About from './Components/About';
import Home from './Components/Home';
import Navbar from './Components/Navbar';
import {
  BrowserRouter as Router,
  Route,
  Routes
} from "react-router-dom";
import NoteState from './context/notes/NoteState';
import Alert from './Components/Alert';
import BGimage from './Image/book.jpg';
import Login from './Components/Login';
import Signup from './Components/Signup';
const Style = {
  // backgroundColor: 'cyan',
  // border: '5px dotted black',
  // borderRadius: '15px'
  // backgroundImage: `url(${BGimage})`
}


function App() {
  return (
    <>
      <NoteState>
        <Router>
          <Navbar />
          <Alert message="i did it"/>
          <div className='container' style={Style}>
            <Routes>
              {/* <Route path="/" element={<Navbar />} /> */}
              <Route exact path="/about" element={<About />} />
              <Route path="/" element={<Home />} />
              <Route path="/login" element={<Login />} />
              <Route path="/signup" element={<Signup />} />
            </Routes>
          </div>
          
        </Router>
      </NoteState>
    </>
  );
}

export default App;
