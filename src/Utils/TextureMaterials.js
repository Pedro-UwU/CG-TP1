const floorTexture = new THREE.TextureLoader().load('./src/assets/floor.png', undefined, undefined, (err) => {console.log("Error loading texture")})
const floorNormal = new THREE.TextureLoader().load('./src/assets/floorNormal.png', undefined, undefined, (err) => {console.log("Error loading texture")})
const wallTexture = new THREE.TextureLoader().load('./src/assets/wall.png', undefined, undefined, (err) => {console.log("Error loading texture")})
const wallNormal = new THREE.TextureLoader().load('./src/assets/wallNormal.png', undefined, undefined, (err) => {console.log("Error loading texture")})
const wheelTexture = new THREE.TextureLoader().load('./src/assets/wheel.jpg', undefined, undefined, (err) => {console.log("Error loading texture")})
const truckTexture = new THREE.TextureLoader().load('./src/assets/truck.jpg', undefined, undefined, (err) => {console.log("Error loading texture")})
const woodTexture = new THREE.TextureLoader().load('./src/assets/wood.jpg', undefined, undefined, (err) => {console.log("Error loading texture")})
const metalPlateTexture = new THREE.TextureLoader().load('./src/assets/metalPlate.jpg', undefined, undefined, (err) => {console.log("Error loading texture")})

const printTexture1 = new THREE.TextureLoader().load('./src/assets/P1.png', undefined, undefined, (err) => {console.log("Error loading texture")})
const printTexture2 = new THREE.TextureLoader().load('./src/assets/P2.png', undefined, undefined, (err) => {console.log("Error loading texture")})
const printTexture3 = new THREE.TextureLoader().load('./src/assets/P3.png', undefined, undefined, (err) => {console.log("Error loading texture")})
const printTexture4 = new THREE.TextureLoader().load('./src/assets/P4.png', undefined, undefined, (err) => {console.log("Error loading texture")})
const printTexture5 = new THREE.TextureLoader().load('./src/assets/P5.png', undefined, undefined, (err) => {console.log("Error loading texture")})

const printTextures = {
    "Texture1": printTexture1,
    "Texture2": printTexture2,
    "Texture3": printTexture3,
    "Texture4": printTexture4,
    "Texture5": printTexture5
}


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

printTexture2.wrapS = THREE.MirroredRepeatWrapping
printTexture2.wrapT = THREE.MirroredRepeatWrapping
printTexture2.repeat.set(8,16)

printTexture3.wrapS = THREE.RepeatWrapping
printTexture3.wrapT = THREE.RepeatWrapping
printTexture3.repeat.set(1,2)

printTexture4.wrapS = THREE.MirroredRepeatWrapping
printTexture4.wrapT = THREE.MirroredRepeatWrapping
printTexture4.repeat.set(2,4)

printTexture5.wrapS = THREE.MirroredRepeatWrapping
printTexture5.wrapT = THREE.MirroredRepeatWrapping
printTexture5.repeat.set(2,4)


