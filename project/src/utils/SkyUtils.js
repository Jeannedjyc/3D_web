import * as THREE from 'three'

/**
 * Creates a sky box with light blue sky.
 */
export default class SkyUtils {
  static NAME = 'SKY'
  static vertexShader = '\
    varying vec3 vWorldPosition; \
    void main() { \
      vec4 worldPosition = modelMatrix * vec4( position, 1.0 ); \
      vWorldPosition = worldPosition.xyz; \
      gl_Position = projectionMatrix * modelViewMatrix * vec4( position, 1.0 ); \
    }'
  static fragmentShader = ' \
    uniform vec3 topColor; \
    uniform vec3 bottomColor; \
    uniform float offset; \
    uniform float exponent; \
    varying vec3 vWorldPosition; \
    void main() { \
      float h = normalize( vWorldPosition + offset ).y; \
      gl_FragColor = vec4( mix( bottomColor, topColor, max( pow( max( h, 0.0 ), exponent ), 0.0 ) ), 1.0 ); \
    }'

  static createSky (num) {
    const uniforms = {
      topColor: { value: new THREE.Color(0xaabbff) },
      bottomColor: { value: new THREE.Color(0xffffff) },
      offset: { value: 400 },
      exponent: { value: 0.6 }
    }
    const skyGeo = new THREE.SphereBufferGeometry(num, 32, 15)
    const skyMat = new THREE.ShaderMaterial({
      uniforms: uniforms,
      vertexShader: this.vertexShader,
      fragmentShader: this.fragmentShader,
      side: THREE.BackSide
    })

    const sky = new THREE.Mesh(skyGeo, skyMat)
    sky.name = this.NAME
    return sky
  }
}