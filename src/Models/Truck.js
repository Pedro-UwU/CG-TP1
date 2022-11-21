const FRONT = 1, BACK = -1, RIGHT = 1, LEFT = -1

class Truck {
    constructor(scene, args) {
        args = args || {}

        const bodyHeight = args.bodyHeight || 0.5
        const bodyWidth = args.bodyWidth || 1
        const bodyDepth = args.bodyDepth || 1.5
        const wheelHeight = args.wheelHeight || 0.1
        const wheelRadius = args.wheelRadius || 0.3
        const sitHeight = args.sitHeigh || 0.6
        const sitWidth = args.sitWidth || (bodyWidth * 0.5)
        
        this.elevatorHeight = args.elevatorHeight || 2
       
        this.body = this.createBody(bodyWidth, bodyHeight, bodyDepth, wheelRadius)
        this.body.name = 'truck'
        scene.add(this.body)


        
        this.wheelFR = this.createWheel(wheelHeight, wheelRadius, bodyWidth, bodyHeight, bodyDepth, FRONT, RIGHT)
        this.wheelFL = this.createWheel(wheelHeight, wheelRadius, bodyWidth, bodyHeight, bodyDepth, FRONT, LEFT)
        this.wheelBR = this.createWheel(wheelHeight, wheelRadius, bodyWidth, bodyHeight, bodyDepth, BACK, RIGHT)
        this.wheelBL = this.createWheel(wheelHeight, wheelRadius, bodyWidth, bodyHeight, bodyDepth, BACK, LEFT)
        this.body.add(this.wheelFR)
        this.body.add(this.wheelFL)
        this.body.add(this.wheelBR)
        this.body.add(this.wheelBL)

        this.sit = this.createSit(sitHeight, sitWidth, bodyWidth, bodyHeight, bodyDepth)
        this.body.add(this.sit)

        this.elevator = this.createElevator(this.elevatorHeight, bodyWidth, 3, bodyWidth, bodyHeight, bodyDepth)
        this.body.add(this.elevator)

        this.plate = this.elevator.getObjectByName('truck-plate')

        this.vel = [0,0,0]
        this.rot = [0,0,0]
        this.lifterSpeed = 0
    }

    createWheel(wheelHeight, wheelRadius, bodyWidth, bodyHeight, bodyDepth, front, side) {
        const wheelGeometry = new THREE.CylinderGeometry(wheelRadius, wheelRadius, wheelHeight, 16)
        const wheelMaterial = new THREE.MeshPhongMaterial({
            // color: 0x000000,
            // flatShading: true
            map: wheelTexture
        })

        const blackMaterial = new THREE.MeshPhongMaterial({
            color: 0x2D2C31
        })
        const wheel = new THREE.Mesh(wheelGeometry, [blackMaterial, wheelMaterial, wheelMaterial])
        wheel.position.set(side * (bodyWidth/2 + wheelHeight/2), -bodyHeight/2, front * (bodyDepth/2 - wheelRadius))
        wheel.rotation.set(0, 0, Math.PI/2)
        wheel.castShadow = true
        return wheel
    }

    createBody(bodyWidth, bodyHeight, bodyDepth, bodySpace) {
        const bodyGeometry = new THREE.BoxGeometry(bodyWidth, bodyHeight, bodyDepth)
        const bodyMaterial = new THREE.MeshPhongMaterial({
            map: truckTexture
        })
        const body = new THREE.Mesh(bodyGeometry, bodyMaterial)
        body.position.y = bodyHeight/2 + bodySpace
        body.castShadow = true
        body.receiveShadow = true
        return body
    }

    createSit(sitHeigh, sitWidth, bodyWidth, bodyHeight, bodyDepth) {
        const sitGeometry = new THREE.BoxGeometry(sitWidth, sitHeigh, 0.1)
        const sitMaterial = new THREE.MeshPhongMaterial({
            color: 0x696647,
            flatShading: true
        })
        const sit = new THREE.Mesh(sitGeometry, sitMaterial)
        sit.position.set(0, bodyHeight/2 + sitHeigh/2, -(bodyDepth/2)*0.8)
        sit.castShadow = true
        return sit
    }

    createElevator(elevatorHeight, elevatorWidth, elevatorSections, bodyWidth, bodyHeight, bodyDepth) {
        const pilar1 = this.createPilar(elevatorHeight, 0.075, elevatorWidth, bodyHeight, RIGHT)
        const pilar2 = this.createPilar(elevatorHeight, 0.075, elevatorWidth, bodyHeight, LEFT)

        const divisions = []
        for (let i = 0; i < elevatorSections; i++) {
            divisions.push(this.createElevatorDivision(bodyWidth * 1.1, 0.05, i * elevatorHeight/(elevatorSections-1)))
        }

        const plate = this.createPlate(elevatorWidth, 0.01, 0)

        const elevator = new THREE.Object3D()
        elevator.position.set(0, 0, bodyDepth/2)
        elevator.add(pilar1)
        elevator.add(pilar2)

        divisions.forEach((division) => {
            elevator.add(division)
        })

        elevator.add(plate)

        return elevator
    }

    createPilar(height, size, bodyWidth, bodyHeight, side) {
        const pilarGeometry = new THREE.BoxGeometry(size, height, size)
        const pilarMaterial = new THREE.MeshPhongMaterial({
            color: 0xb5b5b5,
            flatShading: true
        })
        const pilar = new THREE.Mesh(pilarGeometry, pilarMaterial)
        pilar.position.set(side * (bodyWidth/2), height/2, 0)
        pilar.castShadow = true
        pilar.receiveShadow = true
        return pilar
    }

    createElevatorDivision(width, size, y) {
        const divisionGeometry = new THREE.BoxGeometry(width, size, size)
        const divisionMaterial = new THREE.MeshPhongMaterial({
            color: 0x42cbe3,
            flatShading: true
        })
        const division = new THREE.Mesh(divisionGeometry, divisionMaterial)
        division.position.set(0, y, 0)
        division.castShadow = true
        division.receiveShadow = true
        return division
    }

    createPlate(width, height, y) {
        const plateGeometry = new THREE.BoxGeometry(width, height, width)
        const plateMaterial = new THREE.MeshPhongMaterial({
            map: metalPlateTexture
        })
        const plate = new THREE.Mesh(plateGeometry, plateMaterial)
        plate.position.set(0, y, width/2)
        plate.name = 'truck-plate'
        plate.castShadow = true
        plate.receiveShadow = true
        return plate
    }

    accelerate(velX, velY, velZ) {
        this.vel = [velX, velY, velZ]
    }

    rotate(rX, rY, rZ) {
        this.rot[0] = rX
        this.rot[1] = rY
        this.rot[2] = rZ
    }

    moveLifter(dir) {
        switch(dir) {
            case 'up':
                this.lifterSpeed = Config.LIFTER_SPEED
                break;
            case 'down':
                this.lifterSpeed = -Config.LIFTER_SPEED
                break;
            case 'stop':
                this.lifterSpeed = 0
                break;
        }
    }

    update() {
        this.body.translateX(this.vel[0])
        this.body.translateY(this.vel[1])
        this.body.translateZ(this.vel[2])

        this.body.rotation.x += this.rot[0]
        this.body.rotation.y += this.rot[1]
        this.body.rotation.z += this.rot[2]

        if (this.vel[2] != 0) {
            const rotationSpeed = 1
            this.wheelFR.rotation.x += this.vel[2] * rotationSpeed
            this.wheelFL.rotation.x += this.vel[2] * rotationSpeed
            this.wheelBR.rotation.x += this.vel[2] * rotationSpeed
            this.wheelBL.rotation.x += this.vel[2] * rotationSpeed
        }

        const plate = this.elevator.getObjectByName('truck-plate')
        plate.translateY(this.lifterSpeed)
        
        if (plate.position.y < 0) {
            plate.position.y  = 0
        } else if (plate.position.y >= this.elevatorHeight) {
            plate.position.y = this.elevatorHeight
        }
    }

    distanceToPlate(mesh) {
        let position = new THREE.Vector3()
        mesh.getWorldPosition(position)

        let platePosition = new THREE.Vector3()
        this.plate.getWorldPosition(platePosition)

        return position.distanceTo(platePosition)
    }

    setPrint(mesh) {
        this.plate.add(mesh)
        //delete clipping Plane
        mesh.material.clippingPlanes = []
        mesh.position.set(0,0,0)
    }

    hasPrint() {
        return this.plate.children.length != 0
    }

    detachPrint() {
        const print = this.plate.children[0]
        if (print) {
            this.plate.remove(print)
        }
        return print
    }
}