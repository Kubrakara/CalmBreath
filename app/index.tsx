import React, { useEffect, useRef, useState } from "react";
import { View, Text, TouchableOpacity, Modal, Animated } from "react-native";
import { Ionicons } from "@expo/vector-icons";
import BreathCircle from "./components/BabelCircle";

type Phase = "inhale" | "hold1" | "exhale" | "hold2" | "hazır";

interface Technique {
  name: string;
  pattern: number[];
}

const techniques: Technique[] = [
  { name: "Box (4-4-4-4)", pattern: [4, 4, 4, 4] },
  { name: "4-7-8", pattern: [4, 7, 8, 0] },
  { name: "5-5", pattern: [5, 0, 5, 0] },
];

const durations = [60, 180, 300];

export default function App() {
  const [phase, setPhase] = useState<Phase>("hazır");
  const [isRunning, setIsRunning] = useState(false);
  const [showSettings, setShowSettings] = useState(false);
  const [selectedTechnique, setSelectedTechnique] = useState<Technique>(
    techniques[0]
  );
  const [selectedDuration, setSelectedDuration] = useState<number>(60);
  const [remainingTime, setRemainingTime] = useState<number>(60);
  const [stepIndex, setStepIndex] = useState<number>(0);
  const [countdown, setCountdown] = useState<number | null>(null);
  const [isCountingDown, setIsCountingDown] = useState(false);

  const intervalRef = useRef<NodeJS.Timeout | null>(null);
  const countdownRef = useRef<NodeJS.Timeout | null>(null);
  const scaleAnim = useRef(new Animated.Value(1)).current;

  const animateCountdown = () => {
    scaleAnim.setValue(0.7);
    Animated.spring(scaleAnim, {
      toValue: 1,
      useNativeDriver: true,
      friction: 3,
    }).start();
  };

  const startBreathing = () => {
    setIsCountingDown(true);
    setCountdown(3);
    setPhase("hazır");
  };

  const stopBreathing = () => {
    setIsRunning(false);
    setIsCountingDown(false);
    setCountdown(null);
    setPhase("hazır");

    if (intervalRef.current) clearTimeout(intervalRef.current);
    if (countdownRef.current) clearInterval(countdownRef.current);
  };

  const advancePhase = (index: number) => {
    const steps: Phase[] = ["inhale", "hold1", "exhale", "hold2"];
    const duration = selectedTechnique.pattern[index] * 1000;

    if (duration === 0) {
      const nextIndex = (index + 1) % 4;
      return advancePhase(nextIndex);
    }

    setPhase(steps[index]);

    intervalRef.current = setTimeout(() => {
      const nextIndex = (index + 1) % 4;
      setStepIndex(nextIndex);
      advancePhase(nextIndex);
    }, duration);
  };

  useEffect(() => {
    if (!isCountingDown || countdown === null) return;

    animateCountdown();

    if (countdown === 0) {
      setIsCountingDown(false);
      setIsRunning(true);
      setRemainingTime(selectedDuration);
      setStepIndex(0);
      advancePhase(0);
      return;
    }

    const timer = setTimeout(() => {
      setCountdown((prev) => (prev !== null ? prev - 1 : null));
    }, 1000);

    return () => clearTimeout(timer);
  }, [countdown, isCountingDown]);

  useEffect(() => {
    if (!isRunning) return;

    countdownRef.current = setInterval(() => {
      setRemainingTime((prev) => {
        if (prev <= 1) {
          stopBreathing();
          return 0;
        }
        return prev - 1;
      });
    }, 1000);

    return () => {
      if (countdownRef.current) clearInterval(countdownRef.current);
    };
  }, [isRunning]);

  return (
    <View className="flex-1 justify-center items-center bg-[#f6f5ec] px-4 relative">
      <Text className="text-2xl font-bold text-[#836953] mb-20">
        Zihnini ve Bedenini Sakinleştir
      </Text>

      {isCountingDown && countdown !== null ? (
        <Animated.Text
          style={{ transform: [{ scale: scaleAnim }] }}
          className="text-5xl font-bold text-[#836953]"
        >
          {countdown === 0 ? "Hazır!" : countdown}
        </Animated.Text>
      ) : (
        <BreathCircle phase={phase} />
      )}

      <Text className="mt-20 text-[#836953]">
        Kalan: {Math.floor(remainingTime / 60)}:
        {String(remainingTime % 60).padStart(2, "0")}
      </Text>

      <TouchableOpacity
        onPress={() =>
          isRunning || isCountingDown ? stopBreathing() : startBreathing()
        }
        className="mt-8 px-6 py-3 bg-[#6b8e23] rounded-xl"
      >
        <Text className="text-white text-lg">
          {isRunning || isCountingDown ? "Durdur" : "Başla"}
        </Text>
      </TouchableOpacity>

      <TouchableOpacity
        onPress={() => setShowSettings(true)}
        className="absolute bottom-6 right-6 bg-[#a8c686] p-4 rounded-full shadow"
      >
        <Ionicons name="settings-outline" size={24} color="#836953" />
      </TouchableOpacity>

      <Modal visible={showSettings} animationType="slide" transparent>
        <View className="flex-1 justify-end bg-black/30">
          <View className="bg-[#6b8e23] p-6 rounded-t-2xl max-h-[70%]">
            <Text className="text-xl font-bold mb-4 text-[#f6f5ec]">
              Teknik Seç
            </Text>

            {techniques.map((t, index) => (
              <TouchableOpacity
                key={index}
                onPress={() => {
                  stopBreathing();
                  setSelectedTechnique(t);
                  setRemainingTime(selectedDuration);
                }}
                className={`p-3 rounded-lg mb-2 ${
                  selectedTechnique.name === t.name
                    ? "bg-[#a0bb6b]"
                    : "bg-[#f6f5ec]"
                }`}
              >
                <Text className="text-[#5e432d]">{t.name}</Text>
              </TouchableOpacity>
            ))}

            <Text className="text-xl font-bold mt-4 mb-2 text-[#f6f5ec]">
              Süre Seç
            </Text>

            <View className="flex-row gap-3">
              {durations.map((d) => (
                <TouchableOpacity
                  key={d}
                  onPress={() => {
                    stopBreathing();
                    setSelectedDuration(d);
                    setRemainingTime(d);
                  }}
                  className={`px-4 py-2 rounded-xl ${
                    selectedDuration === d ? "bg-[#a0bb6b]" : "bg-[#f6f5ec]"
                  }`}
                >
                  <Text className="text-[#5e432d]">{d / 60} dk</Text>
                </TouchableOpacity>
              ))}
            </View>

            <TouchableOpacity
              onPress={() => {
                stopBreathing();
                setShowSettings(false);
              }}
              className="mt-6 bg-[#425719] rounded-xl py-3"
            >
              <Text className="text-white text-center text-lg">Kaydet</Text>
            </TouchableOpacity>
          </View>
        </View>
      </Modal>
    </View>
  );
}
