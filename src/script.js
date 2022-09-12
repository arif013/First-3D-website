import './style.css'
import * as THREE from 'three'
import { OrbitControls } from 'three/examples/jsm/controls/OrbitControls.js'
import * as dat from 'dat.gui'

// Debug
const gui = new dat.GUI()

// Canvas
const canvas = document.querySelector('canvas.webgl')

// Scene
const scene = new THREE.Scene()

// Objects
const geometry = new THREE.TorusGeometry( .7, .2, 16, 100 );

// Materials

const material = new THREE.MeshStandardMaterial()
material.color = new THREE.Color(0x841515)
material.metalness=1;
material.wireframe=true;
// material.flatShading=true;

// Mesh
const sphere = new THREE.Mesh(geometry,material)
scene.add(sphere)

// Lights

const pointLight = new THREE.PointLight(0xffffff, 0.1)
pointLight.position.set(0,1.24,0.98)
pointLight.intensity=8
scene.add(pointLight)

// const light1 = gui.addFolder('light 1') //Making a folder (light1) for guis
// light1.add(pointLight.position, 'x').min(-4).max(4).step(.02)
// light1.add(pointLight.position, 'y').min(-4).max(4).step(.02)
// light1.add(pointLight.position, 'z').min(-4).max(4).step(.02)
// light1.add(pointLight, 'intensity').min(0).max(10).step(.02)


const pointLight2 = new THREE.PointLight(0xffffff, 0.1)
// pointLight2.position.x = 2
// pointLight2.position.y = 3
// pointLight2.position.z = 4
pointLight2.position.set(1.88,4,1.18)
pointLight2.intensity = 4.06
scene.add(pointLight2)

// const light2 = gui.addFolder('light2')
// light2.add(pointLight2.position, 'x').min(-4).max(4).step(.02)
// light2.add(pointLight2.position, 'y').min(-4).max(4).step(.02)
// light2.add(pointLight2.position, 'z').min(-4).max(4).step(.02)
// light2.add(pointLight2, 'intensity').min(0).max(10).step(.02)

//Light 3
const pointLight3 = new THREE.PointLight(0xffffff, 2)
pointLight3.position.set(-1.86,1,-1.65)
pointLight3.intensity = 10

// pointLight3.position.set()   
// const light2Color={
//     color: 0xfffa61
// }
// light2.addColor(light2Color,'color')
//     .onChange(()=>{
//         pointLight3.color.set(light2Color.color)
//     })

// Light Helper
// const pointLightHelper = new THREE.PointLightHelper(pointLight2, .1)
// scene.add(pointLightHelper)
/**
 * Sizes
 */
const sizes = {
    width: window.innerWidth,
    height: window.innerHeight
}

window.addEventListener('resize', () =>
{
    // Update sizes
    sizes.width = window.innerWidth
    sizes.height = window.innerHeight

    // Update camera
    camera.aspect = sizes.width / sizes.height
    camera.updateProjectionMatrix()

    // Update renderer
    renderer.setSize(sizes.width, sizes.height)
    renderer.setPixelRatio(Math.min(window.devicePixelRatio, 2))
})

/**
 * Camera
 */
// Base camera
const camera = new THREE.PerspectiveCamera(75, sizes.width / sizes.height, 0.1, 100)
camera.position.x = 0
camera.position.y = 0
camera.position.z = 2
scene.add(camera)

// Controls
// const controls = new OrbitControls(camera, canvas)
// controls.enableDamping = true

/**
 * Renderer
 */
const renderer = new THREE.WebGLRenderer({
    canvas: canvas,
    alpha: true
})
renderer.setSize(sizes.width, sizes.height)
renderer.setPixelRatio(Math.min(window.devicePixelRatio, 2))

/**
 * Animate
 */

document.addEventListener('mousemove',onDocMouse)
let mouseX = 0;
let mouseY = 0;

let targetX = 0;
let targetY = 0;

const windowX = window.innerWidth/2;
const windowY = window.innerHeight/2;
function onDocMouse(event){
    mouseX = (event.clientX - windowX)
    mouseY = (event.clientY - windowY)
}



const clock = new THREE.Clock()

const tick = () =>
{
    targetX = mouseX * .001
    targetY = mouseY * .001

    const elapsedTime = clock.getElapsedTime()

    // Update objects
    sphere.rotation.y = .5 * elapsedTime
    sphere.rotation.z =.4 * elapsedTime
    sphere.rotation.x += .5 * (targetX-sphere.rotation.x)
    sphere.rotation.y += .05 * (targetX-sphere.rotation.y)
    sphere.position.z += .05 * (targetX-sphere.position.z)

    // Update Orbital Controls
    // controls.update()

    // Render
    renderer.render(scene, camera)

    // Call tick again on the next frame
    window.requestAnimationFrame(tick)
}

tick()