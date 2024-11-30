import * as THREE from 'three'
import { REVISION } from 'three'
import { OrbitControls } from 'three/examples/jsm/controls/OrbitControls.js'
import { GLTFLoader } from 'three/examples/jsm/loaders/GLTFLoader'
import { DRACOLoader } from 'three/examples/jsm/loaders/DRACOLoader.js'
import vertex from '@/assets/shaders/vertex.glsl'
import fragment from '@/assets/shaders/fragment.glsl'
import * as dat from 'lil-gui'
import gsap from 'gsap'

class Canvas {
  constructor(options) {
    this.scene = new THREE.Scene()

    this.container = options.dom
    this.width = this.container.offsetWidth
    this.height = this.container.offsetHeight
    this.renderer = new THREE.WebGLRenderer()
    this.renderer.setPixelRatio(window.devicePixelRatio)
    this.renderer.setSize(this.width, this.height)
    this.renderer.setClearColor(0x000000, 1)

    this.container.appendChild(this.renderer.domElement)

    this.camera = new THREE.PerspectiveCamera(
      70,
      window.innerWidth / window.innerHeight,
      0.001,
      1000,
    )

    // var frustumSize = 10;
    // var aspect = window.innerWidth / window.innerHeight;
    // this.camera = new THREE.OrthographicCamera( frustumSize * aspect / - 2, frustumSize * aspect / 2, frustumSize / 2, frustumSize / - 2, -1000, 1000 );
    this.camera.position.set(0, 0, 2)
    this.controls = new OrbitControls(this.camera, this.renderer.domElement)
    this.time = new THREE.Clock()
    this.elapsedTime = 0
    this.previousTime = 0

    const THREE_PATH = `https://unpkg.com/three@0.${REVISION}.x`
    this.dracoLoader = new DRACOLoader(new THREE.LoadingManager()).setDecoderPath(
      `${THREE_PATH}/examples/jsm/libs/draco/gltf/`,
    )
    this.gltfLoader = new GLTFLoader()
    this.gltfLoader.setDRACOLoader(this.dracoLoader)

    this.isPlaying = true

    this.addObjects()
    this.addLights()
    this.resize()
    this.render()
    this.setupResize()
    // this.settings();
  }

  settings() {
    this.settings = {
      progress: 0,
    }
    this.gui = new dat.GUI()
    this.gui.add(this.settings, 'progress', 0, 1, 0.01)
  }

  setupResize() {
    window.addEventListener('resize', this.resize.bind(this))
  }

  resize() {
    this.width = this.container.offsetWidth
    this.height = this.container.offsetHeight
    this.renderer.setSize(this.width, this.height)
    this.camera.aspect = this.width / this.height

    // image cover
    this.imageAspect = 1
    let a1
    let a2
    if (this.height / this.width > this.imageAspect) {
      a1 = (this.width / this.height) * this.imageAspect
      a2 = 1
    } else {
      a1 = 1
      a2 = this.height / this.width / this.imageAspect
    }

    this.material.uniforms.resolution.value.x = this.width
    this.material.uniforms.resolution.value.y = this.height
    this.material.uniforms.resolution.value.z = a1
    this.material.uniforms.resolution.value.w = a2

    this.camera.updateProjectionMatrix()
  }

  addLights() {
    const light1 = new THREE.AmbientLight(0xffffff, 0.5)
    this.scene.add(light1)

    const light2 = new THREE.DirectionalLight(0xffffff, 0.5)
    light2.position.set(0.5, 0, 0.866)
    this.scene.add(light2)
  }

  addObjects() {
    this.material = new THREE.ShaderMaterial({
      side: THREE.DoubleSide,
      uniforms: {
        time: { value: 0 },
        resolution: { value: new THREE.Vector4() },
      },
      vertexShader: vertex,
      fragmentShader: fragment,
    })

    this.geometry = new THREE.PlaneGeometry(1, 1, 1, 1)
    this.plane = new THREE.Mesh(this.geometry, this.material)
    this.scene.add(this.plane)
  }

  stop() {
    this.isPlaying = false
  }

  play() {
    if (!this.isPlaying) {
      this.render()
      this.isPlaying = true
    }
  }

  render() {
    if (!this.isPlaying) return
    this.elapsedTime = this.time.getElapsedTime()
    // const deltaTime = this.elapsedTime - this.previousTime
    // this.previousTime = this.elapsedTime
    this.material.uniforms.time.value = this.elapsedTime
    requestAnimationFrame(this.render.bind(this))
    this.renderer.render(this.scene, this.camera)
  }
}

export default Canvas
