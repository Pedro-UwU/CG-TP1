let scene
let camera
let renderer
let cameraAngle = 0.5
let cameraController

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
    const pointLightIntensity = 0.75
    const pointLight = new THREE.PointLight(pointLightColor, pointLightIntensity)
    pointLight.position.set(3, 10, 2.5)
    pointLight.castShadow = true;
    scene.add(pointLight)

    room = new Room(Config.FLOOR_SIZE, Config.WALL_HEIGHT, scene) 

    truck = new Truck(scene)

    shelves = new Shelves(scene)
    shelves.move(0,0,-3)

    printer = new Printer(scene)
    printer.move(0, 0, 5)
    printer.rotate(0, Math.PI, 0)

    cameraController = new CameraController(scene)
    cameraController.setCameras(scene, truck.body, printer.base, shelves.container)

    //const controls = new THREE.OrbitControls(cameras.getCurrentCamera(), renderer.domElement)
}


const render = () => {
    requestAnimationFrame( render );
    updateCamera()
    truck.update()
    printer.update()
    cameraController.update()
    renderer.render(scene, cameraController.getCurrentCamera())
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
            case 'o':
                cameraController.zoomIn()
                break;
            case 'p':
                cameraController.zoomOut()
                break;
        } 
    }

    document.onkeyup = (event) => {
        switch(event.key) {
            case 'w':
            case 'ArrowUp':
            case 's':
            case 'ArrowDown':
                truck.accelerate(0,0,0)
                break;
            case 'a':
            case 'ArrowLeft':
            case 'd':
            case 'ArrowRight':
                truck.rotate(0, 0, 0)
                break;
            case 'q':
            case 'e':
                truck.moveLifter('stop')
                break;
            case 'g':
                if (truck.hasPrint()) {
                    putPrintOnShelf()
                } else if (printer.hasPrint() && truck.distanceToPlate(printer.print) < Config.DISTANCE_TO_LIFT) {
                    liftPrint()
                }
                break;
            case 'k':
                printer.printShape()
            case 'p':
            case 'o':
                cameraController.zoomStop()
                break;
            case '1':
                cameraController.switchCamera(1)
                break;
            case '2':
                cameraController.switchCamera(2)
                break;
            case '3':
                cameraController.switchCamera(3)
                break;
            case '4':
                cameraController.switchCamera(4)
                break;
            case '5':
                cameraController.switchCamera(5)
                break;
            case '6':
                cameraController.switchCamera(6)
                break
        }
    }
}

const setupMouseControls = () => {
    document.onmousedown = (event) => {
        cameraController.movingMouse = true
    }

    document.onmouseup = (event) => {
        cameraController.movingMouse = false
    }

    document.onmousemove = (event) => {
        cameraController.updateCameraPosition(event.clientX, event.clientY)
    }
}

const liftPrint = () => {
    print = printer.detachPrint()
    truck.setPrint(print)
}

const putPrintOnShelf = () => {
    const shelf = shelves.getClosestShelf(truck.plate)
    if (!shelf) {
         return
    }
    const print = truck.detachPrint()
    shelf.add(print)
}

initThreeJS()
setupKeyboardControls()
setupMouseControls()
updateCamera()
render()