import * as THREE from 'three';
import { destroyControlGroupText } from '@/three/loaderModel';

export function Model_Present(app){
    app.flyTo({
      position: [60, 130, 240],
      controls: [0, 0, 0], 
      done: () => {
        console.log();
        app.model.traverse((obj) => {
            if (obj.name === '海关地面'|| obj.name === '仓库地面'|| obj.name === '塔吊'||
                obj.name === '托盘'|| obj.name.match(/Floor_安装[1-5]/)|| obj.name.match(/Floor海关[1-2]/)
                ||obj.name.match(/集装箱[1-4]/)|| obj.name === '起重机'|| obj.name.match(/Floor_4F6.仓库[1-13]/)|| 
                obj.name === 'Rooftop.001'|| obj.name === 'Floor_26F.001'||obj.name === '路面2'||obj.name.match(/隔断[1-3]/)||obj.name === '集装箱'
                ||obj.name === 'MiC地面'||obj.name === '仓库'||obj.name === '木板'||obj.name === '水泥'||obj.name === '线缆'||obj.name === '钢管'
                ||obj.name.match(/仓库[0-1][0-9]/)||obj.name === '路面3'||obj.name.match(/LL1_HK/)||obj.name.match(/LL2_HK/)||obj.name.match(/RR1_HK/)
                ||obj.name.match(/RR2_HK/)||obj.name.match(/ML_HK/)||obj.name.match(/MM_HK/)||obj.name.match(/MR_HK/)||obj.name.match(/Center_HK/)||obj.name.match(/RR1_custom/)
                ||obj.name.match(/RR2_custom/)||obj.name.match(/ML_custom/)||obj.name.match(/MM_custom/)||obj.name.match(/MR_custom/)||obj.name.match(/Center_custom/)
                ||obj.name.match(/LL1_custom/)||obj.name.match(/LL2_custom/)||obj.name.match(/RR1_yard/)||obj.name.match(/LL1_yard/)||obj.name.match(/LL2_yard/)
                ||obj.name.match(/RR2_yard/)||obj.name.match(/ML_yard/)||obj.name.match(/MM_yard/)||obj.name.match(/MR_yard/)||obj.name.match(/Center_yard/)) {
                obj.visible = false;
            }
            if (obj.name === 'B栋'|| obj.name === 'C栋'|| 
                obj.name === '左下物体'|| obj.name.match(/其余建筑[1-4]/)) {
                obj.visible = true;
            }
            if (obj.name.match(/[0-2][0-9]F/)|| obj.name.match(/Rooftop/)) {
                obj.material = app.modelMaterials[obj.name]?.material;         
            }
        while (app.controlGroup.children.length) {
            app.controlGroup.remove(app.controlGroup.children[0]);
        }
        });
              
      }
    });
  
  }