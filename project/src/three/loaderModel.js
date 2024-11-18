import * as THREE from "three";

// import * as THREE from 'three';
// import { CSS3DSprite } from "three/examples/jsm/renderers/CSS3DRenderer";
// import { BaseMaterial8 } from "./material";
// import { BaseMaterial7} from "./material";
import { BaseMaterial2 } from "./material";
import { BaseMaterial4 } from "./material";
import { BaseMaterial5 } from "./material";
// import EventBus from '../bus';
// import axios from "@/utils/request.js";
import axios from "axios";

export async function loaderModel(app) {
  await new Promise((resolve) => {
    app.controlGroup = new THREE.Group();
    app.scene.add(app.controlGroup);
    app.modelMaterials = []; // 用于存储模型的材质
    let urls = [
      {
        type: "glb",
        url: "model/location2.glb",
        onLoad: (object_1) => {
          console.log(object_1);
          app.scene.add(object_1.scene);
          app.model = object_1.scene;

          const receiveShadow = ['地面']
          app.model.traverse((obj) => {
            console.log(obj.name);
            if (receiveShadow.includes(obj.name)) {
                obj.receiveShadow = true;
            } else {
                obj.castShadow = true;
                obj.receiveShadow = false;
            if (obj.material && obj.name === 'a') {
                obj.castShadow = true;
                obj.material.emissive = obj.material.color
                obj.material.emissiveMap = obj.material.map
                obj.material.emissiveIntensity = 0.4; // 调整自发光强度
              }
            // if (obj.name === "塔吊"||obj.name === "托盘") {
            //     obj.material = BaseMaterial7
            // }
            // if (obj.name.match(/地面/)) {
            //     obj.material = BaseMaterial8;
            // }
          }});
          resolve();
        },
      },
    ];
    // console.log(app.modelMaterials);
    app.iterateLoad(urls, null, () => {});
  });
  // ChangeMaterialEmissive(app);
  app.rayModel = []; // 用于存储模型的射线
  app.flyTo({
    position: [3000, 1600, 440],
    controls: [0, 0, 0],
    done: () => {
      changeMaterial2(app);
    
      app.model.traverse((obj) => {
        app.rayModel.push(obj);
        
        // console.log(obj.name);
        // location2(app);
        setInterval(function () {
          getData3(app);
          getData4(app);
          getData5(app);
        }, 1000); // 每隔一秒钟执行一次
      });
    },
  });
}




// export function addText(app, position, name) {
//   const html = `<div class="floorText-3d animated fadeIn"><p class="text">${name}</p></div>`;
//   const element = document.createElement("div");
//   element.innerHTML = html;

//   app.instance.add({
//     element: html,
//     position: position,
//     cssObject: CSS3DSprite,
//     name: name,
//     scale: [0.1, 0.1, 0.1],
//     parent: app.controlGroup,
//   });
// }

export function location(app) {
  // const x = 0;
  // const y = 0;
  // const z = 0;
  const angle_x = 40* Math.PI / 180;
  const angle_y = 30* Math.PI / 180;
  const angle_z = 20* Math.PI / 180;
  app.model.traverse((obj) => {
    // if (obj.name === 'objname') {
      if (obj.name.match(/MM_HK/)) {
      // obj.position.set(x, z, y);
      // console.log(obj.position);
      obj.position.y += 0.015;
      obj.position.z -= 0.015;
      obj.position.x -= 0.015;
      obj.rotation.set(angle_x, angle_y, angle_z);
    }
  });
}

export function location2(app) {
  app.model.traverse((obj) => {
    // if (obj.name === 'objname') {
      if (obj.name.match(/塔吊/)||obj.name === "托盘") {
      // obj.position.set(x, z, y);
      // console.log(obj.position);
      // obj.position.y += 0.015;
      obj.position.z += 0.035;
      // console.log(obj.position);
      // obj.position.x -= 0.015;
      // obj.rotation.set(angle_x, angle_y, angle_z);
    }
    // let x, y, z;
    // if (obj.name === "托盘") {
    //   x = obj.position.x;
    //   y = obj.position.y;
    //   z = obj.position.z;
    //   console.log(obj.position.x);
    //   console.log(x,y,z);
    // }  
    if (obj.name.match(/MM_HK/)) {
      // obj.position.x = x;
      // obj.position.y = y;
      // obj.position.z = z;
      // console.log(x, y, z);
      // console.log(obj.position);
      
      obj.position.x = 26.28;
      obj.position.y = 46.943;
      obj.position.z = 17.583;
      // console.log(obj.position);
    
    }
  });
}


export function getData2(app) {
  // setTimeout(() => {
  // try {
  axios.get("/api/onsite/").then((response) => {
    const Location = response.data;
    console.log(Location);
    // console.log(Location["GT560A"][0].x);
    //返回userlist
    const x = Location["GT560A"][0].x * 900;
    const y = Location["GT560A"][0].y * 900;
    const z = Location["GT560A"][0].z * 900;


    console.log(x, y, z);
    app.model.traverse((obj) => {
      // if (obj.name === 'objname') {
      if (obj.name.match(/location/)) {
        // obj.position.set(x,y,z);
        obj.position.set(-y,z,-x);

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
  axios.get("/api/onsite/").then((response) => {
    const Location = response.data;
    // console.log(Location["GT5584"][0]);
    //返回userlist
    const stas = Location["GT5584"][0].status;
    const x = Location["GT5584"][0].x*900 ;
    const y = Location["GT5584"][0].y*900 ;
    const z = Location["GT5584"][0].z*900;
    const angle_x = Location["GT5584"][0].roll* Math.PI / 180;
    const angle_y = Location["GT5584"][0].pitch* Math.PI / 180;
    const angle_z = Location["GT5584"][0].yaw* Math.PI / 180;
    if (stas == 1) {
      app.model.traverse((obj) => {
        // if (obj.name === 'objname') {
        if (obj.name.match(/location/)) {
          // console.log(obj.rotation);
          obj.position.set(-y, z+100, -x);
          obj.rotation.set(0,0,0);
          obj.rotateX(angle_y);
          obj.rotateZ(-angle_x);
          obj.rotateY(-angle_z);
        }
      });
    }
  }).catch((error) => {
    console.log(error);
  });
}

export function getData4(app) {
  axios.get("/api/onsite/").then((response) => {
    const Location = response.data;
    // console.log(Location["GT1807"][0]);
    //返回userlist
    const stas = Location["GT1807"][0].status;
    const x = Location["GT1807"][0].x * 1150;
    const y = Location["GT1807"][0].y * 1150;
    const z = Location["GT1807"][0].z * 900;
    const angle_x = Location["GT1807"][0].roll* Math.PI / 180;
    const angle_y = Location["GT1807"][0].pitch* Math.PI / 180;
    const angle_z = Location["GT1807"][0].yaw* Math.PI / 180;
    if (stas == 1) {
      app.model.traverse((obj) => {
        // if (obj.name === 'objname') {
        if (obj.name.match(/Loc6/)) {
          // console.log(obj.rotation);
          obj.position.set(-y, z+100, -x);
          obj.rotation.set(0,0,0);
          obj.rotateX(angle_y);
          obj.rotateZ(-angle_x);
          obj.rotateY(-angle_z);
        }
      });
  }
  }).catch((error) => {
    console.log(error);
  });
}

export function getData5(app) {
  axios.get("/api/onsite/").then((response) => {
    const Location = response.data;
    // console.log(Location["GT4C1E"][0]);
    //返回userlist
    const stas = Location["GT4C1E"][0].status;
    const x = Location["GT4C1E"][0].x * 1150;
    const y = Location["GT4C1E"][0].y * 1150;
    const z = Location["GT4C1E"][0].z * 900;
    const angle_x = Location["GT4C1E"][0].roll* Math.PI / 180;
    const angle_y = Location["GT4C1E"][0].pitch* Math.PI / 180;
    const angle_z = Location["GT4C1E"][0].yaw* Math.PI / 180;
    if (stas == 1) {
      app.model.traverse((obj) => {
        // if (obj.name === 'objname') {
        if (obj.name.match(/Loc7/)) {
          // console.log(obj.rotation);
          obj.position.set(-y, z+100, -x);
          obj.rotation.set(0,0,0);
          obj.rotateX(angle_y);
          obj.rotateZ(-angle_x);
          obj.rotateY(-angle_z);
        }
      });
    }
  }).catch((error) => {
    console.log(error);
  });
}



export function changeMaterial(app) {
  app.model.traverse((obj) => {
    // console.log(obj.name);
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
    if (obj.name.match(/MM_HK/)) {
      obj.material = BaseMaterial4;
    }
    if (obj.name.match(/6F_MM/)) {
      obj.material = BaseMaterial2;
    }
  });
}

export function changeMaterial2(app) {
  app.model.traverse((obj) => {
    // console.log(obj.name);
    if (
      obj.name.match(/b[1-3]/) ||obj.name.match(/f[1-4]/)||obj.name.match(/m/)
    ) {
      obj.material = BaseMaterial5;
    }
    if (
      obj.name === "f3"||obj.name === "f2"||obj.name === "f4"
    ) {
      obj.material = BaseMaterial2;
    }
    if (
      obj.name === "location"||obj.name.match(/Loc6/)||obj.name.match(/Loc7/)
    ) {
      obj.material = BaseMaterial4;
    }


    // if (obj.name.match(/1[1-2]F/)) {
    //   obj.material = BaseMaterial5;
    // }
    // if (obj.name.match(/0[7-9]F/) || obj.name.match(/10F/)) {
    //   obj.material = BaseMaterial5;
    // }
    // if (obj.name.match(/06F/)) {
    //   obj.material = BaseMaterial5;
    // }
    // if (obj.name.match(/MM_HK/)) {
    //   obj.material = BaseMaterial4;
    // }
    // if (obj.name.match(/6F_MM/)) {
    //   obj.material = BaseMaterial2;
    // }
  });
}


export function hideModle(app) {
  app.model.traverse((obj) => {
    if (
      obj.name === "路面" ||
      obj.name === "B栋" ||
      obj.name === "C栋" ||
      obj.name === "左下物体" ||
      obj.name.match(/其余建筑[1-4]/)
      // obj.name.match(/塔吊/) ||
      // obj.name.name ==="托盘" 
    ) {
      obj.visible = false;
    }
    if (obj.name.match(/"地面"/)) {
      obj.material = BaseMaterial5;
    }
  });
}

export function findModle(app) {
  app.model.traverse((obj) => {
    if (
      obj.name === "HK地面" ||
      obj.name === "海关地面" ||
      obj.name === "仓库地面" ||
      // obj.name === "塔吊" ||
      // obj.name === "托盘" ||
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
export function ChangeMaterialEmissive(app) {
  app.model.traverse(function (obj) {
    if (obj instanceof THREE.Mesh) {
      obj.material.emissive = new THREE.Color(1, 1, 1);
      obj.material.emissiveIntensity = 1;
      obj.material.emissiveMap = obj.material.map;
    }
  });
}

