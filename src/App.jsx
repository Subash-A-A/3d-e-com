import { Canvas } from "@react-three/fiber";
import Experience from "./components/Experience";

function App() {
  return (
    <section id="canvas">
      <Canvas camera={{ fov: 10 }}>
        <Experience />
      </Canvas>
    </section>
  );
}

export default App;
