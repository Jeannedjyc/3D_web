<!-- <template>
  <div class="home">
    <img alt="Vue logo" src="../assets/logo.png">
    <HelloWorld msg="Welcome to Your Vue.js App"/>
  </div>
</template>

<script>
// @ is an alias to /src
import HelloWorld from '@/components/HelloWorld.vue'

export default {
  name: 'HomeView',
  components: {
    HelloWorld
  }
}
</script> -->
<template>
  <div class="main">
    <big-control class="control"> </big-control>
    <!-- <button @click="buttonClicked" class="my-button">2D</button> -->
    <div id="screen" class="screen"></div>
  </div>
</template>

<script>
import ZThree from "@/three/ZThree";
import * as THREE from "three";
import { loaderModel } from "@/three/loaderModel";
// import bigControl from "@/components/bigControl";
import TWEEN from "three/examples/jsm/libs/tween.module.js";
import { CSS3DRenderer } from "three/examples/jsm/renderers/CSS3DRenderer";
import { cssRender } from "@/three/cssRender";
import router from "@/router";
import SkyUtils from "@/utils/SkyUtils";
import { EffectComposer } from 'three/addons/postprocessing/EffectComposer.js';
import { RenderPass } from 'three/addons/postprocessing/RenderPass.js';
// 引入OutlinePass通道
import { OutlinePass } from 'three/addons/postprocessing/OutlinePass.js';
import { ShaderPass } from "three/examples/jsm/postprocessing/ShaderPass.js"
import { FXAAShader } from "three/examples/jsm/shaders/FXAAShader.js"

let app, camera, scene, renderer, controls, clock;

export default {
  name: "HomeView",
  router,
  components: {
    // bigControl,
  },
  methods: {
    async initZThree() {
      app = new ZThree("screen");
      app.encrypted("@CommaTech1798").then((res) => {
        console.log(res);
      });
      app.initThree();
      // app.initHelper2();
      app.initOrbitControls();
      app.initLight();
      window.app = app;

      controls = app.controls;

      clock = new THREE.Clock();

      camera = app.camera;
      scene = app.scene;
      renderer = app.renderer;
      renderer.shadowMap.enabled = true;
      renderer.shadowMap.type = THREE.PCFSoftShadowMap;

      let instance = new cssRender(CSS3DRenderer, app);
      app.renderer = instance.cssRenderer;
      app.instance = instance;
      // let activeObj
      await loaderModel(app);
      // app.model.traverse((obj) => {
      //       if (obj.name === "Center_Hk") {
      //         activeObj = obj;
      //       }      
      //     });
      // print(activeObj);
      // this.composer = new EffectComposer(renderer)
      //   // 新建一个场景通道  为了覆盖到原理来的场景上
      // this.renderPass = new RenderPass(scene, camera)
      // this.composer.addPass(this.renderPass);


      // const gammaCorrectionShader = new ShaderPass(gammaCorrectionShader);
      // this.composer.addPass(gammaCorrectionShader);
      //   // 物体边缘发光通道
      // this.outlinePass = new OutlinePass(new THREE.Vector2(window.innerWidth, window.innerHeight), scene, camera, activeObj)
      // this.outline(activeObj)
      const sky = SkyUtils.createSky(5000);

      scene.add(sky);

      app.render(() => {
        const delta = clock.getDelta();

        controls.update(delta);

        renderer.render(scene, camera);

        // app.cssRenderer.render(scene, camera);

        TWEEN.update(); //更新动画
        // if (this.composer) {
        //   this.composer.render()
        // }
      });
    },
    buttonClicked() {
      app.changeCamera();
      // 在这里添加你想要执行的代码
      },
    closeGlow() {
      this.outlinePass.selectedObjects = [];
      // this.showTimeline = true;
    },
    outline(activeObj) {

      if (activeObj.object) {
        this.outlinePass.selectedObjects = [activeObj.object]
        this.outlinePass.edgeStrength = 10.0 // 边框的亮度
        this.outlinePass.edgeGlow = 1// 光晕[0,1]
        this.outlinePass.usePatternTexture = false // 是否使用父级的材质
        this.outlinePass.edgeThickness = 1.0 // 边框宽度
        this.outlinePass.downSampleRatio = 1 // 边框弯曲度
        this.outlinePass.pulsePeriod = 5 // 呼吸闪烁的速度
        this.outlinePass.visibleEdgeColor.set(parseInt(0xffffff)) // 呼吸显示的颜色
        this.outlinePass.hiddenEdgeColor = new THREE.Color(1, 1, 1) // 呼吸消失的颜色
        this.outlinePass.clear = true
        this.composer.addPass(this.outlinePass)
        // 自定义的着色器通道 作为参数
        var effectFXAA = new ShaderPass(FXAAShader)
        effectFXAA.uniforms.resolution.value.set(1 / window.innerWidth, 1 / window.innerHeight)
        effectFXAA.renderToScreen = true
        this.composer.addPass(effectFXAA)}}
  },
  mounted() {
    this.initZThree();
    
  },
};
</script>

<style lang="less">
.main {
  width: 100%;
  height: 100%;
  background: #ffffff;
  overflow: hidden;
}

.screen {
  position: fixed;
  width: 100%;
  height: 100%;
  bottom: 0;
  right: 0;
}

.control {
  height: 5%;
  position: fixed;
  bottom: 3%;
  left: 36%;
  z-index: 3;
  float: left;
  font-size: 30px;
}

.my-button {
  position: fixed;
  top: 20px; /* 调整为需要的位置 */
  left: 20px; /* 调整为需要的位置 */
  z-index: 10; /* 确保按钮在最上层 */
  // 可以添加更多样式来美化按钮
}
</style>
