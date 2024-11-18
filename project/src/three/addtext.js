import * as THREE from 'three';
import { CSS3DSprite } from 'three/examples/jsm/renderers/CSS3DRenderer';



export function add1(app, position, name) {
    const html = `<div class="floorText-3d animated fadeIn"><p class="text">${name}</p></div>`;
    const element = document.createElement('div');
    element.innerHTML = html;    
    app.instance.add({
      element: html,
      position: position,
      cssObject: CSS3DSprite,
      name: name,
      scale: [0.005, 0.005, 0.005],
      parent: app.controlGroup,
    });
}