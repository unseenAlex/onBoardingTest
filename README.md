# onBoardingTest
Test repo for the Unseen Media onboarding experience.

This site is hosted on github pages at https://unseenalex.github.io/onBoardingTest/

Check below for potential useful information.

# Loading 3D Models
A-frame scenes can load 3D models via the \<a-assets\> tag which should be placed at the top of every A-frame scene. the \<a-assets\> tag contains \<a-asset-item\> tags which specify an id for the asset and a source as follows:
<br>
```
    <a-assets>
        <a-asset-item id="barrel" src="export/barrel.gltf"></a-asset-item>
    </a-assets>
```
***
A given asset can be called via the id it was given through an \<a-entity\> tag that has a gltf-model property. These tags behave exactly like primitive tags (\<a-box\>, \<a-sphere\> etc. ). A completed scene that uses a loaded asset would look as follows:

```
<a-scene>
    <a-assets>
        <a-asset-item id="barrel" src="export/barrel.gltf"></a-asset-item>
    </a-assets>

    <a-entity gltf-model="#barrel" position="0 2 -5"></a-entity>
    <a-sky color="#ECECEC"></a-sky>
</a-scene>
```
