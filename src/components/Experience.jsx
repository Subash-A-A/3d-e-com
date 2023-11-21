import { OrbitControls, Text } from "@react-three/drei";
import React, { useRef, useEffect, useState } from "react";
import { useFrame, useThree } from "@react-three/fiber";
import { Window } from "./Window";
import { Graffiti } from "./Graffiti";
import gsap from "gsap";
import {
  Bloom,
  DepthOfField,
  EffectComposer,
  Noise,
  Vignette,
} from "@react-three/postprocessing";

const lerp = (a, b, alpha) => {
  return a + alpha * (b - a);
};

const Experience = () => {
  const [pointerMotion, setPointerMotion] = useState(false);
  const { camera, pointer } = useThree();

  const emily = useRef(null);
  useFrame((state, delta) => {
    if (!pointerMotion) return;
    emily.current.position.x = lerp(
      emily.current.position.x,
      -pointer.x * 0.025,
      delta
    );
    emily.current.position.y = lerp(
      emily.current.position.y,
      0.3 - pointer.y * 0.025,
      delta
    );

    emily.current.rotation.y = lerp(
      emily.current.rotation.y,
      -pointer.x * 0.25,
      delta
    );
    emily.current.rotation.x = lerp(
      emily.current.rotation.x,
      pointer.y * 0.125,
      delta
    );

    // Clamp Rotation
    if (emily.current.rotation.y < -0.25) {
      emily.current.rotation.y = -0.25;
    }
    if (emily.current.rotation.y > 0.25) {
      emily.current.rotation.y = 0.25;
    }
    if (emily.current.rotation.x < -0.125) {
      emily.current.rotation.x = -0.125;
    }
    if (emily.current.rotation.x > 0.125) {
      emily.current.rotation.x = 0.125;
    }

    // Clamp Position
    if (emily.current.position.x < -0.025) {
      emily.current.position.x = -0.025;
    }
    if (emily.current.position.x > 0.025) {
      emily.current.position.x = 0.025;
    }
    if (emily.current.position.y < 0.275) {
      emily.current.position.y = 0.275;
    }
    if (emily.current.position.y > 0.325) {
      emily.current.position.y = 0.325;
    }
  });
  useEffect(() => {
    setPointerMotion(false);
    gsap
      .fromTo(
        camera.position,
        { x: 0, z: 0 },
        { x: 0, z: 5, duration: 0.5, delay: 2, ease: "power4.out" }
      )
      .then(() => {
        setPointerMotion(true);
      });
  }, []);

  return (
    <>
      <color attach={"background"} args={["#343757"]}></color>
      <OrbitControls enabled={false} />

      <group position={[0, 0.3, -5.5]} ref={emily}>
        <Graffiti
          text={"Fashion"}
          font1={"PlayfairDisplay-BoldItalic.ttf"}
          font2={"PlayfairDisplay-BoldItalic.ttf"}
        />
        <Window />
      </group>
      <EffectComposer>
        <DepthOfField
          focusDistance={0}
          focalLength={0.03}
          bokehScale={3}
          height={480}
        />
        <Bloom luminanceThreshold={0} luminanceSmoothing={0.9} height={300} />
        <Noise opacity={0.02} />
        <Vignette eskil={false} offset={0.1} darkness={1.1} />
      </EffectComposer>
    </>
  );
};

export default Experience;
