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
        this.floor.rotation.x = -Math.PI/2

        this.wall_1 = new THREE.Mesh(this.wallGeometry, this.wallMaterial)
        this.wall_1.position.z = -this.floorSize/2

        this.wall_2 = new THREE.Mesh(this.wallGeometry, this.wallMaterial)
        this.wall_2.position.z = this.floorSize/2

        this.wall_3 = new THREE.Mesh(this.wallGeometry, this.wallMaterial)
        this.wall_3.rotation.y = -Math.PI/2
        this.wall_3.position.x = -this.floorSize/2

        this.wall_4 = new THREE.Mesh(this.wallGeometry, this.wallMaterial)
        this.wall_4.rotation.y = Math.PI/2
        this.wall_4.position.x = this.floorSize/2

        scene.add(this.floor)
        scene.add(this.wall_1)
        scene.add(this.wall_2)
        scene.add(this.wall_3)
        scene.add(this.wall_4)

    }

    createFloorMaterial(args) {
        //TODO Parametrizar material
        const material = new THREE.MeshPhongMaterial({
            color: 0xdbce58,
            flatShading: true
        })
        material.side = THREE.DoubleSide
        return material
    }

    createWallMaterial(args) {
        const material = new THREE.MeshPhongMaterial({
            color: 0x00FF00,
            flatShading: true
        })
        material.side = THREE.DoubleSide
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