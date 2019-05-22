/*
place-model.js
Author: Alexandros Lotsos
Summary: 8Frame component that let's a user tap onto a scene to place an asset of their choice.
*/

AFRAME.registerComponent('place-model', {

    //schema defines the data model of the component (i.e. the parameters it takes)
    schema: {
        modelID: {
            type: 'string',
            default: ''
        },
        modelScale: {
            type: 'vec3',
            default: {
                x: 1,
                y: 1,
                z: 1
            }
        },
        modelRotation: {
            type: 'vec3',
            default: {
                x: 0,
                y: 0,
                z: 0
            }
        },
        limit: {
            type: 'int',
            default: 1
        }
    },
    //init function fires when the component is successfully loaded
    init: function () {
        //get the ground of the scene and attach the spawnModel function to it
        const ground = document.querySelector('#ground');
        //bind this so we have access to the component schema
        const data = this;
        this.spawnModel = this.spawnModel.bind(data);
        ground.addEventListener('click', this.spawnModel);
    },
    //spawnModel is the function responsible for responding to a tap and spawning a model
    spawnModel: function (event) {
        const model = document.createElement('a-entity');
        const touchPoint = event.detail.intersection.point; //get a reference to the touch point

        //set the initial position rotation and scale of the original model
        //TODO: make these customizable through schema
        model.setAttribute('position', touchPoint);
        model.setAttribute('rotation', this.data.modelRotation);
        model.setAttribute('scale', this.data.modelScale);

        console.log(this.data);
        //attach the specified gltf model to the entity
        model.setAttribute('gltf-model', this.data.modelID);

        model.setAttribute('visible', 'true');

        //give it the cantap class and the placeModel id for reference
        model.className += "cantap";
        model.id = "placeModel";

        //attach the model to the scene
        document.querySelector('#mainScene').appendChild(model);

        //give the model the drag rotate and scale components
        model.setAttribute('hold-drag', '');
        model.setAttribute('pinch-scale', '');
        model.setAttribute('two-finger-spin', '');

        //increment the model count and check to see if the spawner should be removed
        this.count++;
        this.removeSpawner();
    },
    //function to check whether we've reached the limit of models in the scene
    removeSpawner: function () {
        const ground = document.querySelector('#ground');

        if (this.count >= this.data.limit) {
            ground.removeEventListener('click', this.spawnModel);
        }
    },
    count: 0,
});