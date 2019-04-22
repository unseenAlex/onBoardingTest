//definition for a camera scene pipeline module that will place a given model into the scene on tap
//Author: Alexandros Lotsos
/*
PARAMS:
    (1) modelFile: A path to the model file of the object
    (2) startScale: The starting scale of the model
    (3) endScale: The final scale of the mdoel in the scene
    (4) animationMillis: Time it takes to animate the model from s0 to s1
*/

const placeGroundModule = (modelFile, startScale, endScale, animationMillis) => {

    //initialize raycaster, position and three.js gltf loader
    const raycaster = new THREE.Raycaster();
    const tapPosition = new THREE.Vector2();
    const loader = new THREE.GLTFLoader();

    //transparent surface for raycasting and object placement
    let surface;

    //function to initialize the XR scene. Places the surface into the scene and sets initial camera position
    //The scene and camera objects come from xr3js and are only available in the camera loop lifecycle onStart or later
    const initXRScene = ({
        scene,
        camera
    }) => { //TODO: figure out if i need these in a dict
        console.log('initXRScene');

        //initialize the surface
        surface = new THREE.Mesh(
            new THREE.PlaneGeometry(100, 100, 1, 1),
            new THREE.MeshBasicMaterial({
                color: 0xffff00,
                transparent: true,
                opacity: 0.0,
                side: THREE.DoubleSide
            })
        );

        surface.rotateX(-Math.PI / 2);
        surface.position.set(0, 0, 0);
        scene.add(surface);

        //add a light to the scene
        scene.add(new THREE.AmbientLight(0x404040, 5));

        //initial camera position
        camera.position.set(0, 3, 0);
    }

    //function to animate the model on spawn from startScale to endScale using TWEEN.js
    const animateIn = (model, pointX, pointZ, yDegrees) => {

        //get a copy of the startScale vector
        const scale = Object.assign({}, startScale);

        //set position, rotation and scale of the model being animated
        model.scene.rotation.set(0.0, yDegrees, 0.0); //set the rotation of the model around the y-axis
        model.scene.position.set(pointX, 0, pointZ); //set the position of the model on X-Z plane
        model.scene.scale.set(scale.x, scale.y, scale.z); //set the scale of the model to startScale
        //add the model to the XR scene
        XR.Threejs.xrScene().scene.add(model.scene);

        //start a tween from startScale to endScale immediately
        //TODO: figure out if I can break this up to multiple lines for readability
        new TWEEN.Tween(scale).to(endScale, animationMillis).easing(TWEEN.Easing.Elastic.Out).onUpdate(() => {
            model.scene.scale.set(scale.x, scale.y, scale.z)
        }).start();
    }

    //function to load the gltf model at the requested point on the surface
    const placeObject = (pointX, pointZ) => {
        console.log('place object', pointX, pointZ);

        //call the gltf model loader from three.js
        loader.load(modelFile, (gltf) => {
            animateIn(gltf, pointX, pointZ, Math.random() * 360) //animate the model in
        }, (xhr) => {
            console.log(`${(xhr.loaded / xhr.total * 100 )}% loaded`) //progress handler
        }, (error) => {
            console.log('error occured') //error handler
        });
    }

    //event handler to be attached to a touch/click event calls placeObject in response to a tap on a given position on the screen
    const placeObjectTouchHandler = (event) => {

        console.log('touched screen');
        //When the canvas is tapped with two fingers, call XrController.recenter to reset the AR camera
        //to the position specified by XrController.updateCameraProjectionMatrix().
        if (event.touches.length == 2) {
            XR.XrController.recenter();
        }

        //if canvas is tapped with more than two fingers return
        if (event.touches.length > 2) {
            return;
        }

        //else if the canvas is tapped with just one finger and it hits the surface, spawn the object
        const {
            scene,
            camera
        } = XR.Threejs.xrScene();

        // calculate tap position in normalized device coordinates (-1 to +1) for both components.
        tapPosition.x = (event.touches[0].clientX / window.innerWidth) * 2 - 1;
        tapPosition.y = -(event.touches[0].clientY / window.innerHeight) * 2 + 1;

        // Update the picking ray with the camera and tap position.
        raycaster.setFromCamera(tapPosition, camera);

        // Raycast against the "surface" object.
        const intersects = raycaster.intersectObject(surface);

        //if we intersect exactly once with the surface then call placeObject on the position of the intersection
        if (intersects.length == 1 && intersects[0].object == surface) {
            placeObject(intersects[0].point.x, intersects[0].point.z);
        }
    }

    //return the pipeline module object
    return {
        //name of the pipeline module. It needs to be unique within the app
        name: 'placeGround',

        //onStart method that's called when the camera feed begins
        onStart: ({canvas, canvasWidth, canvasHeight}) => {
            const {scene, camera} = XR.Threejs.xrScene(); //get the 3js scene from xr3js

            //initialize the XR scene
            initXRScene({scene, camera}); //adds the surface/lights/camera to the scene and sets starting camera position

            canvas.addEventListener('touchstart', placeObjectTouchHandler, true); //add the touch listener to the canvas

            //enable TWEEN animations
            function animate(time){
                requestAnimationFrame(animate);
                TWEEN.update(time);
            }
            animate();

            //sync the xr controler's 6DoF position and camera parameters with our scene
            XR.XrController.updateCameraProjectionMatrix({
                origin: camera.position,
                facing: camera.quaternion,
            });
        },
    }
}