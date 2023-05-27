import {
  MeshPhongMaterial,
  Mesh,
  BoxGeometry,
  SphereGeometry
} from "https://cdn.jsdelivr.net/npm/three@0.112.1/build/three.module.js";
import { GLTFLoader } from 'https://cdn.jsdelivr.net/npm/three@0.112.1/examples/jsm/loaders/GLTFLoader.js';
// import { Model } from "../assets/Scene";
import init1 from "./draw";
import { scene } from "./draw";


export async function getObject(shape){
  let geometry;
  var defaultMaterial = new MeshPhongMaterial( { color: 0xff0000, flatShading: true, vertexColors: true, shininess: 0	} );
  init1()
  switch(shape){
    case('sphere'):{
      geometry = new SphereGeometry();
      let model = new Mesh(geometry,defaultMaterial)
      scene.add(model)
    }
      break;

    case('box'):{
      geometry = new BoxGeometry();
      let model = new Mesh(geometry,defaultMaterial)
      scene.add(model)
    }
      break;
    case('other'):
      var loader = new GLTFLoader();
      loader.crossOrigin = "anonymous";//for some reason there is an issue loading downloaded glb files
      loader.load('https://rawcdn.githack.com/mrdoob/three.js/76d16bd828c8d3e1870eac45aa466c20313cf944/examples/models/gltf/Nefertiti/Nefertiti.glb',(glb) => {
        const model1 = glb.scene.children[0];
        model1.position.y -= model1.geometry.boundingSphere.radius / 2;
        scene.add(model1)
      });
    
    break;
    default:{
      geometry = new SphereGeometry();
      let model = new Mesh(geometry,defaultMaterial)
      scene.add(model)
    }
      break;
  }
  
  
}