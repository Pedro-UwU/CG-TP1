let scene
let camera
let renderer
let cameraAngle = 0.5

let room, truck, shleves, printer

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
    renderer.localClippingEnabled = true

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

    room = new Room(Config.FLOOR_SIZE, Config.WALL_HEIGHT, scene) 

    truck = new Truck(scene)

    shelves = new Shelves(scene)
    shelves.move(0,0,-3)

    printer = new Printer(scene)
    printer.move(0, 0, 5)
    printer.rotate(0, Math.PI, 0)

    printer.printShape("A2", 2)
}


const render = () => {
    requestAnimationFrame( render );
    updateCamera()
    truck.update()
    printer.update()
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
    cameraAngle -= 0.005
}

const setupKeyboardControls = () => {
    document.onkeydown = (event) => {
        switch(event.key) {
            case 'w':
            case 'ArrowUp': 
                truck.accelerate(0,0,Config.TRUCK_VEL)
                break;
            case 's':
            case 'ArrowDown':
                truck.accelerate(0,0,-Config.TRUCK_VEL)
                break;
            case 'a':
            case 'ArrowLeft':
                truck.rotate(0,Config.TRUCK_ROTATION_SPEED, 0)
                break;
            case 'd':
            case 'ArrowRight':
                truck.rotate(0, -Config.TRUCK_ROTATION_SPEED, 0)
                break;
            case 'q':
                truck.moveLifter('down')
                break;
            case 'e':
                truck.moveLifter('up')
                break;
        } 
    }

    document.onkeyup = (event) => {
        switch(event.key) {
            case 'w':
            case 'ArrowUp':
                truck.accelerate(0,0,0)
                break;
            case 's':
            case 'ArrowDown':
                truck.accelerate(0,0,0)
                break;
            case 'a':
            case 'ArrowLeft':
                truck.rotate(0, 0, 0)
                break;
            case 'd':
            case 'ArrowRight':
                truck.rotate(0, 0, 0)
                break;
            case 'q':
                truck.moveLifter('stop')
                break;
            case 'e':
                truck.moveLifter('stop')
                break;
        }
    }
}

initThreeJS()
setupKeyboardControls()
updateCamera()
render()