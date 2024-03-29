/**
 * @desc Draggable and reanimated demo page.
 * Usage in https://github.com/tongyy/react-native-draggable.
 * @author supervons
 * @date 2021/05/29
 */
import React from "react";
import { View, Dimensions } from "react-native";
import Draggable from "react-native-draggable";

const { height } = Dimensions.get("window");
export default function DraggablePage() {
  return (
    <View>
      <Draggable
        renderSize={56}
        renderColor="black"
        renderText="SV"
        x={200}
        y={300}
        animatedViewProps={{ height: height }}
        isCircle
        shouldReverse
        onShortPressRelease={() => alert("touched!!")}
      />
    </View>
  );
}
