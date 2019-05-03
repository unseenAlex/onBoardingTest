//index js file for three8ths.html
//Loads all the custom camera pipeline modules for the XRScene and handles loading

//define scene variables
var model = "export/body.gltf"; //model to be loaded
var s0 = new THREE.Vector3(0.01, 0.01, 0.01); //starting scale
var s1 = new THREE.Vector3(1, 1, 1); //ending scale
var t = 750; //duration of animation


const onxrloaded = () => {
    //add camera pipeline modules
    XR.addCameraPipelineModules([ // Add camera pipeline modules.
        // Existing pipeline modules.
        XR.GlTextureRenderer.pipelineModule(), // Draws the camera feed.
        XR.Threejs.pipelineModule(), // Creates a ThreeJS AR Scene.
        XR.XrController.pipelineModule(), // Enables SLAM tracking.
        XRExtras.AlmostThere.pipelineModule(), // Detects unsupported browsers and gives hints.
        XRExtras.FullWindowCanvas.pipelineModule(), // Modifies the canvas to fill the window.
        XRExtras.Loading.pipelineModule(), // Manages the loading screen on startup.
        XRExtras.RuntimeError.pipelineModule(), // Shows an error image on runtime error.
        // Custom pipeline modules below
        placeGroundModule(model, s0, s1, t),
    ]);

    // Open the camera and start running the camera run loop.
    XR.run({
        canvas: document.getElementById('camerafeed');
    });
}

// Show loading screen before the full XR library has been loaded.
const load = () => { XRExtras.Loading.showLoading({onxrloaded}) }
window.onload = () => { window.XRExtras ? load() : window.addEventListener('xrextrasloaded', load) }