let gui = new dat.GUI({
    name: "Threejs GUI"
})
var text =
{
    speed: 'someName'
}
gui.add(GUIController, "Print_type", {Extrusion: "Extrusion", Revolution: "Revolution"})
gui.add(GUIController, "Revolution_Shape", {A1: "A1", A2: "A2", A3: "A3", A4:"A4"})
gui.add(GUIController, "Extrusion_Shape", {B1:"B1", B2:"B2", B3:"B3", B4:"B4"})
gui.add(GUIController, "Twist_Angle", 0, 2*Math.PI, 0.01)
gui.add(GUIController, "Print_Height", 0, 1.5, 0.1)
gui.add(GUIController, "Print_Steps", 8, 64, 1)
gui.addColor(GUIController, 'Print_Color')