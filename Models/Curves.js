const Curves = {
    "B1": {
        getShape: () => {
        const shape = new THREE.Shape()
        shape.moveTo(0.25,0)
        shape.lineTo(0.125, 0.21650635094610965)
        shape.lineTo(-0.125, 0.21650635094610965)

        const path = new THREE.Path()
        path.moveTo(0.25,0)
        path.lineTo(0.125, 0.21650635094610965)
        path.lineTo(-0.125, 0.21650635094610965)
        shape.holes.push(path)

        return shape
        },
        type: "Ext"
    },

    /* B2
    M10,0 C5.0,0.0,3.117449,3.9091575,6.234898,7.818315 C3.117449,3.9091575,-1.1126047,4.8746395,-2.2252095,9.749279 C-1.1126047,4.8746395,-4.5048447,2.169418,-9.009689,4.338836 C-4.5048447,2.169418,-4.504844,-2.1694188,-9.009688,-4.3388376 C-4.504844,-2.1694188,-1.1126051,-4.8746395,-2.2252102,-9.749279 C-1.1126051,-4.8746395,3.1174502,-3.9091566,6.2349005,-7.818313 C3.1174502,-3.9091566, 5,0,10,0
    */
    "B2": {
        getShape: () => {
            const shape = new THREE.Shape()
            shape.moveTo(0.5,0)
            shape.bezierCurveTo(0.25,0.0,0.15587245,0.19545788,0.3117449,0.39091575)
            shape.bezierCurveTo(0.15587245,0.19545788,-0.055630237,0.24373198,-0.111260474,0.48746395)
            shape.bezierCurveTo(-0.055630237,0.24373198,-0.22524223,0.1084709,-0.45048445,0.2169418)
            shape.bezierCurveTo(-0.22524223,0.1084709,-0.22524221,-0.10847094,-0.45048442,-0.21694188)
            shape.bezierCurveTo(-0.22524221,-0.10847094,-0.05563025,-0.24373198,-0.1112605,-0.48746395)
            shape.bezierCurveTo(-0.05563025,-0.24373198,0.15587251,-0.19545783,0.31174502,-0.39091566)
            shape.bezierCurveTo(0.15587251,-0.19545783,0.25,0.0,0.5,0.0)
            const hollowPath = new THREE.Path()
            hollowPath.moveTo(0.5,0)
            hollowPath.bezierCurveTo(0.25,0.0,0.15587245,0.19545788,0.3117449,0.39091575)
            hollowPath.bezierCurveTo(0.15587245,0.19545788,-0.055630237,0.24373198,-0.111260474,0.48746395)
            hollowPath.bezierCurveTo(-0.055630237,0.24373198,-0.22524223,0.1084709,-0.45048445,0.2169418)
            hollowPath.bezierCurveTo(-0.22524223,0.1084709,-0.22524221,-0.10847094,-0.45048442,-0.21694188)
            hollowPath.bezierCurveTo(-0.22524221,-0.10847094,-0.05563025,-0.24373198,-0.1112605,-0.48746395)
            hollowPath.bezierCurveTo(-0.05563025,-0.24373198,0.15587251,-0.19545783,0.31174502,-0.39091566)
            hollowPath.bezierCurveTo(0.15587251,-0.19545783,0.25,0.0,0.5,0.0)
            shape.holes.push(hollowPath)
            return shape
        },
        type: "Ext"
    },
    /* B3
    M1,0.8 L1,-0.8 L3.8,-0.8 C3.8,-3.8 3.8,-3.8 0.8,-3.8 L0.8,-1 L-0.8,-1 L-0.8,-3.8 C-3.8,-3.8 -3.8,-3.8 -3.8,-0.8 L-1,-0.8 L-1,0.8 L-3.8,0.8 C-3.8,3.8 -3.8,3.8 -0.8,3.8 L-0.8,1 L0.8,1 L0.8,3.8 C3.8,3.8 3.8,3.8 3.8,0.8 L1,0.8
    */
    "B3": {
        getShape: () => {
            const shape = new THREE.Shape()
            shape.moveTo(0.125,0.1)
            shape.lineTo(0.125,-0.1)
            shape.lineTo(0.475,-0.1)
            shape.bezierCurveTo(0.475,-0.475,0.475,-0.475,0.1,-0.475)
            shape.lineTo(0.1,-0.125)
            shape.lineTo(-0.1,-0.125)
            shape.lineTo(-0.1,-0.475)
            shape.bezierCurveTo(-0.475,-0.475,-0.475,-0.475,-0.475,-0.1)
            shape.lineTo(-0.125,-0.1)
            shape.lineTo(-0.125,0.1)
            shape.lineTo(-0.475,0.1)
            shape.bezierCurveTo(-0.475,0.475,-0.475,0.475,-0.1,0.475)
            shape.lineTo(-0.1,0.125)
            shape.lineTo(0.1,0.125)
            shape.lineTo(0.1,0.475)
            shape.bezierCurveTo(0.475,0.475,0.475,0.475,0.475,0.1)
            shape.lineTo(0.125,0.1)

            const path = new THREE.Path()
            path.moveTo(0.125,0.1)
            path.lineTo(0.125,-0.1)
            path.lineTo(0.475,-0.1)
            path.bezierCurveTo(0.475,-0.475,0.475,-0.475,0.1,-0.475)
            path.lineTo(0.1,-0.125)
            path.lineTo(-0.1,-0.125)
            path.lineTo(-0.1,-0.475)
            path.bezierCurveTo(-0.475,-0.475,-0.475,-0.475,-0.475,-0.1)
            path.lineTo(-0.125,-0.1)
            path.lineTo(-0.125,0.1)
            path.lineTo(-0.475,0.1)
            path.bezierCurveTo(-0.475,0.475,-0.475,0.475,-0.1,0.475)
            path.lineTo(-0.1,0.125)
            path.lineTo(0.1,0.125)
            path.lineTo(0.1,0.475)
            path.bezierCurveTo(0.475,0.475,0.475,0.475,0.475,0.1)
            path.lineTo(0.125,0.1)

            shape.holes.push(path)
            return shape
        },
        type: "Ext"
    },

    /* B4
    M1,1 C1,2 -1,2 -1,1 L-1,-1 C-1,-2 1,-2 1,-1 L1,1
    */
    "B4": {
        getShape: () => {
            const shape = new THREE.Shape()
            shape.moveTo(0.25,0.25)
            shape.bezierCurveTo(0.25,0.5,-0.25,0.5,-0.25,0.25)
            shape.lineTo(-0.25,-0.25)
            shape.bezierCurveTo(-0.25,-0.5,0.25,-0.5,0.25,-0.25)
            shape.lineTo(0.25,0.25)

            const path = new THREE.Path()
            path.moveTo(0.25,0.25)
            path.bezierCurveTo(0.25,0.5,-0.25,0.5,-0.25,0.25)
            path.lineTo(-0.25,-0.25)
            path.bezierCurveTo(-0.25,-0.5,0.25,-0.5,0.25,-0.25)
            path.lineTo(0.25,0.25)
            shape.holes.push(path)
            return shape
        },
        type: "Ext"
    }
}