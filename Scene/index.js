const scene = new THREE.Scene()
const camera = new THREE.PerspectiveCamera(75, window.innerWidth / window.innerHeight, 0.1, 1000)

const renderer = new THREE.WebGLRenderer()
renderer.setSize(window.innerWidth, window.innerHeight)
document.body.appendChild(renderer.domElement)

const geometry = new THREE.BoxGeometry(1, 1, 1)
const material = new THREE.MeshPhongMaterial({
    color: 0xFF0000,
    flatShading: true

})
const cube = new THREE.Mesh(geometry, material)
cube.position.y = 1
scene.add(cube)


let cameraAngle = 0
const cameraDistance = 5
const cameraPhi = Math.PI/6 //Height
camera.position.y = Math.sin(cameraPhi) * cameraDistance
camera.lookAt(0, 0, 0)


//Add Ambient Light
const ambientLightColor = 0xFFFFFF
const ambientLightIntensity = 0.5
const ambientLight = new THREE.AmbientLight(ambientLightColor, ambientLightIntensity)
scene.add(ambientLight)

//Add Point Light
const pointLightColor = 0xFFFFFF
const pointLightIntensity = 1
const pointLight = new THREE.PointLight(pointLightColor, pointLightIntensity)
pointLight.position.set(1.0, 10, 2.5)
scene.add(pointLight)

//Add floor
const floorColor = 0xdbce58
const floorSize = 100
const floorGeometry = new THREE.PlaneGeometry(floorSize, floorSize)
const floorMaterial = new THREE.MeshPhongMaterial({
    color: floorColor,
    flatShading: true
})
floorMaterial.side = THREE.doubleSide
const floor = new THREE.Mesh(floorGeometry, floorMaterial)
floor.rotation.x = -Math.PI/2
scene.add(floor)


const animate = () => {
    requestAnimationFrame( animate );
    // cube.rotation.x += 0.01
    // cube.rotation.y -= 0.01

    // floor.rotation.x += 0.001
    // console.log(floor.rotation)

    camera.position.x = Math.cos(cameraPhi) * Math.sin(cameraAngle) * cameraDistance
    camera.position.z = Math.cos(cameraPhi) * Math.cos(cameraAngle) * cameraDistance
    camera.lookAt(0,0,0)
    cameraAngle += 0.001


    renderer.render(scene, camera)
    
}

animate();