import React, { useRef, useState, useEffect, useMemo } from "react";
import {
  View,
  TouchableOpacity,
  PixelRatio,
  Platform,
  Image,
  Text,
} from "react-native";
import Canvas from "react-native-drawing-canvas";
import { styles } from "./styles";
import { HeaderButtons, Item } from "react-navigation-header-buttons";
import { MaterialHeaderButton } from "../../components/NavHeaderButtons";
import { Menu, Divider } from "react-native-paper";
import ViewShot, { captureRef } from "react-native-view-shot";
import { v1 as uuid } from "uuid";
import * as MediaLibrary from "expo-media-library";
import * as ImagePicker from "expo-image-picker";
import * as FileSystem from "expo-file-system";

const targetPixelCount = 1080; // If you want full HD pictures
const pixelRatio = PixelRatio.get(); // The pixel ratio of the device
// pixels * pixelratio = targetPixelCount, so pixels = targetPixelCount / pixelRatio
const pixels = targetPixelCount / pixelRatio;

const PEN_COLORS = [
  "white",
  "#F78DA7", //pink
  "#EB144C", //red
  "#FF6900", //orange
  "#FCB900", //gold
  "#7BDCB5", //teal
  "#00D084", //green
  "#8ED1FC", //light blue
  "#0693E3", //blue
  "#9900EF", //purple
  "#8B4513", //brown
  "#ABB8C3", //gray
  "black",
];

const Sketch = ({ navigation }) => {
  const canvasRef = useRef();
  const viewRef = useRef();
  const android_capture_ref = useRef();
  const [penColor, setPenColor] = useState("black");
  const [drawing, setDrawing] = useState("");
  const [backgroundImage, setBackgroundImage] = useState("");
  const [colorMenuOpen, setColorMenuOpen] = useState(false);
  const [overflowMenuOpen, setOverflowMenuOpen] = useState(false);
  const [penSize, setPenSize] = useState({ min: 0.5, max: 2.5 });
  //TODO: move pensize and color to redux

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
            <Divider />
            {/* <Menu.Item
              icon={"refresh"}
              titleStyle={{ fontFamily: "open-sans" }}
              onPress={undoStroke}
              title="Undo"
            />
            <Divider /> */}
            <Menu.Item icon="upload" onPress={loadImage} title="Load Canvas" />
            <Menu.Item
              icon="content-save"
              onPress={saveImage}
              title="Save Image"
            />
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

  // const undoStroke = () => {
  //   if (canvasRef.current) {
  //     canvasRef.current.undoStroke();
  //     setOverflowMenuOpen(false);
  //   }
  // };

  const saveImage = async () => {
    if (Platform.OS === "android") {
      canvasRef.current.readSignature();
    } else {
      const result = await captureRef(viewRef.current, {
        result: "tmpfile",
        height: pixels,
        width: pixels,
        quality: 1,
        format: "jpg",
      });
      const { status } = await MediaLibrary.requestPermissionsAsync();
      if (status === "granted") {
        const file_path =
          Platform.OS === "android" ? result : `file:///${result}`;
        try {
          const album = await MediaLibrary.getAlbumAsync("Board Game Buddy");
          const asset = await MediaLibrary.createAssetAsync(file_path);
          console.log(asset, album);
          if (album) {
            await MediaLibrary.addAssetsToAlbumAsync(asset, album, true);
          } else {
            await MediaLibrary.createAlbumAsync("Board Game Buddy", asset);
          }
          alert("Your drawing has been saved.");
          setOverflowMenuOpen(false);
        } catch (err) {
          console.log(err);
          alert("Something went wrong saving your drawing, please try again.");
          setOverflowMenuOpen(false);
        }
      }
    }
  };

  // const saveToMediaLibrary = async (uri) => {
  //   const { status } = await MediaLibrary.requestPermissionsAsync();
  //   if (status === "granted") {
  //     try {
  //       const album = await MediaLibrary.getAlbumAsync("Board Game Buddy");
  //       const asset = await MediaLibrary.createAssetAsync(uri);
  //       console.log(asset, album);
  //       if (album) {
  //         await MediaLibrary.addAssetsToAlbumAsync(asset, album, true);
  //       } else {
  //         await MediaLibrary.createAlbumAsync("Board Game Buddy", asset);
  //       }
  //       alert("Your drawing has been saved.");
  //       setOverflowMenuOpen(false);
  //     } catch (err) {
  //       console.log(err);
  //       alert("Something went wrong saving your drawing, please try again.");
  //       setOverflowMenuOpen(false);
  //     }
  //   }
  // };

  const loadImage = async () => {
    const { status } = await ImagePicker.requestCameraRollPermissionsAsync();
    if (status !== "granted") {
      return alert("Sorry, we need camera roll permissions to make this work!");
    }
    let result = await ImagePicker.launchImageLibraryAsync({
      mediaTypes: ImagePicker.MediaTypeOptions.Images,
      allowsEditing: true,
      aspect: [9, 18],
      quality: 1,
      base64: true,
    });
    setDrawing(result.base64);
    setBackgroundImage("data:image/jpeg;base64," + result.base64);
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

  const handleDrawing = async (drawing) => {
    try {
      const path =
        FileSystem.cacheDirectory +
        "_" +
        Math.random().toString(36).substr(2, 9) +
        "image.jpg";
      const write = await FileSystem.writeAsStringAsync(
        path,
        drawing.replace("data:image/png;base64,", ""),
        { encoding: FileSystem.EncodingType.Base64 }
      );
      const res = await FileSystem.getInfoAsync(path, {
        size: true,
        md5: true,
      });
      const { status } = await MediaLibrary.requestPermissionsAsync();
      if (status === "granted") {
        try {
          const album = await MediaLibrary.getAlbumAsync("Board Game Buddy");
          const asset = await MediaLibrary.createAssetAsync(res.uri);
          console.log(asset, album);
          if (album) {
            await MediaLibrary.addAssetsToAlbumAsync(asset, album, true);
          } else {
            await MediaLibrary.createAlbumAsync("Board Game Buddy", asset);
          }
          alert("Your drawing has been saved.");
          setOverflowMenuOpen(false);
        } catch (err) {
          console.log(err);
          alert("Something went wrong saving your drawing, please try again.");
          setOverflowMenuOpen(false);
        }
      }
    } catch (err) {
      console.log(err);
      throw err;
    }
  };

  const handleEmpty = () => {
    console.log("Empty");
  };

  const handleClear = () => {
    console.log("clear success!");
  };

  const handleEnd = () => {
    //canvasRef.current.readSignature();
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
        onOK={handleDrawing}
        onEmpty={handleEmpty}
        onClear={handleClear}
        autoClear={false}
        penColor={penColor}
        strokeWidth={penSize}
        dataURL={backgroundImage}
      />
    </View>
  );
};

export default Sketch;
