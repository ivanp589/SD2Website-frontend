import './pages.css';
import './toolbar.css';
import GoogleApiWrapper from './halfmap'
// import P3 from './drawObject';//doesnt need to run, just needs to be called
//the above import throws an error if on the incorrect page, not really important






function P2() {
  return (
    <div className="page1div"/**this is the containing div*/>
      <div class="toolbar">
      <div class="buttons">
        <button>Button 1</button>
        <button>Button 2</button>
        <button>Button 3</button>
      </div>
      <div class="search">
        <input type="text" placeholder="Search..."></input>
        <button>Search</button>
      </div>
    </div>

        <div id='leftrightdiv' style={{width:"100%",height:"95vmin"}}>

          <div id='map' style={{float:"left"}}>
          <GoogleApiWrapper></GoogleApiWrapper>
          </div>
          <div id='render'  
          style={{width:"50%", height:"inherit", float:"right", position:'relative'}/**canvas movement only works with positioned elemnts*/ }>
          </div> 

        </div>
        
    </div>
  );
}

export default P2;