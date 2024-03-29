import './index.css';
import P0 from './pages/page0'
import P1 from './pages/page1'
import P2 from './pages/page2'
import P3 from './pages/page3';
import VideoCropper from './pages/testcrop'
import PageWithTable from './pages/page4'
import {Login,Signup} from './pages/logreg'
import { BrowserRouter as Router, Route,  Routes } from 'react-router-dom';
import FileUpload from './pages/upload';

function App() {
  return (
    <Router>
      <div className="App">
        <div className="content">
          <Routes>

            {/* <Route path="/" element={<P1 />}></Route> */}

            <Route path="/2" element={<P2 />}></Route>

            <Route path="/3" element={<P3 />}></Route>

            <Route path="/4" element={<VideoCropper />}></Route>

            <Route path="/Login" element={<Login />}></Route>

            <Route path="/Signup" element={<Signup />}></Route>

            <Route path="/table" element={<PageWithTable/>}></Route>

            <Route path="/Upload" element={<FileUpload />}></Route>


            <Route path="/" element={<P1 />}/**nested routes should be above its parent, all routes are nested in this one */>
            </Route>

          </Routes>
        </div>
      </div>
    </Router>
  );
}

export default App;
