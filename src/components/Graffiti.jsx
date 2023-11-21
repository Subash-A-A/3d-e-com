import { Text } from "@react-three/drei";
import gsap from "gsap";
import { useRef, useEffect } from "react";

export const Graffiti = ({ text, font1, font2 }) => {
  const front = useRef();
  const back = useRef();
  useEffect(() => {
    gsap.fromTo(
      front.current,
      { letterSpacing: 3 },
      { letterSpacing: 0, duration: 0.5, delay: 2, ease: "back.out(0.5)" }
    );
    gsap.fromTo(
      back.current,
      { letterSpacing: 3 },
      {
        letterSpacing: 0,
        duration: 0.5,
        delay: 2.25,
        ease: "back.out(0.1)",
      }
    );
  }, []);
  return (
    <group rotation={[0, 0, Math.PI * 0.1]}>
      <Text
        font={`/fonts/${font1}`}
        position={[0, -0.3, -0.9]}
        fontSize={1}
        color={"#E893CF"}
        ref={front}
      >
        {text}
      </Text>
      <Text
        font={`/fonts/${font2}`}
        position={[0, -0.3, -0.95]}
        fontSize={1.025}
        color={"#FFDFDF"}
        ref={back}
      >
        {text}
      </Text>
    </group>
  );
};
