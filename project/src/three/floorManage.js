// import * as THREE from 'three';
import { CSS3DSprite } from "three/examples/jsm/renderers/CSS3DRenderer";
// import { BaseMaterial1 } from "./material";
import { BaseMaterial2 } from "./material";
// import { BaseMaterial3 } from "./material";
import { BaseMaterial4 } from "./material";
import { BaseMaterial5 } from "./material";
// import EventBus from '../bus';
// import axios from "@/utils/request.js";
import axios from "axios";
// import { get } from "core-js/core/dict";
// import store from "@/store";
// import { get } from 'core-js/core/dict';

// import AMap from "@amap/amap-jsapi-loader";
// import { ThreeLayer, ThreeGltf } from "@amap/three-layer";
// const map = new AMap.Map("container", {
//   center: [114.029, 22.543],
//   zoom: 14,
//   viewMode: "3D",
//   pitch: 35,
// });
// const layer = new ThreeLayer(map); // 创建ThreeLayer实例
// layer.on('complete', () => {
//   const gltf = new ThreeGltf(layer, {
//     url: 'https://a.amap.com/jsapi_demos/static/gltf/Duck.gltf',
//     position: [120, 31],
//     scale: 800,
//     rotation: {
//       x:90,
//       y:0,
//       z:0
//     }
//   })
//   console.log('layer: ', layer)
//   console.log('gltf: ', gltf)
// })

// -20.37281006650176, y: 27.363518066212418, z: 39.19421499449008}
export function loaderFloorManage(app) {
  app.rayModel = []; // 用于存储模型的射线
  // resetSky(4000);
  app.flyTo({
    position: [-60, 130, 240],
    controls: [0, 0, 0],
    done: () => {
      console.log();
      // axios.interceptors.request.use((config) => {
      //   config.headers.Authorization = `Bearer ${store.state.token}`;
      // });
      addText(app, [-60, 5, 60], "PolyU");
      addText(app, [120, 5, 25], "Yard");
      addText(app, [150, 5, -180], "Customs");
      addText(app, [380, 5, -600], "MiC_Manufacturer");

      hideModle(app);
      findModle(app);
      changeMaterial(app);
      app.model.traverse((obj) => {
        app.rayModel.push(obj);
        // console.log(obj.name);
        location(app);
        // setInterval(function () {
        //   getData3(app);
        // }, 10000); // 每隔一秒钟执行一次
      });

      //   app.initRaycaster((activeObj, app, event) => {
      //     if (activeObj.object){
      //         //弹窗

      //         const obj = activeObj.object;
      //         const MIC = obj.name;
      //         const Floor = obj.name.substring(0, obj.name.length - 2);
      //         const Tag = obj.name

      //         EventBus.$emit('showInfo',{
      //             MIC: MIC,
      //             Floor: Floor,
      //             Tag: Tag,
      //             x: event.x,
      //             y: event.y,
      //             show: true
      //         });

      //         // alert(MIC);
      //     }
      //     else{
      //         EventBus.$emit('showInfo',{
      //           show: false
      //         });
      //     // alert('You not clicked on the model!');
      //     }
      // },app.rayModel,
      //  'click');
      // choose_MIC();
      // ex_move(app);

      // move(app);
    },
  });
}

export function addText(app, position, name) {
  const html = `<div class="floorText-3d animated fadeIn"><p class="text">${name}</p></div>`;
  const element = document.createElement("div");
  element.innerHTML = html;

  app.instance.add({
    element: html,
    position: position,
    cssObject: CSS3DSprite,
    name: name,
    scale: [0.1, 0.1, 0.1],
    parent: app.controlGroup,
  });

  // const textDoms = document.getElementsByClassName('floorText-3d');
  //   textDoms.onclick = () => {
  //     if (name === 'PloyU') {
  //       app.flyTo({
  //         position: [-60, 130, 240],
  //         controls: [0, 0, 0],
  //         done: () => {

  //         }
  //       })
  //     }
  //     else if (name === 'Yard') {
  //       app.flyTo({
  //         position: [120, 130, 25],
  //         controls: [0, 0, 0],
  //         done: () => {
  //           hideModle(app);
  //           findModle(app);
  //           changeMaterial(app);
  //         }
  //       })
  //     }
  //     else if (name === 'Customs') {
  //       app.flyTo({
  //         position: [120, 130, 25],
  //         controls: [0, 0, 0],
  //         done: () => {
  //           hideModle(app);
  //           findModle(app);
  //           changeMaterial(app);
  //         }
  //       })
  //     }
  //     else {
  //       app.flyTo({
  //         position: [120, 130, 25],
  //         controls: [0, 0, 0],
  //         done: () => {
  //           hideModle(app);
  //           findModle(app);
  //           changeMaterial(app);
  //         }
  //       })
  //   }
  // }
}

export function ex_move(app) {
  const micTypeMap = {
    1: "LL1_HK",
    2: "LL2_HK",
    3: "RR1_HK",
    4: "RR2_HK",
    5: "ML_HK",
    6: "MM_HK",
    7: "MR_HK",
    8: "Center_HK",
  };
  setInterval(() => {
    const list = choose_MIC();
    for (let i = 0; i < list.length; i++) {
      const micid = list[i].micid;
      const objname = micTypeMap[micid % 10];
      is_assembled(micid).then((status) => {
        if (status === 7) {
          //更改模型渲染;
          backMaterial(app, objname);
        } else {
          //移动模型
          const tagid = list[i].tagid;
          Material(app, objname);
          getData(app, tagid, objname);
        }
      });
    }
  }, 1000);
}

export function choose_MIC() {
  // axios.interceptors.request.use((config) => {
  //   config.headers.Authorization = `Bearer ${store.state.token}`;
  // });
  axios.get("	/api/hub/micList/search_bind").then((response) => {
    const mic_list = response.data.data;
    return mic_list;
  });
}
export function is_assembled(micid) {
  axios({
    method: "post",
    url: "/api/hub/micList/searchmics",
    data: {
      field: "id",
      userinput: micid,
    },
  }).then((res) => {
    const status = res.data.data[0].micStatus;
    console.log(status);
  });
}

export function getData(app, tag_id, objname) {
  axios.get(`http://192.168.3.61:3000/uwb/${tag_id}`).then((response) => {
    if (response.data.code === 200) {
      alert(`未找到${tag_id}的位置信息`);
    } else {
      const Location = response.data;
      //返回userlist
      const x = Location["4890"][0].x * 10;
      const y = Location["4890"][0].y * 10;
      const z = Location["4890"][0].z * 10;
      console.log(x, y, z);
      app.model.traverse((obj) => {
        // if (obj.name === 'objname') {
        if (obj.name === objname) {
          obj.position.set(x, y, z);
        }
      });
    }
  });
}

export function getData2(app) {
  // setTimeout(() => {
  // try {
  axios.get("/api/onsite/").then((response) => {
    // if (response.data.code === 200) {
    //   alert(`未找到${tag_id}的位置信息`);
    // }else{
    const Location = response.data;
    //返回userlist
    const x = Location["GT4B22"][0].x * 10;
    const y = Location["GT4B22"][0].y * 10;
    const z = Location["GT4B22"][0].z * 10;
    console.log(x, y, z);
    app.model.traverse((obj) => {
      // if (obj.name === 'objname') {
      if (obj.name.match(/Center_HK/)) {
        obj.position.set(x, z, y);
      }
    });
    // }
  });
  // } catch (error) {
  //   console.log(error);
  // }
  // }, 500);
}


export function getData3(app) {
  // setTimeout(() => {
  // try {
  axios.get("/api/onsite/").then((response) => {
    // if (response.data.code === 200) {
    //   alert(`未找到${tag_id}的位置信息`);
    // }else{
    const Location = response.data;
    //返回userlist
    const x = Location["GT1807"][0].x * 10;
    const y = Location["GT1807"][0].y * 10;
    const z = Location["GT1807"][0].z * 10;
    const angle_x = Location["GT1807"][0].angle_x* Math.PI / 180;
    const angle_y = Location["GT1807"][0].angle_y* Math.PI / 180;
    const angle_z = Location["GT1807"][0].heading* Math.PI / 180;

    console.log(x, y, z, angle_x, angle_y, angle_z);
    app.model.traverse((obj) => {
      // if (obj.name === 'objname') {
      if (obj.name.match(/Center_HK/)) {
        obj.position.set(x, z, y);
        obj.rotation.set(angle_x, angle_y, angle_z);
      }
    });
    // }
  });
  // } catch (error) {
  //   console.log(error);
  // }
  // }, 500);
}

export function location(app) {
  const angle_x = 40* Math.PI / 180;
  const angle_y = 30* Math.PI / 180;
  const angle_z = 20* Math.PI / 180;
  app.model.traverse((obj) => {
    // if (obj.name === 'objname') {
    if (obj.name.match(/Center_HK/)) {
      // obj.position.set(x, z, y);
      obj.rotation.set(angle_x, angle_y, angle_z);
    }
  });
}




export function backMaterial(app, objname) {
  app.model.traverse((obj) => {
    if (obj.name === objname) {
      obj.material = app.modelMaterials[obj.name]?.material;
    }
  });
}

export function Material(app, objname) {
  app.model.traverse((obj) => {
    console.log(obj.name);
    if (obj.name === objname) {
      obj.material = BaseMaterial2;
    }
  });
}

export function changeMaterial(app) {
  app.model.traverse((obj) => {
    console.log(obj.name);
    if (
      obj.name.match(/1[3-9]F/) ||
      obj.name.match(/2[0-6]F/) ||
      obj.name.match(/Rooftop/)
    ) {
      obj.material = BaseMaterial5;
    }
    if (obj.name.match(/1[1-2]F/)) {
      obj.material = BaseMaterial5;
    }
    if (obj.name.match(/0[7-9]F/) || obj.name.match(/10F/)) {
      obj.material = BaseMaterial5;
    }
    if (obj.name.match(/06F/)) {
      obj.material = BaseMaterial5;
    }
  });
}

export function resetSky(num, app) {
  const sky = app.SkyUtils.createSky(num);
  app.remove(app.scene.getObjectByName("sky"));
  app.add(sky);
}

export function hideModle(app) {
  app.model.traverse((obj) => {
    if (
      obj.name === "路面" ||
      obj.name === "B栋" ||
      obj.name === "C栋" ||
      obj.name === "左下物体" ||
      obj.name.match(/其余建筑[1-4]/)
    ) {
      obj.visible = false;
    }
  });
}

export function findModle(app) {
  app.model.traverse((obj) => {
    if (
      obj.name === "HK地面" ||
      obj.name === "海关地面" ||
      obj.name === "仓库地面" ||
      obj.name === "塔吊" ||
      obj.name === "托盘" ||
      obj.name.match(/Floor_安装[1-5]/) ||
      obj.name.match(/Floor海关[1-2]/) ||
      obj.name.match(/集装箱[1-4]/) ||
      obj.name === "起重机" ||
      obj.name.match(/Floor_4F6.仓库[1-13]/) ||
      obj.name === "Rooftop.001" ||
      obj.name === "Floor_26F.001" ||
      obj.name === "路面3" ||
      obj.name === "路面2" ||
      obj.name.match(/隔断[1-3]/) ||
      obj.name === "集装箱" ||
      obj.name === "MiC地面" ||
      obj.name === "仓库" ||
      obj.name === "木板" ||
      obj.name === "水泥" ||
      obj.name === "线缆" ||
      obj.name === "钢管" ||
      obj.name.match(/仓库[0-1][0-9]/) ||
      obj.name.match(/LL1_HK/) ||
      obj.name.match(/LL2_HK/) ||
      obj.name.match(/RR1_HK/) ||
      obj.name.match(/RR2_HK/) ||
      obj.name.match(/ML_HK/) ||
      obj.name.match(/MM_HK/) ||
      obj.name.match(/MR_HK/) ||
      obj.name.match(/Center_HK/) ||
      obj.name.match(/RR1_custom/) ||
      obj.name.match(/RR2_custom/) ||
      obj.name.match(/ML_custom/) ||
      obj.name.match(/MM_custom/) ||
      obj.name.match(/MR_custom/) ||
      obj.name.match(/Center_custom/) ||
      obj.name.match(/LL1_custom/) ||
      obj.name.match(/LL2_custom/) ||
      obj.name.match(/RR1_yard/) ||
      obj.name.match(/LL1_yard/) ||
      obj.name.match(/LL2_yard/) ||
      obj.name.match(/RR2_yard/) ||
      obj.name.match(/ML_yard/) ||
      obj.name.match(/MM_yard/) ||
      obj.name.match(/MR_yard/) ||
      obj.name.match(/Center_yard/)
    ) {
      obj.visible = true;
      if (obj.name === "路面2") {
        obj.material = BaseMaterial5;
      }
    }
  });
}

export function change_state(app) {
  axios({
    method: "",
  })
    .get("	")
    .then((response) => {
      let mic_list = response.data;
      //遍历mic_list
      let mic_name;
      for (let i = 0; i < mic_list.length; i++) {
        if (mic_list[i].Assembled === "0") {
          mic_name = mic_list[i].MIC;
        }
      }
      app.model.traverse((obj) => {
        if (obj.name === mic_name) {
          obj.material = app.modelMaterials[obj.name]?.material;
        }
      });
    });
}

export function getState(app) {
  axios.get("http://localhost:3000/state/").then((response) => {
    let objname = response.data;
    getData(app, objname);
    app.model.traverse((obj) => {
      if (obj.name === objname) {
        obj.material = BaseMaterial4;
      }
    });
  });
}
