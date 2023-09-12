// import threejsm allow for camera to move around in scene and
// allow for importing gltf file all using cdn

import * as THREE from 'three';
import { OrbitControls } from 'three/addons/controls/OrbitControls.js';
import { GLTFLoader } from 'three/addons/loaders/GLTFLoader.js';

const scene = new THREE.Scene()

const camera = new THREE.PerspectiveCamera(60, window.innerWidth/window.innerHeight, 0.1, 1000)

// MUCH LATER ON: keep track of the mouse position
let mouseX = window.innerWidth / 2
let mouseY = window.innerHeight / 2

// initialize two variables: controls and object
let object
let controls

let objToRender = 'ryan'

// instantiate loader for gltf files
let loader = new GLTFLoader()

// code below to load the file:
loader.load(
    `models/${objToRender}/scene.gltf`,
    // all functions below are callback functions for success, loading progress and error handling
    function (gltf) {
        // if the file is loaded, add it to the scene
        object = gltf.scene
        scene.add(object)
    },
    function (xhr) {
        // while it is loading, log the progress
        console.log((xhr.loaded / xhr.total * 100) + '% loaded')
    },
    function (error) {
        // if there is an error, log it
        console.error(error)
    }
)

// create the render
const renderer = new THREE.WebGLRenderer({ alpha:true }) // alpha: tue allows for TRANSPARENT BG instead of black (WUNDERBAR!)
renderer.setSize(window.innerWidth, window.innerHeight)

document.getElementById('container3D').appendChild(renderer.domElement)

camera.position.z = objToRender === 'dino' ? 25  : 50
camera.position.y = objToRender === 'dino' ? 25  : 10

// create the lights that illuminate the 3d model
const topLight = new THREE.DirectionalLight(0xffffff, 1)
topLight.position.set(500, 500, 500)
topLight.castShadow = false
scene.add(topLight)

const ambientLight = new THREE.AmbientLight(0x333333, objToRender === 'dino'? 5 : 1)
scene.add(ambientLight)


// MUCH MUCH LATER:add orbit control to one object: 
if (objToRender === 'dino') {
    controls = new OrbitControls(camera, renderer.domElement)
}

 
// create an animate function that will be called on every frame
// to render the scene
function animate () {
    // to make the {MODEL} move according to the mouse
    if (object && objToRender === 'ryan'){
    object.rotation.y = -3 + mouseX /window.innerWidth * 3
    object.rotation.x = -1.2 + mouseY * 2.5 / window.innerHeight
    }
    renderer.render(scene, camera)
    requestAnimationFrame(animate)
}

// add listener to window
window.addEventListener('resize',function () {
    camera.aspect = window.innerWidth/this.window.innerHeight
    camera.updateProjectionMatrix()
    renderer.setSize(window.innerWidth, window.innerHeight)
})

// A LITTLE LATER: add mouse position listener for big_scientific_toilet movement
document.onmousemove= (e) => {
    mouseX = e.clientX
    mouseY = e.clientY
    // console.log(mouseX, mouseY)
}

// start the 3d rendering
// animate()
