//Aframe component to place a 3D model after tapping the ground.
//Add this component to an a-scene that contains an entity with the ground id to spawn 3D models on tap.
//Source: https://github.com/8thwall/web/blob/master/examples/aframe/placeground/index.html

// Component that places trees where the ground is clicked
AFRAME.registerComponent('tap-place', {
    init: function() {
      const ground = document.getElementById('ground')
      ground.addEventListener('click', event => {
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
        this.el.sceneEl.appendChild(newElement)
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
      })
    }
  })