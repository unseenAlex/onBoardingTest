//Aframe component to place a 3D model after tapping the ground.
//Add this component to an a-scene that contains an entity with the ground id to spawn 3D models on tap.
//Source: https://github.com/8thwall/web/blob/master/examples/aframe/placeground/index.html

AFRAME.registerComponent('tap-place', {
    init: function () {
        //get the ground
        const ground = document.getElementById('ground');

        //add click event listener to the ground, pass the click event into the callback function
        ground.addEventListener('click', event => {
            //create a new entity for the object to be placed
            const newElement = document.createElement('a-entity');

            //use the raycaster to get the location of the touch in the scene
            const touchpoint = event.detail.intersection.point;
            newElement.setAttribute('position', touchPoint);

            //choose a random y rotation for the new object
            const randomYRotation = Math.random() * 360;
            newElement.setAttribute('rotation', '0 ' + randomYRotation + ' 0');

            //set visibility to false and scale to tiny before the model loads
            newElement.setAttribute('visible', false);
            newElement.setAttribute('scale', '0.0001 0.0001 0.0001');

            //set the model of the new entity
            //TODO: Figure out how to change this on demand
            newElement.setAttribute('gltf-model', '#logo');

            //append the new element to the scene
            this.el.sceneEl.appendChild(newElement);

            //add a model-loaded event to show the model when loaded
            newElement.addEventListener('model-loaded', () => {
                //set visibility to true
                newElement.setAttribute('visible', true);
                //animate the scale to a reasonable amount
                newElement.setAttribute('animation', {
                    property: 'scale', //what attribute we're animating
                    to: '0.1 0.1 0.1', //the final value of the attribute
                    easing: 'easeOutElastic', //easing parameter
                    dur: 800, //duration of the animation
                });
                //add hold-drag component to the element
                newElement.setAttribute('hold-drag');
            });
        });
    }
});