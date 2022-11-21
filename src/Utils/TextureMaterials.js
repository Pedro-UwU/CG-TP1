const floorTexture = new THREE.TextureLoader().load('./src/assets/floor.png', undefined, undefined, (err) => {console.log("Error loading texture")})
const floorNormal = new THREE.TextureLoader().load('./src/assets/floorNormal.png', undefined, undefined, (err) => {console.log("Error loading texture")})
const wallTexture = new THREE.TextureLoader().load('./src/assets/wall.png', undefined, undefined, (err) => {console.log("Error loading texture")})
const wallNormal = new THREE.TextureLoader().load('./src/assets/wallNormal.png', undefined, undefined, (err) => {console.log("Error loading texture")})
const wheelTexture = new THREE.TextureLoader().load('./src/assets/wheel.jpg', undefined, undefined, (err) => {console.log("Error loading texture")})
const truckTexture = new THREE.TextureLoader().load('./src/assets/truck.jpg', undefined, undefined, (err) => {console.log("Error loading texture")})
const woodTexture = new THREE.TextureLoader().load('./src/assets/wood.jpg', undefined, undefined, (err) => {console.log("Error loading texture")})
const metalPlateTexture = new THREE.TextureLoader().load('./src/assets/metalPlate.jpg', undefined, undefined, (err) => {console.log("Error loading texture")})
const envTexture = new THREE.TextureLoader().load('./src/assets/envTexture.jpg', undefined, undefined, (err) => {console.log("Error loading texture")})

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

truckTexture.wrapS = THREE.RepeatWrapping
truckTexture.wrapT = THREE.RepeatWrapping
truckTexture.repeat.set(1,1)

woodTexture.wrapS = THREE.RepeatWrapping
woodTexture.wrapT = THREE.RepeatWrapping
woodTexture.repeat.set(0.005,18)

printTexture1.wrapS = THREE.MirroredRepeatWrapping
printTexture1.wrapT = THREE.MirroredRepeatWrapping
printTexture1.repeat.set(8,16)



