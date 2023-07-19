import { OrbitControls } from "https://cdn.jsdelivr.net/npm/three@0.112.1/examples/jsm/controls/OrbitControls.js";
import {
  Color,
  PerspectiveCamera,
  sRGBEncoding,
  HemisphereLight,
  Scene,
  WebGLRenderer,
  Sprite
} from "https://cdn.jsdelivr.net/npm/three@0.112.1/build/three.module.js";
//this file is responsible for rendering objects and setting the scene


//need to add methods that can add text on top of the scene
export let scene = new Scene();
let loc;
export function init1(marker) {
  const renderer = new WebGLRenderer();
  renderer.outputEncoding = sRGBEncoding;
  let rend  = document.getElementById('render')
  let text = rend.innerText;
  rend.innerText = ''
  rend.innerHTML = ''
  

  let span = document.createElement('span');
  span.style.position = 'relative';//make absolute
  span.style.width = '100%'

  let lab1 = document.createElement('div');
  lab1.innerText = marker.title
  lab1.style.float = 'left'
  span.appendChild(lab1)

  let lab2 = document.createElement('div');
  let str = scene.userData.volume;
  if (str) {
    lab2.innerText = str;
  } else {
    // Set a delay using setTimeout
    setTimeout(() => {
      str = scene.userData.volume;
      lab2.innerText = str || '';
    }, 1000);
  }
  let pothole = scene.getObjectByName('scene');
  console.log(scene)
  lab2.style.float = 'right'
  span.appendChild(lab2)

  let lab3 = document.createElement('div')
  lab3.innerText = "lat: " + marker.coords.lat+ ", long: "+ marker.coords.lng;
  lab3.style.bottom = "5px"
  lab3.style.position = "absolute"
  lab3.style.textalign = "center";
  lab3.style.width = "100%"

  rend.appendChild(span)
  rend.appendChild(lab3)

  const width = rend.clientWidth;
  const height =  rend.clientHeight;
  const ratio = width/height;

  renderer.setSize( width,height);
  renderer.setPixelRatio( window.devicePixelRatio);
  rend.appendChild(renderer.domElement)

  // scene = new Scene();
  scene.children.length = 0;
  scene.background = new Color(0xeeeeee);

  const light = new HemisphereLight(0xffffee, 0x444444);
  scene.add(light);
  
  const camera = new PerspectiveCamera( 60, ratio, 0.1, 1000 );
  camera.position.set(0, 0, 20);
  // eslint-disable-next-line
  const cameraControls = new OrbitControls(camera, rend);

  renderer.setAnimationLoop(() => {
    let rend  = document.getElementById('render')
    let width;
    let height;
    if(rend === null){//shitty code but it works
      width = 400;
      height = 400;
    }
    else{
      width = rend.clientWidth;
      height =  rend.clientHeight;
    }
    
    camera.aspect = width / height;
    camera.updateProjectionMatrix();
    renderer.setSize( width,height);
    renderer.setPixelRatio( window.devicePixelRatio);
    renderer.render( scene, camera );
  });
}

function labels(){
  const nameDiv = document.createElement('div');
  nameDiv.className = 'label';
  nameDiv.textContent = 'address';
  nameDiv.style.backgroundColor = 'transparent';

  const dateDiv = document.createElement('div');
  dateDiv.className = 'label';
  dateDiv.textContent = 'date';
  dateDiv.style.backgroundColor = 'transparent';

  // const label1 = new CSS2DObject(nameDiv);
  // const label2 = new CSS2DObject(dateDiv);

  // label1.position.set(0,0,0)
  // label2.position.set(10,0,20)

  // return {label1,label2}
}

export default init1;