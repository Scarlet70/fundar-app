import fs from "node:fs";
import data from "../data/exports.js";

const writeData = (endPath: string) => {
    fs.writeFileSync(endPath, JSON.stringify(data, null, 4), "utf-8");
};

if (process.argv[2] === "--convert") {
    writeData("./json/export1.json");
    console.log(process.argv[2]);
}
