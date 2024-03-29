import fs from "fs";

async function generateSkinsList() {
    const generalUrl = "http://ddragon.leagueoflegends.com/cdn/13.1.1/data/pt_BR/champion.json";
    const championUrl = "http://ddragon.leagueoflegends.com/cdn/13.1.1/data/pt_BR/champion/";
    let skins = [];

    const champions = await fetch(generalUrl).then(res => res.json());
    
    for (const champion in champions.data) {
        const data = await fetch(championUrl + champion + ".json")
            .then(res => res.json());
        
        skins = skins.concat(data.data[champion].skins.map(skin => {
            return skin.name === "default" ? champion : skin.name;
        }));
    }

    fs.writeFileSync("./skins.json", JSON.stringify(skins));
}

generateSkinsList();