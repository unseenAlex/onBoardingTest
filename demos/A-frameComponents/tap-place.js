//Aframe component to place a 3D model after tapping the ground.
//Add this component to an a-scene that contains an entity with the ground id to spawn 3D models on tap.

// Component that places trees where the ground is clicked
AFRAME.registerComponent('tap-place', {
  init: function () {
    const ground = document.getElementById('ground');
    ground.addEventListener('click', this.createScene);
  },
  tick: function () {
    //get the main logo and ground in the scene
    var crimeScene = document.getElementById('crimeScene');
    var theGround = document.getElementById('ground');

    //if mainLogo isn't null then remove this component from the scene
    if (crimeScene != null) {
      theGround.removeEventListener('click', this.createScene);
    }

  },

  //function that will spawn a complex 3D object based on a passed id
  //NOTE: the 3D object has to be in the HTML document but not attached to the scene
  createScene: function (event) {
    //create the base entity model for the crime scene
    const crimeScene = document.createElement('a-entity');
    const touchPoint = event.detail.intersection.point; //get a reference to the position the screen was tapped

    //set position, rotation, scale of the original component
    crimeScene.setAttribute('position', touchPoint);
    crimeScene.setAttribute('rotation', '0 0 0');
    crimeScene.setAttribute('scale', '1 1 1');

    //make the scene visible
    crimeScene.setAttribute('visible', 'true');

    //give it the cantap class and the CrimeScene id
    crimeScene.className += "cantap";
    crimeScene.id = "crimeScene";

    //attach the crimeScene to the scene
    document.getElementById("mainScene").appendChild(crimeScene);

    //give the scene the drag, rotate, scale components
    crimeScene.setAttribute('hold-drag', '');
    crimeScene.setAttribute('pinch-scale', '');
    crimeScene.setAttribute('two-finger-spin', '');

    //create the table entity and attach it to the crime scene
    const table = document.createElement('a-entity');
    crimeScene.appendChild(table);
    //set position, rotation, scale of the original component
    table.setAttribute('gltf-model', '#table');
    table.setAttribute('position', '0 0 0');
    table.setAttribute('rotation', '0 0 0');
    table.setAttribute('scale', '0.3 0.3 0.3');

    //create the body entity and attach it to the crime scene;
    const body = document.createElement('a-entity');
    crimeScene.appendChild(body);
    //set position, rotation, scale of the original component
    body.setAttribute('gltf-model', '#body');
    body.setAttribute('position', '0.53 0 1.63');
    body.setAttribute('rotation', '0 57.27 0');
    body.setAttribute('scale', '0.04 0.04 0.04');


    //create the chair entities and attach them to the crime scene;
    const chair1 = document.createElement('a-entity');
    const chair2 = document.createElement('a-entity');
    crimeScene.appendChild(chair1);
    crimeScene.appendChild(chair2);
    //set position, rotation, scale of the original components
    chair1.setAttribute('gltf-model', '#chair');
    chair2.setAttribute('gltf-model', '#chair');
    chair1.setAttribute('position', '-1.9 0 -0.49');
    chair2.setAttribute('position', '0 0 -2.7');
    chair1.setAttribute('rotation', '0 -75 0');
    chair2.setAttribute('rotation', '0 -170.66 0');
    chair1.setAttribute('scale', '0.26 0.26 0.26');
    chair2.setAttribute('scale', '0.26 0.26 0.26');


    //create the knife entity and attach it to the scene
    const knife = document.createElement('a-entity');
    crimeScene.appendChild(knife);
    //set position, rotation, scale of the original component
    knife.setAttribute('gltf-model', '#knife');
    knife.setAttribute('position', '0.4 0.58 1.35');
    knife.setAttribute('rotation', '-14.19 119.43 -9.65');
    knife.setAttribute('scale', '0.04 0.04 0.04');
    knife.setAttribute('material', 'metallness:0.5');

    //debug console.log
    //crimeScene.flushToDOM();
    //console.log(crimeScene);
  }
})