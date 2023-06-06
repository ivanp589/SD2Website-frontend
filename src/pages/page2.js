import './pages.css';
import GoogleApiWrapper from './fullmap'
import Toolbar from './Toolbar';
//fullscreen maps page




function P2() {

  return (
    <div className="page1div"/**this is the containing div*/>
      <Toolbar></Toolbar>

        <div id='leftrightdiv' style={{width:"100%",height:"95vmin"}}>

          <div id='map' style={{float:"left"}}>
          <GoogleApiWrapper></GoogleApiWrapper>
          </div>

        </div>
        
    </div>
  );
}

export default P2;