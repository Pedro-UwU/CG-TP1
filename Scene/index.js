let scene
let camera
let renderer
let cameraAngle = 0

const initThreeJS = () => {
    scene = new THREE.Scene()
    camera = new THREE.PerspectiveCamera(Config.FOV, window.innerWidth / window.innerHeight, 0.1, 1000)
    renderer = new THREE.WebGLRenderer({
        antialias: Config.ANTIALIAS
    }) 
    renderer.setSize(window.innerWidth, window.innerHeight)
    renderer.shadowMap.enabled = Config.SHADOWS;
    if (renderer.shadowMap.enabled) {
        renderer.shadowMap.type = THREE.PCFSoftShadowMap; 
    }
    document.body.appendChild(renderer.domElement)

    //Add camera
    camera.position.y = Math.sin(Config.CAMERA_VERTICAL_ANGLE) * Config.CAMERA_DISTANCE
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
    pointLight.position.set(3, 6, 2.5)
    pointLight.castShadow = true;
    scene.add(pointLight)

    const room = new Room(Config.FLOOR_SIZE, Config.WALL_HEIGHT, scene) 

    const truck = new Truck(scene)

    const shelves = new Shelves(scene)
    shelves.move(0,0,-3)
}


const render = () => {
    requestAnimationFrame( render );

    updateCamera()
    renderer.render(scene, camera)
    
}

function readJsonFile(file) {
    let bufferData = fs.readFileSync(file)
    let stData = bufferData.toString()
    let data = JSON.parse(stData)
    return data
}

const updateCamera = () => {
    camera.position.x = Math.cos(Config.CAMERA_VERTICAL_ANGLE) * Math.sin(cameraAngle) * Config.CAMERA_DISTANCE
    camera.position.z = Math.cos(Config.CAMERA_VERTICAL_ANGLE) * Math.cos(cameraAngle) * Config.CAMERA_DISTANCE
    camera.lookAt(0,0,0)
    cameraAngle += 0.001
}

initThreeJS()
updateCamera()
render()