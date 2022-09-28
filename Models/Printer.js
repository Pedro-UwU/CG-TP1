class Printer {
    constructor(scene) {
        const baseRadius = 1
        const baseHeight = 1.5
        const borderHeight = 0.05
        const innerRadius = 0.9
        const poleRadius = 0.05
        const poleHeight = baseHeight*2
        const plateSize = innerRadius * 2 - 0.5

        this.base = this.createBase(baseRadius, baseHeight, borderHeight, innerRadius)
        this.pole = this.createPole(baseRadius, poleRadius, poleHeight)
        this.arm = this.createArm(poleHeight/2, baseRadius, plateSize)
        this.base.add(this.pole)
        this.pole.add(this.arm)
        scene.add(this.base)
    }

    createBase(radius, height, borderHeight, innerRadius) {
        const points = []
        points.push(new THREE.Vector2(0, 0))
        points.push(new THREE.Vector2(radius, 0))
        points.push(new THREE.Vector2(radius, height + borderHeight))
        points.push(new THREE.Vector2(innerRadius, height + borderHeight))
        points.push(new THREE.Vector2(innerRadius, height))
        points.push(new THREE.Vector2(0, height))

        const baseGeometry = new THREE.LatheGeometry( points, 24)
        const baseMaterial = new THREE.MeshPhongMaterial({
            color: 0xFFA0F4,
            flatShading: true
        })
        const base = new THREE.Mesh( baseGeometry, baseMaterial )
        base.castShadow = true
        base.receiveShadow = true
        return base
    }

    createPole(baseRadius, poleRadius, poleHeight) {
        const poleGeometry = new THREE.CylinderGeometry(poleRadius, poleRadius, poleHeight, 24)
        const poleMaterial = new THREE.MeshPhongMaterial({
            color: 0xDFDFDF,
            flatShading: false
        })
        const pole = new THREE.Mesh(poleGeometry, poleMaterial)
        pole.castShadow = true
        pole.receiveShadow = true
        pole.position.set(0, poleHeight/2, -baseRadius)
        return pole
    }

    createArm(height, length, plateSize) {
        const innerArmBlockSize = 0.2
        const innerBlock = this.createInnerBlock(height, 0.3)
        const innerArm = this.createInnerArm(length)
        const innerArmBlock = this.createInnerArmBlock(innerArmBlockSize, length/2)
        const innerPlate = this.createInnerPlate(plateSize, innerArmBlockSize/2)
        innerBlock.add(innerArm)
        innerArm.add(innerArmBlock)
        innerArmBlock.add(innerPlate)

        return innerBlock
    }

    createInnerBlock(height, size) {
        const innerBlockGeometry = new THREE.BoxGeometry(size, size, size)
        const innerBlockMaterial = new THREE.MeshPhongMaterial({
            color: 0x00FF00,
            flatShading: true
        })
        const innerBlock = new THREE.Mesh(innerBlockGeometry, innerBlockMaterial)
        innerBlock.position.y = height
        innerBlock.castShadow = true
        innerBlock.receiveShadow = true
        return innerBlock

    }

    createInnerArm(length) {
        const innerArmGeometry = new THREE.CylinderGeometry(0.05, 0.05, length, 12)
        const innerArmMaterial = new THREE.MeshPhongMaterial({
            color: 0x0000A0,
            flatShading: false
        })
        const innerArm = new THREE.Mesh(innerArmGeometry, innerArmMaterial)
        innerArm.castShadow = true
        innerArm.receiveShadow = true
        innerArm.rotation.x = -Math.PI/2
        innerArm.position.z = length/2
        return innerArm
    }
    
    createInnerArmBlock(size, offset) {
        const innerArmBlockGeometry = new THREE.BoxGeometry(size, size, size)
        const innerArmBlockMaterial = new THREE.MeshPhongMaterial({
            color: 0x00FF00,
            flatShading: true
        })
        const innerArmBlock = new THREE.Mesh(innerArmBlockGeometry, innerArmBlockMaterial)
        innerArmBlock.castShadow = true
        innerArmBlock.receiveShadow = true
        innerArmBlock.position.y = -offset
        return innerArmBlock
    }

    createInnerPlate(size, yOffset) {
        const innerPlateGeometry = new THREE.BoxGeometry(size, 0.01, size)
        const innerPlateMaterial = new THREE.MeshPhongMaterial({
            color: 0x00FF00,
            flatShading: true
        })
        const innerPlate = new THREE.Mesh(innerPlateGeometry, innerPlateMaterial)
        innerPlate.castShadow = true
        innerPlate.receiveShadow = true
        innerPlate.rotation.x = Math.PI/2
        innerPlate.position.z = -yOffset
        return innerPlate
    }

    move(x, y, z) {
        this.base.position.set(x,y,z)
    }

    rotate(rx, ry, rz) {
        this.base.rotation.set(rx, ry, rz)
    }
}