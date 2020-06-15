import { Dimensions } from "react-native";

const device = Dimensions.get("window");
let scale;

if (device.width <= 414) {
  // Android smartphones
  scale = device.width / 414;
} else {
  // Android tablets
  scale = 1;
}

export { scale };
export const size = (pixel) => Math.ceil(pixel * scale);
