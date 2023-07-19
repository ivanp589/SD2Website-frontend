// import {
//     MeshPhongMaterial,
//     MeshBasicMaterial,
//     Mesh,
//     BoxGeometry,
//     SphereGeometry,
//     PointsMaterial,
//     ShaderMaterial,
//     Box3,
//     Face3,
//     BufferAttribute,
//     Color,
//     Points,
//     Float32BufferAttribute
//   } from "three";
//   //import * as open3d from 'open3d-js';
//   import { GLTFLoader } from 'three/examples/jsm/loaders/GLTFLoader';
//   import { PLYLoader } from 'three/examples/jsm/loaders/PLYLoader';
//   import init1, { scene } from "./draw";
//   import obj2 from './Nefertiti.glb';
//   import obj1 from './output_cloud.ply';
//   import obj from './test3.ply'
  
//   export async function getObject(marker) {
//     let geometry;
//     var defaultMaterial = new MeshPhongMaterial({ color: 0xff0000, flatShading: true, vertexColors: true, shininess: 0 });
//     init1(marker);
//     let shape = marker.model
  
//     switch (shape) {
//       case 'sphere':
//         // {
//         //   // Load the glTF object
//         //   var loader = new GLTFLoader();
//         //   loader.load(obj, (gltf) => {
//         //     const model = gltf.scene;
//         //     scene.add(model);
//         //   });
//         // }
//         // break;
//         {
//           // Load the PLY object
//           var loader = new PLYLoader();
//           loader.load(obj, (geometry) => {
//             // Create an array to store colors for each vertex
//             var colors = [];
//             var points = [];
//             console.log(geometry)
//             geometry.computeBoundingBox();
//             var minZ = geometry.boundingBox.min.z;
//             var maxZ = geometry.boundingBox.max.z;
//             //console.log(boundingBox)
//             // Iterate over the vertices and assign colors based on the Z position
//             for (let i = 0; i < geometry.attributes.position.array.length; i += 3) {
              
             
//               var z = geometry.attributes.position.array[i+2]; // Get the Z position
              
//               // Assign a color based on the Z position
//               var t = (z - minZ) / (maxZ - minZ);
  
//               var r = Math.round(t * 255);
//               //var g = Math.round((1 - t) * 255);
//               var b = Math.round((1 - t) * 255);
//               var color = new Color(r / 255, 0, b / 255); 
  
//               if(z == maxZ - 2 ){
//                 points.push({x:geometry.attributes.position.array[i],y:geometry.attributes.position.array[i+1],z:geometry.attributes.position.array[i+2]})
//               }
                    
//               // Store the color in the colors array
//               colors.push(color.r, color.g, color.b);
//             }
  
//             //points = [{x:1,y:2,z:1},{x:2,y:2,z:1},{x:2,y:2,z:2},{x:2,y:3,z:1},{x:2,y:3,z:2}]
//             var row = Object.values(points.reduce((acc, point) => {
//               const { y } = point;
//               if (!acc[y]) {
//                 acc[y] = [];
//               }
//               acc[y].push(point);
//               return acc;
//             }, {})).sort((a, b) => a[0].y - b[0].y);
  
//             var max_height;
//             row.forEach(element => {
//               if(max_height == null || element.z > max_height) max_height = element.z;
  
  
//             });
  
//             for (let i = 0; i < obj.length; i++) {
//               const point = obj[i];
//               const { x, y, z } = point;
            
//               // Add a new vertex to the geometry
//               geometry.vertices.push(new Vector3(x, y, z));
            
//               // Connect the vertex to the previous vertex in the same row
//               if (i > 0 && point.y === pointCloud[i - 1].y) {
//                 const lastIndex = geometry.vertices.length - 1;
//                 geometry.faces.push(new Face3(lastIndex - 1, lastIndex, lastIndex - 1));
//               }
            
//               // Connect the vertex to the corresponding vertex in the row above
//               if (i >= pointCloudRowSize) {
//                 const lastIndex = geometry.vertices.length - 1;
//                 const aboveIndex = lastIndex - pointCloudRowSize;
//                 geometry.faces.push(new THREE.Face3(aboveIndex, lastIndex, aboveIndex + 1));
//               }
//             }
            
//             console.log(volume);
  
//             var depth = maxZ - minZ;
//             console.log(depth,maxZ,minZ)
            
//             // Create a buffer attribute for colors
//             var colorAttribute = new BufferAttribute(new Float32Array(colors), 3);
            
//             // Assign the color attribute to the geometry
//             geometry.setAttribute('color', colorAttribute);
            
//             // Create a material that uses vertex colors
//             var material = new PointsMaterial({ vertexColors: true });
            
//             // Create the point cloud with the colored geometry and material
//             var pointCloud = new Points(geometry, material);
            
//             // Add the point cloud to the scene
//             scene.add(pointCloud);
//           });
//         }
//         break
  
//       case 'box':
//         {
//           geometry = new BoxGeometry();
//           let model = new Mesh(geometry, defaultMaterial);
//           scene.add(model);
//         }
//         break;
  
//       case 'other':
//         var loader = new GLTFLoader();
//         loader.crossOrigin = "anonymous";
//         loader.load('https://rawcdn.githack.com/mrdoob/three.js/76d16bd828c8d3e1870eac45aa466c20313cf944/examples/models/gltf/Nefertiti/Nefertiti.glb', (glb) => {
//           const model1 = glb.scene.children[0];
//           model1.position.y -= model1.geometry.boundingSphere.radius / 2;
//           scene.add(model1);
//         });
//         break;
  
//       default:
//         {
//           geometry = new SphereGeometry();
//           let model = new Mesh(geometry, defaultMaterial);
//           scene.add(model);
//         }
//         break;
//     }
//   }
  