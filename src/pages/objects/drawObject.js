import {
  MeshPhongMaterial,
  MeshBasicMaterial,
  Mesh,
  BoxGeometry,
  SphereGeometry,
  PointsMaterial,
  ShaderMaterial,
  BufferAttribute,
  Color,
  Points,
} from "three";
//import * as open3d from 'open3d-js';
import { GLTFLoader } from 'three/examples/jsm/loaders/GLTFLoader';
import { PLYLoader } from 'three/examples/jsm/loaders/PLYLoader';
import init1, { scene } from "./draw";
import obj2 from './Nefertiti.glb';
import obj1 from './output_cloud.ply';
import obj3 from './test3.ply'
import obj4 from './file1.ply'
// src\pages\objects\28.601726_-81.196485.ply

export async function getObject(marker) {
  var defaultMaterial = new MeshPhongMaterial({ color: 0xff0000, flatShading: true, vertexColors: true, shininess: 0 });
  const volumeInput = document.createElement('volumeInput');
  init1(marker);
  let obj
  let shape = 'sphere'
  let geometry;
  let rendername = marker.name
  console.log(rendername)
  
  if(rendername == "28.601726_-81.196485.ply"){
    obj = obj4;
  }
  else obj = obj1;

  switch (shape) {
    case 'sphere':
      {
        // Load the PLY object
        var loader = new PLYLoader();
        loader.load(obj, (geometry) => {
          // Create an array to store colors for each vertex
          var colors = [];
          var points = [];
          console.log(geometry)
          geometry.computeBoundingBox();
          var minZ = geometry.boundingBox.min.z;
          var maxZ = geometry.boundingBox.max.z;
          
          // Iterate over the vertices and assign colors based on the Z position
          
          let all_holes = [];
          let spots = []
          let minX = Infinity;
          let maxX = -Infinity;
          let minY = Infinity;
          let maxY = -Infinity;
          let minZ1 = Infinity;
          let maxZ1 = -Infinity;
          const thresh = 0.75;
          for (let i = 0; i < geometry.attributes.position.array.length; i += 3) {
            const {x,y,z} = {x:geometry.attributes.position.array[i],y:geometry.attributes.position.array[i+1],z:geometry.attributes.position.array[i+2]};
            

            // Assign a color based on the Z position
            var t = (z - minZ) / (maxZ - minZ);

            var r = Math.round(t * 255);
            //var g = Math.round((1 - t) * 255);
            var b = Math.round((1 - t) * 255);
            var color = new Color(r / 255, 0, b / 255); 

            if (t<thresh) {
              // Update the bounding box coordinates
              minX = Math.min(minX, x);
              maxX = Math.max(maxX, x);
              minY = Math.min(minY, y);
              maxY = Math.max(maxY, y);
              minZ1 = Math.min(minZ1, z);
              maxZ1 = Math.max(maxZ1, z);
          }

            

            
            // Store the color in the colors array
            colors.push(color.r, color.g, color.b);
          }
          const volume = (maxX - minX) * (maxY - minY) * (maxZ1 - minZ1);
          //const testvol = (11-0) * (11-0) * (11-0)
          const cubeRoot = Math.cbrt(volume);
          const str = "Volume: "+ Math.floor(cubeRoot) +" cubic inches";
          // console.log(str)

          scene.userData = {volume:str}
          geometry.name = "pothole"
          geometry.userData = {volume:str}
          // rend.innerText = str
          //scene.name = str;

          var depth = maxZ - minZ;
          console.log(depth,maxZ,minZ)
          
          // Create a buffer attribute for colors
          var colorAttribute = new BufferAttribute(new Float32Array(colors), 3);
          
          // Assign the color attribute to the geometry
          geometry.setAttribute('color', colorAttribute);
          
          // Create a material that uses vertex colors
          var material = new PointsMaterial({ vertexColors: true });
          
          // Create the point cloud with the colored geometry and material
          var pointCloud = new Points(geometry, material);
          
          // Add the point cloud to the scene
          scene.add(pointCloud);
        });
      }
      break

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
