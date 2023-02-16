import { MD5 } from "crypto-js";
import i18next from "i18next";
import skins_pt from "../../skins_pt.json";
import skins_en from "../../skins_en.json";

export default function getSkinName(hash: string) {
  const skins = i18next.language === "pt" ? skins_pt : skins_en;

  for (const skin of skins) {
    if (MD5(skin).toString() === hash) {
      return skin;
    }
  }
}
