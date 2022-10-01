class CameraController {
    constructor() {
        this.cameras = []
        this.targets = []
        this.selectedCameraIndex = 0
        this.verticalAngle = Config.CAMERA_VERTICAL_ANGLE
        this.horizonalAngle = 0
        this.cameraDistance = Config.CAMERA_DISTANCE
        this.cameraHorizonatlAngle = 0

        this.zooming = 1

        this.movingMouse = false
        this.prevX = 0
        this.prevY = 0
    }
    setCameras(scene, truck, printer, shelves) {
        //Camara 1: Orbital al centro
        const camera1 = new THREE.PerspectiveCamera(Config.FOV, window.innerWidth / window.innerHeight, 0.1, 1000)
        this.cameras.push(camera1)
        this.targets.push(scene)
        this.updateOrbitCamera()

        const camera2 = new THREE.PerspectiveCamera(Config.FOV, window.innerWidth / window.innerHeight, 0.1, 1000)
        this.cameras.push(camera2)
        this.targets.push(printer)
        this.selectedCameraIndex = 1
        this.updateOrbitCamera()

        const camera3 = new THREE.PerspectiveCamera(Config.FOV, window.innerWidth / window.innerHeight, 0.1, 1000)
        this.cameras.push(camera3)
        this.targets.push(shelves)
        this.selectedCameraIndex = 2
        this.updateOrbitCamera()
    }

    getCurrentCamera() {
        return this.cameras[this.selectedCameraIndex]
    }

    updateMousePosition(x, y) {
        this.prevX = x
        this.prevY = y
    }

    updateCameraPosition(mouseX, mouseY) {
        if (this.movingMouse && this.selectedCameraIndex < 3) {
            const dx = mouseX - this.prevX
            const dy = mouseY - this.prevY
            this.horizonalAngle -= (dx/window.innerWidth) * Math.PI * 2
            this.verticalAngle += (dy/window.innerHeight) * Math.PI
        }
        this.updateMousePosition(mouseX, mouseY)
    }

    updateOrbitCamera() {
        if (this.selectedCameraIndex >= 3) {
            throw new Error("Selected camera is not orbital")
        }
        const camera = this.cameras[this.selectedCameraIndex]
        const target = this.targets[this.selectedCameraIndex]
        let targetPos = new THREE.Vector3()
        target.getWorldPosition(targetPos)

        camera.position.y = Math.sin(this.verticalAngle) * this.cameraDistance + targetPos.y
        camera.position.x = Math.cos(this.verticalAngle) * Math.sin(this.horizonalAngle) * this.cameraDistance + targetPos.x
        camera.position.z = Math.cos(this.verticalAngle) * Math.cos(this.horizonalAngle) * this.cameraDistance + targetPos.z
        
        camera.lookAt(targetPos)
    }

    zoomIn() {
        this.zooming = 0.995
    }

    zoomOut() {
        this.zooming = 1.005
    }

    zoomStop() {
        this.zooming = 1
    }

    update() {
        this.cameraDistance *= this.zooming
        this.updateCurrentCamera()
    }

    updateCurrentCamera() {
        if (this.selectedCameraIndex < 3) {
            this.updateOrbitCamera()
        }
    }

    switchCamera(number) {
        this.selectedCameraIndex = Number(number)-1
    }



}