// 文本渲染
export function cssRender(cssRender, app) {
    const T = this; // 非app
    T.config = {};
    T.init = function() {
        const cssRenderer = new cssRender();
        cssRenderer.setSize(app.el.offsetWidth, app.el.offsetHeight);
        cssRenderer.domElement.style.position = 'absolute';
        cssRenderer.domElement.style.top = 0;
        cssRenderer.domElement.style.pointerEvents = 'none';
        cssRenderer.domElement._class = '_cssRender';
        app.el.appendChild(cssRenderer.domElement);
        T.cssRenderer = cssRenderer;
        T.cssRendererDomElement = cssRenderer.domElement;
    };
    T.add = function(option) {
        let list = [];
        if (Array.isArray(option)) list = option;
        else list.push(option);
        
        list.forEach((e) => {
            document.body.insertAdjacentHTML('beforeend', e.element);
            const label = new e.cssObject(document.body.lastChild);
            label.userData.isCss23D = true;
            label.position.set(...e.position);
            label.name = e.name;
            if (e.scale) label.scale.set(...e.scale);
            e.parent ? e.parent.add(label) : app.scene.add(label);
            T.config[e.name] = label;
        });
    };
    // T.update = function(name, innerHtml) {
    //     T.config[name].element.innerHTML = innerHtml;
    // };
    // T.remove = function(name, parent) {
    //     parent = parent || app.scene;
    //     parent.remove(parent.getObjectByName(name));
    //     if (T.config[name]) delete T.config[name];
    // };
    // T.search = function(name) {
    //     return T.config[name];
    // };
    // T.removeAll = function(parent) {
    //     //需要倒序遍历
    //     for (let i = parent.children.length - 1; i >= 0; i--) {
    //         const e = parent.children[i];
    //         if (e.userData.isCss23D) {
    //         const name = e.name;
    //         parent.remove(e);
    //         if (T.config[name]) delete T.config[name];
    //         }
    //     }
    // };
    T.init();
  }
  