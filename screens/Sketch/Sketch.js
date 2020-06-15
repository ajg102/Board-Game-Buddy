import React, { useRef, useState, useEffect } from "react";
import { View, TouchableOpacity, PixelRatio } from "react-native";
import Canvas from "react-native-signature-canvas";
import { styles } from "./styles";
import { HeaderButtons, Item } from "react-navigation-header-buttons";
import { MaterialHeaderButton } from "../../components/NavHeaderButtons";
import { Menu, Divider } from "react-native-paper";
import { captureRef } from "react-native-view-shot";
import * as MediaLibrary from "expo-media-library";
import * as ImagePicker from "expo-image-picker";

const PEN_COLORS = [
  "red",
  "blue",
  "green",
  "yellow",
  "orange",
  "purple",
  "black",
  "white",
  "lightblue",
];

const webStyle = `
body {
    overflow: hidden;
}
.m-signature-pad--footer {
    display: none;
}
  .save {
      display: none;
  }
  .clear {
      display: none;
  }
  .m-signature-pad--body {
      position: absolute;
      left: 0px;
      right: 0px;
      top: 0px;
      bottom: 0px;
      border: 1px solid white;
    }
    canvas {
      position: absolute;
      left: 0;
      top: 0;
      width: 100%;
      height: 100%;
      background-color: white;
    }
`;

const Sketch = ({ navigation }) => {
  const canvasRef = useRef();
  const viewRef = useRef();
  const [penColor, setPenColor] = useState("black");
  const [drawing, setDrawing] = useState("");
  const [colorMenuOpen, setColorMenuOpen] = useState(false);
  const [overflowMenuOpen, setOverflowMenuOpen] = useState(false);
  useEffect(() => {
    navigation.setOptions({
      headerRight: () => (
        <HeaderButtons HeaderButtonComponent={MaterialHeaderButton}>
          <Menu
            anchor={
              <TouchableOpacity
                style={[{ backgroundColor: penColor }, styles.penColorButton]}
                onPress={toggleColorPicker}
              />
            }
            visible={colorMenuOpen}
            onDismiss={() => setColorMenuOpen(false)}
          >
            <TouchableOpacity
              style={[
                { backgroundColor: penColor, margin: 12 },
                styles.penColorButton,
              ]}
              onPress={toggleColorPicker}
            />
            <Divider />
            {PEN_COLORS.map((color) => {
              if (penColor === color) return null;
              return (
                <TouchableOpacity
                  key={color}
                  style={[
                    { backgroundColor: color, margin: 12 },
                    styles.penColorButton,
                  ]}
                  onPress={() => changePenColor(color)}
                />
              );
            })}
          </Menu>
          <Menu
            anchor={
              <Item
                iconName="dots-vertical"
                title="menu"
                onPress={toggleOverflowMenu}
              />
            }
            visible={overflowMenuOpen}
            onDismiss={() => setOverflowMenuOpen(false)}
          >
            <Menu.Item icon="upload" onPress={loadImage} title="Load Canvas" />
            <Menu.Item
              icon="content-save"
              onPress={saveImage}
              title="Save Image"
            />
            <Divider />
            <Menu.Item
              icon={"pencil-remove"}
              onPress={clearSignature}
              title="Clear Canvas"
            />
          </Menu>
        </HeaderButtons>
      ),
    });
  }, [
    penColor,
    navigation,
    changePenColor,
    toggleColorPicker,
    colorMenuOpen,
    overflowMenuOpen,
  ]);

  const changePenColor = (color) => {
    setPenColor(color);
    setColorMenuOpen(false);
  };

  const toggleColorPicker = () => {
    setColorMenuOpen((prev) => !prev);
  };

  const toggleOverflowMenu = () => {
    setOverflowMenuOpen((prev) => !prev);
  };

  const saveImage = async () => {
    const targetPixelCount = 1080; // If you want full HD pictures
    const pixelRatio = PixelRatio.get(); // The pixel ratio of the device
    // pixels * pixelratio = targetPixelCount, so pixels = targetPixelCount / pixelRatio
    const pixels = targetPixelCount / pixelRatio;

    const result = await captureRef(viewRef.current, {
      result: "tmpfile",
      height: pixels,
      width: pixels,
      quality: 1,
      format: "png",
    });
    await MediaLibrary.saveToLibraryAsync(`file:///${result}`);
    setOverflowMenuOpen(false);
  };

  const loadImage = async () => {
    const { status } = await ImagePicker.requestCameraRollPermissionsAsync();
    if (status !== "granted") {
      return alert("Sorry, we need camera roll permissions to make this work!");
    }
    let result = await ImagePicker.launchImageLibraryAsync({
      mediaTypes: ImagePicker.MediaTypeOptions.Images,
      allowsEditing: true,
      aspect: [4, 3],
      quality: 1,
      base64: true,
    });
    setDrawing(result.base64);
    setOverflowMenuOpen(false);
  };

  const clearSignature = () => {
    if (canvasRef.current) {
      canvasRef.current.clearSignature();
      setDrawing("");
      setOverflowMenuOpen(false);
    }
  };

  const handleSignature = (drawing) => {
    setDrawing(drawing);
  };

  const handleEmpty = () => {
    console.log("Empty");
  };

  const handleClear = () => {
    console.log("clear success!");
  };

  const handleEnd = () => {
    canvasRef.current.readSignature();
  };

  return (
    <View style={styles.container} ref={viewRef}>
      <Canvas
        ref={canvasRef}
        webStyle={webStyle}
        onEnd={handleEnd}
        onOK={handleSignature}
        onEmpty={handleEmpty}
        onClear={handleClear}
        autoClear={false}
        penColor={penColor}
        dataURL={`${drawing}`}
      />
    </View>
  );
};

export default Sketch;
