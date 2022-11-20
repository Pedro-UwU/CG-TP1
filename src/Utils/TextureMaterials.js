const floorTexture = new THREE.TextureLoader().load('./src/assets/floor.png', undefined, undefined, (err) => {console.log("Error loading texture")})
const floorNormal = new THREE.TextureLoader().load('./src/assets/floorNormal.png', undefined, undefined, (err) => {console.log("Error loading texture")})
const wallTexture = new THREE.TextureLoader().load('./src/assets/wall.png', undefined, undefined, (err) => {console.log("Error loading texture")})
const wallNormal = new THREE.TextureLoader().load('./src/assets/wallNormal.png', undefined, undefined, (err) => {console.log("Error loading texture")})

const printTexture1 = new THREE.TextureLoader().load('./src/assets/Pattern2A.png', undefined, undefined, (err) => {console.log("Error loading texture")})


floorTexture.wrapS = THREE.RepeatWrapping
floorTexture.wrapT = THREE.RepeatWrapping
floorTexture.repeat.set(8,8)
floorNormal.wrapS = THREE.RepeatWrapping
floorNormal.wrapT = THREE.RepeatWrapping
floorNormal.repeat.set(8,8)

wallTexture.wrapS = THREE.RepeatWrapping
wallTexture.wrapT = THREE.RepeatWrapping
wallTexture.repeat.set(2,1)
wallNormal.wrapS = THREE.RepeatWrapping
wallNormal.wrapT = THREE.RepeatWrapping
wallNormal.repeat.set(2,1)


printTexture1.wrapS = THREE.MirroredRepeatWrapping
printTexture1.wrapT = THREE.MirroredRepeatWrapping
printTexture1.repeat.set(8,16)


