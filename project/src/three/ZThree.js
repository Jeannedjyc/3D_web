import * as THREE from "three";
import { GUI } from "three/examples/jsm/libs/lil-gui.module.min.js";
import { OrbitControls } from "three/examples/jsm/controls/OrbitControls.js";
import { GLTFLoader } from "three/examples/jsm/loaders/GLTFLoader";
import { DRACOLoader } from "three/examples/jsm/loaders/DRACOLoader";
// import { FBXLoader } from 'three/examples/jsm/loaders/FBXLoader';
import TWEEN from "three/examples/jsm/libs/tween.module.js";
// import CryptoJS from "crypto-js";

export default class ZThree {
  constructor(id) {
    this.id = id;
    this.el = document.getElementById(id);
  }

  // 初始化场景
  initThree() {
    let width = this.el.offsetWidth;
    let height = this.el.offsetHeight;
    this.scene = new THREE.Scene(); // 场景
    this.textureLoader = new THREE.TextureLoader(); // 纹理加载器
    this.camera = new THREE.PerspectiveCamera(45, width / height, 1, 20000); // 透视相机
    this.camera.position.set(60, 130, 240); // 设置相机位置
    this.camera.lookAt(0, 0, 0); // 设置相机方向(指向的场景对象)
    this.renderer = new THREE.WebGLRenderer({
      antialias: true, // 抗锯齿
      alpha: true,
      logarithmicDepthBuffer: true,
    });
    this.renderer.setPixelRatio(window.devicePixelRatio); // 设置像素比
    this.renderer.setSize(width, height); // 设置渲染器大小
    this.el.append(this.renderer.domElement);

    // this.gui = new GUI();

    window.addEventListener("resize", () => {
      this.camera.aspect = this.el.offsetWidth / this.el.offsetHeight;
      this.camera.updateProjectionMatrix();
      this.renderer.setSize(this.el.offsetWidth, this.el.offsetHeight);
      if (this.cssRenderer) {
        this.cssRenderer.setSize(this.el.offsetWidth, this.el.offsetHeight);
      }
    });
  } // 初始化场景

  changeCamera(app){
     // 计算正交相机参数
    const aspectRatio = this.el.offsetWidth / this.el.offsetHeight;
    const frustumSize = 600; // 这个值可以根据你的场景大小进行调整
    const halfFrustumSize = frustumSize / 2;
    const left = -halfFrustumSize * aspectRatio;
    const right = halfFrustumSize * aspectRatio;
    const top = halfFrustumSize;
    const bottom = -halfFrustumSize;

    // 创建正交相机实例
    app.camera = new THREE.OrthographicCamera(left, right, top, bottom, 1, 20000);

    // 更新相机位置和朝向，保持与原透视相机一致
    app.camera.position.set(0, 0, 1200);
    app.camera.lookAt(0, 0, 0);

    // 更新相机的投影矩阵
    app.camera.updateProjectionMatrix();

    // 如果有必要，也更新窗口大小变化时的事件处理器
    window.addEventListener("resize", () => {
      app.camera.left = -this.el.offsetWidth / this.el.offsetHeight * halfFrustumSize;
      app.camera.right = this.el.offsetWidth / this.el.offsetHeight * halfFrustumSize;
      app.camera.top = halfFrustumSize;
      app.camera.bottom = -halfFrustumSize;
      app.camera.updateProjectionMatrix();
      app.renderer.setSize(this.el.offsetWidth, this.el.offsetHeight);
      if (app.cssRenderer) {
        app.cssRenderer.setSize(this.el.offsetWidth, this.el.offsetHeight);
      }
    });
  }

  initRaycaster(callback, models = this.scene.children, eventName = "click") {
    this.raycaster = new THREE.Raycaster();
    this.rayFn = this.rayEventFn.bind(this, models, callback);

    this.el.addEventListener(eventName, this.rayFn);
  }

  destroyRaycaster(eventName = "click") {
    this.raycaster = null;
    this.el.removeEventListener(eventName, this.rayFn);
  }

  rayEventFn(models, callback, app) {
    let evt = window.event;
    let rect = app.renderer.domElement.getBoundingClientRect();
    let mouse = {
      x: ((evt.clientX - rect.left) / rect.width) * 2 - 1,
      y: -((evt.offsetY - rect.top) / rect.height) * 2 + 1,
    };

    let activeObj = this.fireRaycaster(mouse, models);

    if (callback) {
      callback(activeObj, this, evt, mouse);
    }

    document.body.style.cursor = "pointer";
  }

  fireRaycaster(pointer, models) {
    this.raycaster.setFromCamera(pointer, this.camera);

    let intersects = this.raycaster.intersectObjects(models, true);
    if (intersects.length > 0 && intersects[0].object.name.length > 9) {
      let selectedObject = intersects[0];
      console.log(selectedObject);

      return selectedObject;
    } else {
      return false;
    }
  }

  initLight() {
    const ambientLight = new THREE.AmbientLight(0x404040, 0.3); // soft white light
    this.scene.add(ambientLight);

    const directionalLight = new THREE.DirectionalLight(0xffffff, 0.4);
    const directionalLight2 = new THREE.DirectionalLight(0xffffff, 0.4);
    directionalLight.position.set(-2000, 1000, 100);
    directionalLight2.position.set(2000, 1000, 100);
    directionalLight.castShadow = true;
    this.scene.add(directionalLight);
    this.scene.add(directionalLight2);

    directionalLight.shadow.mapSize.width = 1024;
    directionalLight.shadow.mapSize.height = 1024;
    directionalLight.shadow.camera.near = 10;
    directionalLight.shadow.camera.far = 600;
    directionalLight.shadow.camera.left = -100;
    directionalLight.shadow.camera.right = 100;
    directionalLight.shadow.camera.top = 100;
    directionalLight.shadow.camera.bottom = -100;
    directionalLight.shadow.bias = 0.05;
    directionalLight.shadow.normalBias = 0.05;

    // const helper = new THREE.CameraHelper(directionalLight.shadow.camera);
    // this.scene.add(helper);
  }

  // initLight2() {
  //   const ambientLight = new THREE.AmbientLight(0x404040, 2); // soft white light
  //   this.scene.add(ambientLight);

  //   const directionalLight = new THREE.DirectionalLight(0xffffff, 2.5);
  //   this.scene.add(directionalLight);
  // }

  initHelper() {
    this.scene.add(new THREE.AxesHelper(100)); // 坐标轴辅助线
  }

  initHelper2() {
    this.scene.add(new THREE.GridHelper(1000, 50));
  } // 网格辅助线

  initOrbitControls() {
    let controls = new OrbitControls(this.camera, this.renderer.domElement);
    controls.enableDamping = true; // 开启阻尼效果
    controls.enableZoom = true; // 开启缩放
    controls.autoRotate = false; // 关闭自动旋转
    controls.autoRotateSpeed = 0.5; // 自动旋转速度
    controls.enablePan = true; // 开启平移
    // controls.enableRotate = false; // 禁止绕 x 和 y 轴旋转
    controls.maxPolarAngle = Math.PI / 2; // 限制相机的最大仰角
    controls.minDistance = 50; // 设置相机的最小距离为 100
    controls.maxDistance = 5000; // 设置相机的最大距离为 1000

    this.controls = controls;

    // this.renderer.domElement.addEventListener('mousemove', (event) => {
    //     if (event.buttons === 1) { // 如果鼠标左键被按下
    //       const deltaX = event.movementX; // 获取鼠标在 x 轴上的移动距离
    //       const deltaY = event.movementY; // 获取鼠标在 y 轴上的移动距离
    //       const angle = Math.atan2(deltaY, deltaX); // 计算旋转角度
    //       const rotateAngle = angle * controls.rotateSpeed; // 乘以旋转速度
    //       this.controls.rotate = (0, 0, rotateAngle); // 绕 z 轴旋转
    //     }
    //   });
  }

  loaderModel(option) {
    switch (option.type) {
      case "gltf":
      case "glb":
        if (!this.gltfLoader) {
          this.gltfLoader = new GLTFLoader();
          let dracoLoader = new DRACOLoader();
          dracoLoader.setDecoderPath("draco/");
          this.gltfLoader.setDRACOLoader(dracoLoader);
        }
        this.gltfLoader.load(
          option.url,
          option.onload,
          option.onProgress,
          option.onError
        );
        break;

      default:
        break;

      // case 'fbx':
      //     if (!this.fbxLoader) {
      //         this.fbxLoader = new FBXLoader();
      //     }
      //     this.fbxLoader.load(option.url, option.onLoad, option.onProgress, option.onError);
      //     break;
    }
  }

  iterateLoad(objFileList, onProgress, onAllLoad) {
    let fileIndex = 0;
    let that = this;

    function iterateLoadForIt() {
      that.loaderModel({
        type: objFileList[fileIndex].type,
        url: objFileList[fileIndex].url,
        onload: function (object) {
          if (objFileList[fileIndex].onLoad) {
            objFileList[fileIndex].onLoad(object);
          }
          fileIndex++;
          if (fileIndex < objFileList.length) {
            iterateLoadForIt();
          } else {
            if (onAllLoad) {
              onAllLoad();
            }
          }
        },
        onProgress: function (xhr) {
          if (objFileList[fileIndex].onProgress) {
            objFileList[fileIndex].onProgress(xhr, fileIndex);
          }
          if (onProgress) {
            onProgress(xhr, fileIndex);
          }
        },
      });
    }

    iterateLoadForIt();
  }

  getModelWorldPosition(model) {
    this.scene.updateMatrixWorld(true);
    const worldPosition = new THREE.Vector3();
    model.getWorldPosition(worldPosition);
    return worldPosition;
  }

  // encrypted(s) {
  //   const key = CryptoJS.enc.Utf8.parse("3ucrdlc6twh84o7h");
  //   const aes = CryptoJS.AES.encrypt(s, key, {
  //     mode: CryptoJS.mode.CBC,
  //     padding: CryptoJS.pad.ZeroPadding,
  //     iv: key
  //   });
  //   const ct = aes.ciphertext;
  //   return ct.toString(CryptoJS.enc.Base64);
  // }

  encrypted(s) {
    return new Promise((resolve, reject) => {
      import("crypto-js")
        .then((CryptoJS) => {
          try {
            const key = CryptoJS.enc.Utf8.parse("3ucrdlc6twh84o7h");
            const aes = CryptoJS.AES.encrypt(s, key, {
              mode: CryptoJS.mode.CBC,
              padding: CryptoJS.pad.ZeroPadding,
              iv: key,
            });
            const ct = aes.ciphertext;
            resolve(ct.toString(CryptoJS.enc.Base64));
          } catch (e) {
            console.error("error", e);
            reject(e);
          }
        })
        .catch((e) => {
          reject(e);
        });
    });
  }

  flyTo(option) {
    option.position = option.position || []; // 相机新的位置
    option.controls = option.controls || []; // 控制器新的中心点位置(围绕此点旋转等)
    option.duration = option.duration || 1000; // 飞行时间
    option.easing = option.easing || TWEEN.Easing.Linear.None;

    const curPosition = this.camera.position;
    const curControls = this.controls.target; // 控制器的中心点

    const tween = new TWEEN.Tween({
      x1: curPosition.x, // 相机当前位置x
      y1: curPosition.y, // 相机当前位置y
      z1: curPosition.z, // 相机当前位置z
      x2: curControls.x, // 控制当前的中心点x
      y2: curControls.y, // 控制当前的中心点y
      z2: curControls.z, // 控制当前的中心点z
    })
      .to(
        {
          x1: option.position[0],
          y1: option.position[1],
          z1: option.position[2],
          x2: option.controls[0],
          y2: option.controls[1],
          z2: option.controls[2],
        },
        option.duration
      )
      .easing(TWEEN.Easing.Linear.None);

    tween.onStart(() => {
      this.controls.enabled = false;
      if (option.start instanceof Function) {
        option.start();
      }
    });

    tween.onUpdate(() => {
      this.controls.enabled = false;
      this.camera.position.set(
        tween._object.x1,
        tween._object.y1,
        tween._object.z1
      );
      this.controls.target.set(
        tween._object.x2,
        tween._object.y2,
        tween._object.z2
      );
      this.controls.update();
      if (option.update instanceof Function) {
        option.update(tween);
      }
    });

    tween.onComplete(() => {
      this.controls.enabled = true;
      if (option.done instanceof Function) {
        option.done();
      }
    });

    tween.onStop(() => {
      this.controls.enabled = true;
      if (option.stop instanceof Function) {
        option.stop();
      }
    });
    tween.onStop(() => (option.stop instanceof Function ? option.stop() : ""));
    tween.start();
    TWEEN.add(tween);
    return tween;
  }

  // getData(){
  //     axios.get('http://192.168.3.39:3000/uwb/').then((response) => {
  //         let list = response.data
  //         console.log(list)
  //         //返回userlist

  //         return list
  //             // label_userlist[i].id = [userlist[i].MAC, userlist[i].X, userlist[i].Y, userlist[i].Z]
  //         })

  // }

  //渲染
  render(callback) {
    callback();
    this.framedId = requestAnimationFrame(() => this.render(callback));
  }
}
