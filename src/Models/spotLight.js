class SpotLight {
    constructor(scene, args) {
        this.modelGeometry = new THREE.CylinderGeometry(0.1, 0.1, 0.05, 8)
        this.modelMaterial = new THREE.MeshPhongMaterial({ color: 0xffffff })
        this.model = new THREE.Mesh( this.modelGeometry, this.modelMaterial )

        this.lightTarget = new THREE.Object3D()
        this.lightTarget.position.set(this.model.position.x, 0, this.model.position.z)
        
        this.light = new THREE.SpotLight( 0xffffff )
        this.light.angle = Math.PI/6
        this.light.intensity = 0.25
        this.light.target = this.lightTarget

        this.light.penumbra = 0.25 
        this.model.add(this.light)

        scene.add(this.model)
        scene.add(this.light.target)
    }
    
    move(x, y, z) {
        this.model.position.set(x, y, z)
        this.lightTarget.position.set(x, 0, z)
    }

}
