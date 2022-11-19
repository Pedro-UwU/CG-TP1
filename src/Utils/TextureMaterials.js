const floorTexture = new THREE.TextureLoader().load('./src/assets/floor.png', undefined, undefined, (err) => {console.log("Error loading texture")})
const floorNormal = new THREE.TextureLoader().load('./src/assets/floorNormal.png', undefined, undefined, (err) => {console.log("Error loading texture")})

floorTexture.wrapS = THREE.RepeatWrapping
floorTexture.wrapT = THREE.RepeatWrapping
floorTexture.repeat.set(8,8)
floorNormal.wrapS = THREE.RepeatWrapping
floorNormal.wrapT = THREE.RepeatWrapping
floorNormal.repeat.set(8,8)
