import {
  MeshPhongMaterial,
  MeshBasicMaterial,
  Mesh,
  BoxGeometry,
  SphereGeometry,
  PointsMaterial,
  ShaderMaterial,
  Box3,
  BufferAttribute,
  Color,
  Points
} from "three";
//import * as open3d from 'open3d-js';
import { GLTFLoader } from 'three/examples/jsm/loaders/GLTFLoader';
import { PLYLoader } from 'three/examples/jsm/loaders/PLYLoader';
import init1, { scene } from "./draw";
import obj from './Nefertiti.glb';
import obj1 from './output_cloud.ply';

export async function getObject(marker) {
  let geometry;
  var defaultMaterial = new MeshPhongMaterial({ color: 0xff0000, flatShading: true, vertexColors: true, shininess: 0 });
  init1(marker);
  let shape = marker.model

  switch (shape) {
    case 'sphere':
      // {
      //   // Load the glTF object
      //   var loader = new GLTFLoader();
      //   loader.load(obj, (gltf) => {
      //     const model = gltf.scene;
      //     scene.add(model);
      //   });
      // }
      // break;
      {
        // Load the PLY object
        var loader = new PLYLoader();
        loader.load(obj1, (geometry) => {
          // Create an array to store colors for each vertex
          var colors = [];
          console.log(geometry)
          geometry.computeBoundingBox();
          var minZ = geometry.boundingBox.min.z;
          var maxZ = geometry.boundingBox.max.z;
          //console.log(boundingBox)
          // Iterate over the vertices and assign colors based on the Z position
          for (let i = 0; i < geometry.attributes.position.array.length; i += 3) {
            
           
            var z = geometry.attributes.position.array[i+2]; // Get the Z position
            
            // Assign a color based on the Z position
            var t = (z - minZ) / (maxZ - minZ);

            var r = Math.round(t * 255);
            //var g = Math.round((1 - t) * 255);
            var b = Math.round((1 - t) * 255);
            var color = new Color(r / 255, 0, b / 255); 
                  
            // Store the color in the colors array
            colors.push(color.r, color.g, color.b);
          }
          
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
