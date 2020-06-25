import React, { useRef, useState, useEffect, useMemo } from "react";
import {
  View,
  TouchableOpacity,
  PixelRatio,
  ImageBackground,
  Image,
} from "react-native";
import Canvas from "react-native-drawing-canvas";
import { styles } from "./styles";
import { HeaderButtons, Item } from "react-navigation-header-buttons";
import { MaterialHeaderButton } from "../../components/NavHeaderButtons";
import { Menu, Divider } from "react-native-paper";
import { captureRef } from "react-native-view-shot";
import * as MediaLibrary from "expo-media-library";
import * as ImagePicker from "expo-image-picker";

const PEN_COLORS = [
  "white",
  "#FF6900",
  "#FCB900",
  "#7BDCB5",
  "#00D084",
  "#8ED1FC",
  "#0693E3",
  "#ABB8C3",
  "black",
  "#EB144C",
  "#F78DA7",
  "#9900EF",
];

const Sketch = ({ navigation }) => {
  const canvasRef = useRef();
  const viewRef = useRef();
  const [penColor, setPenColor] = useState("black");
  const [drawing, setDrawing] = useState("");
  const [backgroundImage, setBackgroundImage] = useState("");
  const [colorMenuOpen, setColorMenuOpen] = useState(false);
  const [overflowMenuOpen, setOverflowMenuOpen] = useState(false);
  const [penSize, setPenSize] = useState({ min: 20, max: 30 });
  useEffect(() => {
    navigation.setOptions({
      swipeEnabled: false,
      headerRight: () => (
        <HeaderButtons HeaderButtonComponent={MaterialHeaderButton}>
          <Menu
            anchor={
              <TouchableOpacity
                style={[{ backgroundColor: penColor }, styles.penColorButton]}
                onPress={toggleColorPicker}
              />
            }
            contentStyle={{ paddingBottom: 32 }}
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
            <Menu.Item
              icon="pencil"
              titleStyle={{ fontFamily: "open-sans" }}
              onPress={() => changePenSize("s")}
              title="Small Pen"
            />
            <Menu.Item
              icon="pen"
              titleStyle={{ fontFamily: "open-sans" }}
              onPress={() => changePenSize("m")}
              title="Medium Pen"
            />
            <Menu.Item
              icon="brush"
              titleStyle={{ fontFamily: "open-sans" }}
              onPress={() => changePenSize("l")}
              title="Large Pen"
            />
            {/* <Menu.Item icon="upload" onPress={loadImage} title="Load Canvas" />
            <Menu.Item
              icon="content-save"
              onPress={saveImage}
              title="Save Image"
            /> */}
            <Divider />
            <Menu.Item
              icon={"pencil-remove"}
              titleStyle={{ fontFamily: "open-sans" }}
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
    changePenSize,
    toggleColorPicker,
    colorMenuOpen,
    overflowMenuOpen,
  ]);

  const changePenColor = (color) => {
    setPenColor(color);
    setColorMenuOpen(false);
  };

  const changePenSize = (size) => {
    switch (size) {
      case "s":
        setPenSize({ min: 0.5, max: 2.5 });
        break;
      case "m":
        setPenSize({ min: 5, max: 15 });
        break;
      case "l":
        setPenSize({ min: 20, max: 30 });
        break;
      default:
        setPenSize({ min: 0.5, max: 2.5 });
    }
    setOverflowMenuOpen(false);
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
    console.log(result);
    const { status } = await MediaLibrary.requestPermissionsAsync();
    console.log(status);
    if (status === "granted") {
      await MediaLibrary.saveToLibraryAsync(`file:///${result}`);
    }

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
    setBackgroundImage(result.base64);
    setOverflowMenuOpen(false);
  };

  const clearSignature = () => {
    if (canvasRef.current) {
      canvasRef.current.clearSignature();
      setDrawing("");
      setBackgroundImage(null);
      setOverflowMenuOpen(false);
    }
  };

  const handleSignature = (drawing) => {
    //setDrawing(drawing);
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
    <View
      collapsable={false}
      style={styles.container}
      ref={viewRef}
      pointerEvents="box-none"
    >
      <Canvas
        ref={canvasRef}
        onEnd={handleEnd}
        onOK={handleSignature}
        onEmpty={handleEmpty}
        onClear={handleClear}
        autoClear={false}
        penColor={penColor}
        dataURL={drawing}
        backgroundImage={backgroundImage}
        strokeWidth={penSize}
      />
    </View>
  );
};

export default Sketch;
