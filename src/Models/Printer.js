class Printer {
    constructor(scene) {
        const baseRadius = 1
        const baseHeight = 1.5
        const borderHeight = 0.05
        const innerRadius = 0.9
        const poleRadius = 0.05
        const poleHeight = baseHeight*2
        const plateSize = innerRadius * 2 - 0.5
        const innerArmBlockSize = 0.2
        const innerBlockSize = 0.3

        this.baseHeight = baseHeight
        this.armPosition  = 1 //Goes from 0 to 1
        this.printing = false
        this.innerArmBlockSize = innerArmBlockSize
        this.innerBlockSize = innerBlockSize

        this.base = this.createBase(baseRadius, baseHeight, borderHeight, innerRadius)
        this.pole = this.createPole(baseRadius, poleRadius, poleHeight)
        this.arm = this.createArm(poleHeight/2, baseRadius, plateSize, this.armPosition)
        this.base.add(this.pole)
        this.pole.add(this.arm)

        let absolutePlatePosition = new THREE.Vector3()
        this.innerPlate.getWorldPosition(absolutePlatePosition)
        
        //Create clippingPlane fot the impresions
        this.clippingPlane = new THREE.Plane(new THREE.Vector3(0, -1, 0), absolutePlatePosition.y)
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

        const baseGeometry = new THREE.LatheGeometry( points, 64)
        const baseMaterial = new THREE.MeshPhongMaterial({
            color: 0xFFA0F4,
            flatShading: false
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

    createArm(height, length, plateSize, initialPos) {
        const innerBlock = this.createInnerBlock(initialPos * (this.baseHeight - this.innerBlockSize) + this.innerBlockSize/2, this.innerBlockSize)
        const innerArm = this.createInnerArm(length)
        const innerArmBlock = this.createInnerArmBlock(this.innerArmBlockSize, length/2)
        const innerPlate = this.createInnerPlate(plateSize, this.innerArmBlockSize/2)
        innerBlock.add(innerArm)
        innerArm.add(innerArmBlock)
        innerArmBlock.add(innerPlate)

        this.print = null

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
        this.innerPlate = innerPlate
        return innerPlate
    }

    move(x, y, z) {
        this.base.position.set(x,y,z)
    }

    rotate(rx, ry, rz) {
        this.base.rotation.set(rx, ry, rz)
    }

    getClippingPlane() {
        return this.clippingPlane
    }

    printShape() {
        if (this.hasPrint() || this.printing) {
            return
        }
        this.printing = true
        this.armPosition = 0
        this.updateArmPosition()
        // Obtener la forma bezier del objeto segun el nombre
        
        // Crear el objeto
        let shape
        let shapeGeometry, shapeMaterial
        if (GUIController.Print_type == 'Extrusion') {
            shape = Curves[GUIController.Extrusion_Shape].getShape()
            const settings = {
                steps: GUIController.Print_Steps,
                depth: GUIController.Print_Height,
                bevelEnabled: false
            }

            shapeGeometry = new THREE.ExtrudeGeometry(shape, settings)
            shapeMaterial = new THREE.MeshPhongMaterial({
                color: GUIController.Print_Color,
                clippingPlanes: [this.clippingPlane],
                flatShading: false,
                side: THREE.DoubleSide,
                shininess: 50
            })
            this.twistMesh(shapeGeometry, GUIController.Twist_Angle)

        } else if (GUIController.Print_type == 'Revolution') {
            shape = Curves[GUIController.Revolution_Shape].getPath()
            shapeGeometry = new THREE.LatheGeometry( shape.getPoints(), GUIController.Print_Steps, 0, 2*Math.PI );

            //flip the normals, they are inverted
            let temp;
            for ( let i = 0; i < shapeGeometry.index.array.length; i += 3 ) {
                // swap the first and third values
                temp = shapeGeometry.index.array[ i ];
                shapeGeometry.index.array[ i ] = shapeGeometry.index.array[ i + 2 ];
                shapeGeometry.index.array[ i + 2 ] = temp;
            }

            shapeMaterial = new THREE.MeshPhongMaterial({
                color: GUIController.Print_Color,
                clippingPlanes: [this.clippingPlane],
                flatShading: false,
                side: THREE.DoubleSide
            })
            console.log(shapeGeometry)
            
        }
        const print = new THREE.Mesh(shapeGeometry, shapeMaterial)

        print.castShadow = true
        if (GUIController.Print_type == 'Extrusion') {
            print.rotation.set(-Math.PI/2, 0, 0)
        }
        print.position.y = this.baseHeight
        
        print.name = 'print'

        //print.geometry.computeVertexNormals();

        this.base.add(print)
        
        this.print = print

    }

    updateArmPosition() {
        this.arm.position.y = this.armPosition * (this.baseHeight - this.innerBlockSize) + this.innerBlockSize/2
        let absolutePlatePosition = new THREE.Vector3()
        this.innerPlate.getWorldPosition(absolutePlatePosition)
        this.clippingPlane.constant = absolutePlatePosition.y
    }

    update() {
        if (this.printing) {
            this.armPosition += 0.01
            if (this.armPosition >= 1) {
                this.armPosition = 1
                this.printing = false
            }
            this.updateArmPosition()
        }
    }

    twistMesh(geometry, totalAngle) {
        const vertices = geometry.attributes.position.array

        //get maxZ
        let maxZ = 0
        for (let i = 2; i < vertices.length; i += 3) {
            if (vertices[i] > maxZ) {
                maxZ = vertices[i]
            }
        }
        for (let i = 0; i < vertices.length; i+=3) {
            let x = vertices[i]
            let y = vertices[i+1]
            let z = vertices[i+2]
            let angle = totalAngle *(z/maxZ);
            const newX = x * Math.cos(angle) - y * Math.sin(angle)
            const newY = x * Math.sin(angle) + y * Math.cos(angle)
            vertices[i] = newX
            vertices[i+1] = newY
        }
    }

    hasPrint() {
        return this.print != null && !this.printing
    }

    detachPrint() {
        const print = this.print
        if (print != null) {
            this.base.remove(print)
            this.print = null
        }
        return print
    }

}