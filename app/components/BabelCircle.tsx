import React, { useEffect, useRef } from "react";
import { Animated, Text, View } from "react-native";

type Phase = "inhale" | "exhale" | "hazır" | "hold1" | "hold2";

interface BreathCircleProps {
  phase: Phase;
}

const BreathCircle: React.FC<BreathCircleProps> = ({ phase }) => {
  const scaleAnim = useRef(new Animated.Value(1)).current;

  useEffect(() => {
    if (phase === "inhale") {
      Animated.timing(scaleAnim, {
        toValue: 1.4,
        duration: 4000,
        useNativeDriver: true,
      }).start();
    } else if (phase === "exhale") {
      Animated.timing(scaleAnim, {
        toValue: 1,
        duration: 4000,
        useNativeDriver: true,
      }).start();
    }
  }, [phase]);

  return (
    <Animated.View
      className="w-60 h-60 rounded-full bg-[#6b8e23]  justify-center items-center shadow-lg"
      style={{ transform: [{ scale: scaleAnim }] }}
    >
      <Text className="text-white text-xl font-semibold capitalize">
        {phase === "hazır"
          ? "Hazır"
          : phase === "inhale"
          ? "Nefes Al"
          : phase === "exhale"
          ? "Ver"
          : "Bekle"}
      </Text>
    </Animated.View>
  );
};

export default BreathCircle;
