//Aframe component to place a 3D model after tapping the ground.
//Add this component to an a-scene that contains an entity with the ground id to spawn 3D models on tap.

// Component that places trees where the ground is clicked
AFRAME.registerComponent('tap-place', {
    init: function () {
      const ground = document.getElementById('ground')
      ground.addEventListener('click', this.createScene)
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
      document.getElementById("mainScene").appendChild(tableScene);
  
      //give the scene the drag, rotate, scale components
      crimeScene.setAttribute('hold-drag', '');
      crimeScene.setAttribute('pinch-scale', '');
      crimeScene.setAttribute('two-finger-spin', '');
  
      //create the table entity and attach it to the crime scene
      const table2 = document.createElement('a-entity');
      crimeScene.appendChild(table2);
      //set position, rotation, scale of the original component
      table.setAttribute('gltf-model', '#table');
      table.setAttribute('position', '0 0 0');
      table.setAttribute('rotation', '0 0 0');
      table.setAttribute('scale', '0.3 0.3 0.3');
  
      //create the body entity and attach it to the crime scene;
      const tableCloth = document.createElement('a-entity');
      crimeScene.appendChild(table2);
      //set position, rotation, scale of the original component
      body.setAttribute('gltf-model', '#tableCloth');
      body.setAttribute('position', '0.53 0 1.63');
      body.setAttribute('rotation', '0 57.27 0');
      body.setAttribute('scale', '0.04 0.04 0.04');
  
      //debug console.log
      //crimeScene.flushToDOM();
      //console.log(crimeScene);
    }
  })