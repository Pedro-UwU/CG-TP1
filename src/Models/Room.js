class Room {
    constructor(floorSize, wallSize, scene, args) {
        this.floorSize = floorSize
        this.wallSize = wallSize
        this.scene = scene

        args = args || {}
        
        this.floorMaterial = this.createFloorMaterial(args)
        this.wallMaterial = this.createWallMaterial(scene, args)
        this.floorGeometry = this.createFloorGeometry(args)
        this.wallGeometry = this.createWallGeometry(scene, args)

        this.floor = new THREE.Mesh(this.floorGeometry, this.floorMaterial)
        this.floor.receiveShadow = true
        this.floor.rotation.x = -Math.PI/2

        this.wall_1 = new THREE.Mesh(this.wallGeometry, this.wallMaterial)
        this.wall_1.position.z = -this.floorSize/2
        this.wall_1.position.y = this.wallSize/2

        this.wall_2 = new THREE.Mesh(this.wallGeometry, this.wallMaterial)
        this.wall_2.rotation.y = Math.PI
        this.wall_2.position.z = this.floorSize/2
        this.wall_2.position.y = this.wallSize/2

        this.wall_3 = new THREE.Mesh(this.wallGeometry, this.wallMaterial)
        this.wall_3.rotation.y = Math.PI/2
        this.wall_3.position.x = -this.floorSize/2
        this.wall_3.position.y = this.wallSize/2


        this.wall_4 = new THREE.Mesh(this.wallGeometry, this.wallMaterial)
        this.wall_4.rotation.y = -Math.PI/2
        this.wall_4.position.x = this.floorSize/2
        this.wall_4.position.y = this.wallSize/2

        this.roof = this.floor.clone()
        this.roof.rotation.x += Math.PI
        this.roof.position.y = this.wallSize

        this.container = new THREE.Object3D()



        this.container.add(this.floor)
        this.container.add(this.wall_1)
        this.container.add(this.wall_2)
        this.container.add(this.wall_3)
        this.container.add(this.wall_4)
        this.container.add(this.roof)

        scene.add(this.container)

    }

    createFloorMaterial(args) {
        //TODO Parametrizar material
        const material = new THREE.MeshPhongMaterial({
            color: 0x6b570d,
            flatShading: true
        })
        return material
    }

    createWallMaterial(args) {
        const material = new THREE.MeshPhongMaterial({
            color: 0xadaa9e,
            flatShading: true
        })
        return material
    }

    createFloorGeometry(args) {
        const geometry = new THREE.PlaneGeometry(this.floorSize, this.floorSize)
        return geometry
    }
    
    createWallGeometry(args) {
        const geometry = new THREE.PlaneGeometry(this.floorSize, this.wallSize)
        return geometry
    }
}