import { GetSquarifyTreeMap } from "./modules/squarify.js"
import { GetPivotTreeMap } from "./modules/pivot.js";

const cac40Components = [
    { symbol: "OR", marketCap: 237.7 },   // L'Oréal, in billion euros
    { symbol: "MC", marketCap: 435.1 },   // LVMH
    { symbol: "AI", marketCap: 91.5 },    // Air Liquide
    { symbol: "SGO", marketCap: 60.2 },   // Saint-Gobain
    { symbol: "BNP", marketCap: 78.3 },   // BNP Paribas
    { symbol: "SAN", marketCap: 105.8 },  // Sanofi
    { symbol: "DG", marketCap: 33.7 },    // Vinci
    { symbol: "FP", marketCap: 108.9 },   // TotalEnergies
    { symbol: "SU", marketCap: 26.4 },    // Schneider Electric
    { symbol: "CAP", marketCap: 27.5 },   // Capgemini
    { symbol: "VIE", marketCap: 20.2 },   // Veolia
    { symbol: "RI", marketCap: 38.3 },    // Pernod Ricard
    { symbol: "KER", marketCap: 77.5 },   // Kering
    { symbol: "GLE", marketCap: 23.4 },   // Société Générale
    { symbol: "ACA", marketCap: 38.1 },   // Crédit Agricole
    { symbol: "VIV", marketCap: 11.8 },   // Vivendi
    { symbol: "ENGI", marketCap: 33.1 },  // Engie
    { symbol: "MT", marketCap: 34.2 },    // ArcelorMittal
    { symbol: "AIR", marketCap: 117.6 },  // Airbus
    { symbol: "CS", marketCap: 21.9 },    // AXA
    { symbol: "ORA", marketCap: 24.8 },   // Orange
    { symbol: "SAF", marketCap: 37.2 },   // Safran
    { symbol: "PUB", marketCap: 18 },   // Publicis Groupe
    { symbol: "EL", marketCap: 22.5 },    // EssilorLuxottica
    { symbol: "HO", marketCap: 10.4 },    // Thales
    { symbol: "EN", marketCap: 12.8 },    // Bouygues
    { symbol: "RMS", marketCap: 190.7 },  // Hermès
    { symbol: "WLN", marketCap: 12.3 },   // Worldline
    { symbol: "STM", marketCap: 35.9 },   // STMicroelectronics
    { symbol: "ML", marketCap: 17.2 },    // Michelin
    { symbol: "FR", marketCap: 6.5 },     // Eurofins Scientific
    { symbol: "TEP", marketCap: 15.7 },   // Teleperformance
    { symbol: "BN", marketCap: 38.5 },    // Danone
    { symbol: "RCO", marketCap: 18.1 },   // Rémy Cointreau
    { symbol: "ERF", marketCap: 5.3 },    // Eurofins
    { symbol: "ATO", marketCap: 11.3 },   // Atos
    { symbol: "ALU", marketCap: 7.8 },    // Alstom
    { symbol: "LR", marketCap: 8.1 },     // Legrand
    { symbol: "GFC", marketCap: 7.1 },    // Gecina
    { symbol: "IL", marketCap: 6.6 }      // Iliad
  ];

let testwidth = 1800;
let testheight = 800;
// let result = GetSquarifyTreeMap(cac40Components,testwidth,testheight, "marketCap")
let result = GetPivotTreeMap(cac40Components,testwidth,testheight, "marketCap", "size")
console.log(result)

// *****WIDTH + HEIGHT***** //
 
// const frame=document.querySelector("div.frame")
// frame.style.display = "inline-block";
// frame.style.width = testwidth+ "px";
// frame.style.height = testheight+ "px";
 
// result.forEach(item => {
//     const tempDiv = document.createElement("div")
//     const newContent = document.createTextNode(item["symbol"])
//     tempDiv.appendChild(newContent)
//     tempDiv.style.display = "inline-block"
//     tempDiv.style.position = "absolute"
//     tempDiv.style.left = parseFloat(item["treemapSquarify"]["x"]).toFixed(2) + "px"
//     tempDiv.style.top = parseFloat(item["treemapSquarify"]["y"]).toFixed(2) + "px"
//     tempDiv.style.width = parseFloat(item["treemapSquarify"]["width"]).toFixed(2) + "px"
//     tempDiv.style.height = parseFloat(item["treemapSquarify"]["height"]).toFixed(2) + "px"
//     // tempDiv.style.border = "solid 1px black"
//     tempDiv.style.backgroundColor = "#" + ((1 << 24) * Math.random() | 0).toString(16).padStart(6, "0")
//     frame.insertAdjacentElement("beforeend",tempDiv)
// });
 
// *****CANVAS***** //
 
// function draw() {
//     const frame = document.querySelector("canvas#frame")
//     if (frame.getContext) {
//       const ctx = frame.getContext("2d");
//       result.forEach(item => {
//         ctx.fillStyle = "#" + ((1 << 24) * Math.random() | 0).toString(16).padStart(6, "0")
//         ctx.fillRect(item.treemapSquarify.x,item.treemapSquarify.y,item.treemapSquarify.width,item.treemapSquarify.height)
//         ctx.fillStyle = "#000000"
//         ctx.fillText(item.symbol,item.treemapSquarify.x,item.treemapSquarify.y+10)
//       });
//     }
//   }
 
// window.addEventListener("load", draw);
 
// *****SVG******
// const frame=document.querySelector("div.frame")
// let svg = document.createElementNS("http://www.w3.org/2000/svg", "svg")
// svg.setAttribute("width", testwidth);
// svg.setAttribute("height", testheight);
 
// result.forEach(item => {
//     let rect = document.createElementNS("http://www.w3.org/2000/svg", "rect");
 
//     rect.setAttribute("x", item.treemapSquarify.x);
//     rect.setAttribute("y", item.treemapSquarify.y);
//     rect.setAttribute("width", item.treemapSquarify.width);
//     rect.setAttribute("height", item.treemapSquarify.height);
//     rect.setAttribute("fill", "#" + ((1 << 24) * Math.random() | 0).toString(16).padStart(6, "0"));
 
//     let text = document.createElementNS("http://www.w3.org/2000/svg", "text");
//     let newContent = document.createTextNode(item["symbol"])
//     text.setAttribute("x", item.treemapSquarify.x+(item.treemapSquarify.width/2));
//     text.setAttribute("y", item.treemapSquarify.y+(item.treemapSquarify.height/2));
//     text.setAttribute("text-anchor", "middle");
//     text.setAttribute("font-size", "2rem")
 
//     text.setAttribute("dominant-baseline", "middle")
   
//     text.setAttribute("fill", "#000000");
//     text.appendChild(newContent)
 
//     svg.appendChild(rect)
//     svg.appendChild(text)
 
//     frame.appendChild(svg)
// });
