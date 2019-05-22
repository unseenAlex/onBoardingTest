/*
updater.js
Author: Alexandros Lotsos
Summary: Helper component for the checkmark primitive. Finds the check-spawner component in the scene and increments its counter to let users spawn a model into the scene
after finding all the required image targets
*/

AFRAME.registerComponent('updater', {
    init: function(){
        //get the scene element and components of this object
        const {sceneEl} = this.el;
        const {"place-model": placeModel} = sceneEl.components;
        
        //bind this to the imageFound/imageLost so we can change the scanned attribute
        this.imageFound = this.imageFound.bind(this);
        this.imageLost = this.imageLost.bind(this);

        //attach the event listeners
        this.el.addEventListener('xrimagefound', this.imageFound);
        this.el.addEventListener('xrimagelost', this.imageLost);
    },
    imageFound: function(){
        //if scanned isn't true then make it
        if(!this.scanned){
            console.log(this.el.sceneEl.components);
            this.el.sceneEl.components["check-spawner"].increment();
            this.scanned = true;
        }

    },
    imageLost: function(){
        console.log("Image lost");
    },
    scanned: false,

});