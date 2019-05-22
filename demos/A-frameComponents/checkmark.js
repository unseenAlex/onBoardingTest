/*
checkmark.js
Author: Alexandros Lotsos
Summary: Main component of the checkmark primitive. Sets the checkmark model and takes in imageTarget metadata
*/

AFRAME.registerComponent('checkmark', {
    schema: {
        name: {
            type: 'string'
        },
    },
    init: function () {

        //get a reference to this object's geometry and scene element
        const {object3D, sceneEl} = this.el;

        //hide the image target until it is found
        object3D.visible = false;

        //set up the checkmark model
        const checkEl = document.createElement('a-entity');
        checkEl.setAttribute('scale', '1 1 1');
        checkEl.setAttribute('gltf-model', '#checkmark');
        this.el.appendChild(checkEl);

        //showImage function to display the checkmark over the image target
        const showImage = ({detail}) => {
            //update position/rotation/scale to match the image target
            object3D.position.copy(detail.position);
            object3D.quaternion.copy(detail.rotation);
            object3D.scale.set(detail.scale, detail.scale, detail.scale);
            object3D.visible = true;
        }

        //hideImage function to hide the checkmark when the image target is lost
        const hideImage = ({detail}) => {
            object3D.visible = false;
        }

        //add eventlisteners to the xrextras-generate-image-targets events
        this.el.addEventListener('xrimagefound', showImage);
        this.el.addEventListener('xrimageupdated', showImage);
        this.el.addEventListener('xrimagelost', hideImage);
    }
});