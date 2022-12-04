import * as THREE from 'three'
import {GLTFLoader} from 'three/examples/jsm/loaders/GLTFLoader'
import {OrbitControls} from 'three/examples/jsm/controls/OrbitControls'
import SofaObject from "../assets/sofa.glb"
import FloorTexture from "../assets/floor.jpg"

/**
 * @param {Element} canvas
 */
async function createScene(canvas) {
    const objects= {}

    // Main objects
    const scene= new THREE.Scene()
    objects.camera= new THREE.PerspectiveCamera(75, canvas.clientHeight / canvas.clientHeight, .1, 1000)
    objects.camera.position.set(10, 15, -5)
    
    const renderer= new THREE.WebGLRenderer({
        canvas: canvas,
        antialias: true
    })
    window.onresize = () => {
        const ratio = canvas.clientWidth / canvas.clientHeight
        renderer.setPixelRatio(ratio)
    }
    window.onresize()

    // Let the user control the camera
    const cameraControler= new OrbitControls(objects.camera, renderer.domElement)
    cameraControler.enablePan = false
    cameraControler.minDistance= 7
    cameraControler.maxDistance= 13
    cameraControler.maxPolarAngle = Math.PI /1.8
    cameraControler.target.set(0,3.5,0)

    // Background color
    scene.background = new THREE.Color(0xeaeaea)

    // Lights
    const light1= new THREE.HemisphereLight(0xffffff, 0xffffff,15)
    const light2= new THREE.PointLight(0xdddddd, 7)
    light2.position.set(10,5,-10)
    scene.add(
        light1,
        light2
    )

    // Sofa loader
    new GLTFLoader().load(SofaObject, (object) => {
        const sofa = object.scene.children[0]
        sofa.scale.set(5,5,5)
        sofa.position.set(0, 2.85, 0)
        scene.add(sofa)
    })

    // Floor (Load the texture)
    const planTexture= new THREE.TextureLoader().load(FloorTexture)
    planTexture.repeat.set(7,7)
    planTexture.wrapS = THREE.RepeatWrapping
    planTexture.wrapT = THREE.RepeatWrapping
    // Floor (Create the material)
    const planMaterial= new THREE.MeshBasicMaterial({map: planTexture})
    planMaterial.side = THREE.DoubleSide
    
    // Floor (Create the geometry)
    const planGeo = new THREE.PlaneGeometry(25, 25)
    planGeo.rotateX(Math.PI /2)
    
    // Floor
    const plan = new THREE.Mesh(planGeo, planMaterial)
    plan.position.set(0,0,0)
    scene.add(plan)

    function startAnimation() {
        cameraControler.update()

        renderer.render(scene, objects.camera)
        return requestAnimationFrame(startAnimation)
    }
    return startAnimation()
}

export default function startRendering() {
    const canvas= document.querySelector('canvas')
    createScene(canvas)
}