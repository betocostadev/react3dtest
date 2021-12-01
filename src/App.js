import React, { useRef, Suspense } from 'react'
import './App.css'

import { Canvas, useFrame, useLoader } from '@react-three/fiber'
import { TextureLoader } from 'three/src/loaders/TextureLoader'
// import { BoxBufferGeometry } from 'three'

// import { Box } from '@react-three/drei'

// A box that will be its own component to be able to use the hook inside the canvas
const SimpleBox = ({ position, args, color }) => {
  const simpleBox = useRef(null)
  
  useFrame(() => simpleBox.current.rotation.x = simpleBox.current.rotation.y += 0.01)
  
  return (
    <mesh position={position} ref={simpleBox}>
      <boxBufferGeometry attach="geometry" args={args} />
      <meshStandardMaterial attach="material" color={color} />
    </mesh>
  )
}

const Scene = () => {
  // const colorMap = useLoader(TextureLoader, './logo192.png')
  const colorMap = useLoader(TextureLoader, './assets/backgrounds/island.svg')
  return (
    <>
      <ambientLight intensity={0.35} />
      <directionalLight />
      <mesh>
        <planeGeometry args={[18, 18, 1]} />
        {/* <sphereGeometry args={[1, 32, 32]} /> */}
        <meshStandardMaterial map={colorMap} />
      </mesh>
    </>
  )
}


const App = () => {
  // const texture = useTexture('/logo192.png')

  return (
    <React.Fragment>
      <h2 className="app-title">React Three Fiber</h2>
      
      {/* No HTML inside the canvas */}
      {/* <Canvas camera={{position:[-5, 2, 10], fov: 60 }}> */}
      <Canvas style={{ backgroundColor: '#4b4c4b'}} camera={{position: [0, 0, 16], fov: 60 }}>
        <ambientLight intensity={0.35} />
        <directionalLight
          position={[0, 10, 0]}
          intensity={1}
          />
        <pointLight position={[-10, 0, -20]} intensity={0.5} />
        <pointLight position={[0, -10, 0]} intensity={0.5} />
        
        <SimpleBox position={[0, 1, 5]} args={[1, 1, 1]} color="teal" />
        <SimpleBox position={[-6, 1, 3]} args={[3, 2, 1]} color="red" />
        <SimpleBox position={[5, 1, 2]} args={[1, 2, 1]} color="lime" />

        {/* <mesh>
          <planeBufferGeometry attach="geometry" args={[3, 1, 1]} />
          <meshStandardMaterial attach="material" color="green" />
        </mesh> */}
        {/* <mesh>
          <circleBufferGeometry attach="geometry" args={[3, 3, 3]} />
          <meshStandardMaterial attach="material" />
        </mesh> */}

        {/* Using Drei */}
        {/* <Box args={[2, 2]} position={[0, 0, 0]}>
          <meshBasicMaterial attach="material" color="hotpink" />
        </Box> */}

        {/* Lights */}
        <Suspense fallback={null}>
          <Scene />
        </Suspense>

      </Canvas>
    </React.Fragment>
  )
}

export default App
