//Aframe component to place a 3D model after tapping the ground.
//Add this component to an a-scene that contains an entity with the ground id to spawn 3D models on tap.
//Source: https://github.com/8thwall/web/blob/master/examples/aframe/placeground/index.html

// Component that places trees where the ground is clicked
AFRAME.registerComponent('tap-place', {
  init: function () {
    const ground = document.getElementById('ground')
    ground.addEventListener('click', this.spawner)
    ground.addEventListener('click', this.createScene)
  },
  tick: function () {
    //get the main logo and ground in the scene
    var mainLogo = document.getElementById('mainLogo')
    var theGround = document.getElementById('ground')

    //if mainLogo isn't null then remove this component from the scene
    if (mainLogo != null) {
      theGround.removeEventListener('click', this.spawner)
    }

  },

  spawner: function (event) {
    // Create new entity for the new object
    const newElement = document.createElement('a-entity')
    // The raycaster gives a location of the touch in the scene
    const touchPoint = event.detail.intersection.point
    newElement.setAttribute('position', touchPoint)
    const randomYRotation = Math.random() * 360
    newElement.setAttribute('rotation', '0 ' + randomYRotation + ' 0')
    newElement.setAttribute('visible', 'false')
    newElement.setAttribute('scale', '0.0001 0.0001 0.0001')
    newElement.setAttribute('gltf-model', '#logo')
    newElement.className += "cantap"
    newElement.id += "mainLogo" //add a mainLogo id so that the component can be removed when the main logo has been set
    //this.el.sceneEl.appendChild(newElement) fix this so that we can properly get the scene via document query
    document.getElementById("mainScene").appendChild(newElement) //possible fix?
    newElement.setAttribute('hold-drag', '')
    newElement.setAttribute('pinch-scale', '')
    newElement.setAttribute('two-finger-spin', '')
    console.log(newElement.object3D.rotation);
    console.log(newElement.object3D.position);
    console.log(newElement.object3D.scale);
    newElement.addEventListener('model-loaded', () => {
      // Once the model is loaded, we are ready to show it popping in using an animation
      newElement.setAttribute('visible', 'true')
      newElement.setAttribute('animation', {
        property: 'scale',
        to: '1 1 1',
        easing: 'easeOutElastic',
        dur: 800,
      })
    })
  },

  //function that will spawn a complex 3D object based on a passed id
  //NOTE: the 3D object has to be in the HTML document but not attached to the scene
  createScene: function (id, event) {
    //get the html from the scene
    var obj = document.getElementById(id);
    console.log(obj);
  }
})