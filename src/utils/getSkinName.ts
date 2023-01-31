import { MD5 } from "crypto-js";
import skins from "../../skins.json";

export default function getSkinName(hash: string) {
  for (const skin of skins) {
    if (MD5(skin).toString() === hash) {
      return skin;
    }
  }
}
