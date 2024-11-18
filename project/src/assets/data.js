import * as THREE from 'three';

export const carOpenModelNames = {
  左前车门: {
    name: '左前车门',
    music: 'music/车门打开.wav',
    rotation: [
      THREE.MathUtils.degToRad(-180),
      THREE.MathUtils.degToRad(78),
      THREE.MathUtils.degToRad(-180)
    ],
    open: false
  },
  左后车门: {
    name: '左后车门',
    music: 'music/车门打开.wav',
    rotation: [
      THREE.MathUtils.degToRad(-180),
      THREE.MathUtils.degToRad(78),
      THREE.MathUtils.degToRad(-180)
    ],
    open: false
  },
  右前车门: {
    name: '右前车门',
    music: 'music/车门打开.wav',
    rotation: [0, THREE.MathUtils.degToRad(78), 0],
    open: false
  },
  右后车门: {
    name: '右后车门',
    music: 'music/车门打开.wav',
    rotation: [0, THREE.MathUtils.degToRad(78), 0],
    open: false
  },
  引擎盖: {
    name: '引擎盖',
    music: 'music/引擎盖打开.wav',
    rotation: [THREE.MathUtils.degToRad(50), 0, 0],
    open: false
  },
  后备箱: {
    name: '后备箱',
    music: 'music/引擎盖打开.wav',
    rotation: [THREE.MathUtils.degToRad(-50), 0, 0],
    open: false
  }
};
