class Shelves {
    constructor(scene) {
        this.container = new THREE.Object3D()
        const levels = 2
        const spaces = 8
        const height = 3
        const floorOffset = 1
        const cellWidth = 1.1
        const width = cellWidth * spaces
        const legHeight = height + floorOffset - (height/levels/2)

        this.shelves = []
        this.legs = []
        this.avaiablePlaces = []
        for (let i = 0; i < levels; i++) {
            const shelfSpaces = []
            for (let j = 0; j < spaces; j++) {
                shelfSpaces.push(null)
            }
            this.avaiablePlaces.push(shelfSpaces)
        }
        this.levels = levels
        this.spaces = spaces

        const legY = legHeight/2
        for (let i = 0; i < levels; i++) {
            const shelf = this.createShelf((i * height/levels) + floorOffset, width, cellWidth, spaces, this.avaiablePlaces[i])
            this.shelves.push(shelf)
            this.container.add(shelf)
        }

        for (let i = 0; i <= spaces; i++) {
            const leg1 = this.createLeg((i * width/spaces) - width/2, legY, cellWidth/2, legHeight, 0.05)
            this.legs.push(leg1)
            this.container.add(leg1)
            const leg2 = this.createLeg((i * width/spaces) - width/2, legY, -cellWidth/2, legHeight, 0.05)
            this.legs.push(leg2)
            this.container.add(leg2)
        }
        scene.add(this.container)
    }

    createShelf(height, width, depth, spaces, avaiablePlaces) {
        const shelfGeometry = new THREE.BoxGeometry(width, 0.05, depth)
        const shelfMaterial = new THREE.MeshPhongMaterial({
            color: 0xd9d8d4,
            flatShading: true
        })
        const shelf = new THREE.Mesh(shelfGeometry, shelfMaterial)
        
        for (let i = 0; i < spaces; i++) {
            const offSet = width/spaces/2
            let x = i * (width/spaces) + offSet
            x -= width/2
            //Aca irian los objects3D, ahora pongo cubos para jaja
            const tempGeometry = new THREE.BoxGeometry(0.5, 0.5, 0.5)
            const tempMaterial = new THREE.MeshPhongMaterial({
                color: 0x0000FF
            })
            const temp = new THREE.Object3D()
            temp.position.x = x
            shelf.add(temp)
            avaiablePlaces[i] = temp
        }

        shelf.position.set(0, height, 0)
        shelf.castShadow = true
        shelf.receiveShadow = true
        return shelf
    }

    createLeg(x, y, z, height, size) {
        const legGeometry = new THREE.BoxGeometry(size, height, size)
        const legMaterial = new THREE.MeshPhongMaterial({
            color: 0x101010,
            flatShading: true
        })
        const leg = new THREE.Mesh(legGeometry, legMaterial)
        leg.position.set(x,y,z)
        leg.castShadow = true
        leg.receiveShadow = true
        return leg
    }

    move(x, y, z) {
        this.container.position.set(x, y, z)
    }

    getClosestShelf(mesh) {
        let meshPos = new THREE.Vector3()
        mesh.getWorldPosition(meshPos)

        let closestDist = Infinity
        let closestShelf = null
        for (let i = 0; i < this.levels; i++) {
            for (let j = 0; j < this.spaces; j++) {
                if (this.avaiablePlaces[i][j].children.length > 0) {
                    continue
                }
                let shelfPos = new THREE.Vector3()
                this.avaiablePlaces[i][j].getWorldPosition(shelfPos)
                const dist = meshPos.distanceTo(shelfPos)
                if (dist < closestDist && dist < Config.DISTANCE_TO_LIFT) {
                    closestDist = dist
                    closestShelf = this.avaiablePlaces[i][j]
                }
            }
        }
        return closestShelf
    }

}