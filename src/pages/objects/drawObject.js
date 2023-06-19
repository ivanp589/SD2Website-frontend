import {
  MeshPhongMaterial,
  Mesh,
  BoxGeometry,
  SphereGeometry
} from "three";
import { GLTFLoader } from 'three/examples/jsm/loaders/GLTFLoader';
import init1, { scene } from "./draw";
import obj from './Nefertiti.glb';

export async function getObject(marker) {
  let geometry;
  var defaultMaterial = new MeshPhongMaterial({ color: 0xff0000, flatShading: true, vertexColors: true, shininess: 0 });
  init1(marker);
  let shape = marker.model

  switch (shape) {
    case 'sphere':
      {
        // Load the glTF object
        var loader = new GLTFLoader();
        loader.load(obj, (gltf) => {
          const model = gltf.scene;
          scene.add(model);
        });
      }
      break;

    case 'box':
      {
        geometry = new BoxGeometry();
        let model = new Mesh(geometry, defaultMaterial);
        scene.add(model);
      }
      break;

    case 'other':
      var loader = new GLTFLoader();
      loader.crossOrigin = "anonymous";
      loader.load('https://rawcdn.githack.com/mrdoob/three.js/76d16bd828c8d3e1870eac45aa466c20313cf944/examples/models/gltf/Nefertiti/Nefertiti.glb', (glb) => {
        const model1 = glb.scene.children[0];
        model1.position.y -= model1.geometry.boundingSphere.radius / 2;
        scene.add(model1);
      });
      break;

    default:
      {
        geometry = new SphereGeometry();
        let model = new Mesh(geometry, defaultMaterial);
        scene.add(model);
      }
      break;
  }
}
