import React from "react";
import { View, Text, TouchableOpacity } from "react-native";

interface DurationSelectorProps {
  onSelect: (duration: number) => void;
  selected: number;
}

const options = [60, 180, 300];

const DurationSelector: React.FC<DurationSelectorProps> = ({
  onSelect,
  selected,
}) => {
  return (
    <View className="flex-row gap-4 mt-4">
      {options.map((sec) => (
        <TouchableOpacity
          key={sec}
          onPress={() => onSelect(sec)}
          className={`px-4 py-2 rounded-xl ${
            selected === sec ? "bg-[#6b8e23]" : "bg-[#a8c686]"
          }`}
        >
          <Text
            className={`text-white font-medium ${
              selected === sec ? "text-lg" : "text-base"
            }`}
          >
            {sec / 60} dk
          </Text>
        </TouchableOpacity>
      ))}
    </View>
  );
};

export default DurationSelector;
