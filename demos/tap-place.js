//Aframe component to place a 3D model after tapping the ground.
//Add this component to an a-scene that contains an entity with the ground id to spawn 3D models on tap.
//Source: https://github.com/8thwall/web/blob/master/examples/aframe/placeground/index.html

// Component that places trees where the ground is clicked
AFRAME.registerComponent('tap-place', {
  init: function () {
    const ground = document.getElementById('ground')
    ground.addEventListener('click', this.spawner)
  },
  tick: function () {
    //get the main logo and ground in the scene
    var mainLogo = document.getElementById('mainLogo')
    var theGround = document.getElementById('ground')
    console.log(typeof(mainLogo)

    //if mainLogo isn't null then remove this component from the scene
    if (typeof (mainLogo) != "null") {
      theGround.removeEventListener('click', this.spawner)
      //this.sceneEl.removeAttribute('tap-place')
    }

  },

  spawner: function (event) {
    // Create new entity for the new object
    const newElement = document.createElement('a-entity')
    console.log(newElement)
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
    this.el.sceneEl.appendChild(newElement)
    newElement.setAttribute('hold-drag', '')
    newElement.setAttribute('pinch-scale', '')
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
  }
})