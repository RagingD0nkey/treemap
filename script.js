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

function GetSquarifyTreeMap(data, width, height, keyData = "value"){
 
    function CheckArguments(data, width, height, keyData){
        if (width<0 || typeof(width)!== "number"){
            throw new Error('Invalid or missing treemap width');
        }
        if (height<0 || typeof(height)!== "number"){
            throw new Error('Invalid or missing treemap height');
        }
        if (!Array.isArray(data)){
            throw new Error('Please pass treemap data as an Array');
        }
        if (data.length === 0){
            throw new Error('Treemap data cannot be an empty Array');
        }
   
        let cleanData = [];
        data.forEach(item => {
            if (typeof(item)==="number"){
                cleanData.push({
                    [keyData]: item,
                    ["treemapSquarify"]:{
                        area:0,
                        width:0,
                        height:0,
                        x:0,
                        y:0
                    }
                })
            }else if (typeof(item)==="object"){
                if (item === null){
                    throw new Error("Treemap data cannot be null");
                }
                if (!item.hasOwnProperty(keyData) || typeof(item[keyData])!=="number"){
                    throw new Error("Treemap data has an incorrect or missing property name.");
                }
                item["treemapSquarify"]={
                    area:0,
                    width:0,
                    height:0,
                    x:0,
                    y:0
                }
                cleanData.push(item)
            }
        });
   
        return cleanData;
    }
   
    function ScaleData(data, width, height,keyData){
        const totalArea = height * width;
        const dataArea = data.reduce((sum,item)=> sum + item[keyData],0);
   
        data.forEach(item => {
            item["treemapSquarify"]["area"]= item[keyData]*totalArea/dataArea;
        });
   
        return data;
    }
 
    function GetRatio(data, ratioWidth, ratioHeight){
        let ratio =0;
        let sumData = data.reduce((sum,item)=> sum + item["treemapSquarify"]["area"],0);
       
        data.forEach((item) => {
            side1 = sumData/Math.min(ratioWidth,ratioHeight)
            side2 = item["treemapSquarify"]["area"]/side1
            ratio = Math.max(ratio,side1/side2,side2/side1)
        });
   
        return ratio
    }
 
    function publishFinalData(data){
        let usedHeight = 0;
        let usedWidth = 0;
        let xWidth = ORIG_WIDTH-remainWidth; // Get the current used width of all previous items
        let yHeight = ORIG_HEIGHT-remainHeight; // Get the current used height of all previous items
        let sumSquarifyArea = data.reduce((sum,item)=> sum + item["treemapSquarify"]["area"],0);
        if (remainHeight<remainWidth){
            usedWidth= sumSquarifyArea/remainHeight;
            data.forEach(item => {
                item["treemapSquarify"]["width"] = sumSquarifyArea/remainHeight;
                item["treemapSquarify"]["height"]=item["treemapSquarify"]["area"]/item["treemapSquarify"]["width"];
                item["treemapSquarify"]["x"]= xWidth;
                item["treemapSquarify"]["y"]= yHeight;
                yHeight+=item["treemapSquarify"]["height"]; // Increment Y coordonates by the height of current item
                finalData.push(item);
               
            });
            xWidth += usedWidth; // Increment X coordonates by the COMMON width of items
        }else{
            usedHeight = sumSquarifyArea/remainWidth;
            data.forEach(item => {
                item["treemapSquarify"]["height"] = sumSquarifyArea/remainWidth;
                item["treemapSquarify"]["width"]=item["treemapSquarify"]["area"]/item["treemapSquarify"]["height"];
                item["treemapSquarify"]["x"]= xWidth;
                item["treemapSquarify"]["y"]= yHeight;
                xWidth+=item["treemapSquarify"]["width"]; // Increment X coordonates by the width of current item
                finalData.push(item);
            });
            yHeight += usedHeight; // Increment Y coordonates by the COMMON height of items
        }
        remainHeight-=usedHeight;
        remainWidth-=usedWidth;
    }
 
    let validatedData=CheckArguments(data, width, height, keyData) // Check validity of arguments
    let scaledData = ScaleData(validatedData, width, height, keyData) // Scale data based on original rectangle dimensions
    let sortedData = scaledData.slice().sort((a,b)=> b["treemapSquarify"]["area"] - a["treemapSquarify"]["area"]) // Sort data in ascending order
 
    const ORIG_WIDTH = width;
    const ORIG_HEIGHT = height;
    let remainWidth = ORIG_WIDTH;
    let remainHeight = ORIG_HEIGHT;
    let finalData =[]; // Initialize empty array for finalized data
    let j=0;
    let k=0;
    while (true){
 
        if (sortedData.slice(j).length===1){
 
            publishFinalData(sortedData.slice(j))
            break;
 
        }
        testdata = sortedData.slice(j,j+k+1);
        testdata2=sortedData.slice(j,j+k+2);
        if (GetRatio(sortedData.slice(j,j+k+1),remainWidth,remainHeight)<GetRatio(sortedData.slice(j,j+k+2),remainWidth,remainHeight)){
 
            publishFinalData(sortedData.slice(j,j+k+1))
            j=j+k+1;
            k=0;
 
        }else{
            if ((k+2)>=sortedData.slice(j).length){
 
                publishFinalData(sortedData.slice(j,j+k+2))
                break;
 
            }else{
                k++;
            }
        }
    }
   
    return finalData;
}

function GetPivotTreemap(data,width,height,keyData = "value",pivot ="size"){

    function CheckArguments(data, width, height, keyData){
        if (width<0 || typeof(width)!== "number"){
            throw new Error('Invalid or missing treemap width');
        }
        if (height<0 || typeof(height)!== "number"){
            throw new Error('Invalid or missing treemap height');
        }
        if (!Array.isArray(data)){
            throw new Error('Please pass treemap data as an Array');
        }
        if (data.length === 0){
            throw new Error('Treemap data cannot be an empty Array');
        }
   
        let cleanData = [];
        data.forEach(item => {
            if (typeof(item)==="number"){
                cleanData.push({
                    [keyData]: item,
                    ["treemapPivot"]:{
                        area:0,
                        width:0,
                        height:0,
                        x:0,
                        y:0
                    }
                })
            }else if (typeof(item)==="object"){
                if (item === null){
                    throw new Error("Treemap data cannot be null");
                }
                if (!item.hasOwnProperty(keyData) || typeof(item[keyData])!=="number"){
                    throw new Error("Treemap data has an incorrect or missing property name.");
                }
                item["treemapPivot"]={
                    area:0,
                    width:0,
                    height:0,
                    x:0,
                    y:0
                }
                cleanData.push(item)
            }
        });
   
        return cleanData;
    }

    function ScaleData(data, width, height,keyData){
        const totalArea = height * width;
        const dataArea = data.reduce((sum,item)=> sum + item[keyData],0);
   
        data.forEach(item => {
            item["treemapPivot"]["area"]= item[keyData]*totalArea/dataArea;
        });
   
        return data;
    }

    let validatedData=CheckArguments(data, width, height, keyData) // Check validity of arguments
    let scaledData = ScaleData(validatedData, width, height, keyData) // Scale data based on original rectangle dimensions

    

}

let testwidth = 1800;
let testheight = 800;
let result = GetSquarifyTreeMap(cac40Components,testwidth,testheight, "marketCap")

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
const frame=document.querySelector("div.frame")
let svg = document.createElementNS("http://www.w3.org/2000/svg", "svg")
svg.setAttribute("width", testwidth);
svg.setAttribute("height", testheight);
 
result.forEach(item => {
    let rect = document.createElementNS("http://www.w3.org/2000/svg", "rect");
 
    rect.setAttribute("x", item.treemapSquarify.x);
    rect.setAttribute("y", item.treemapSquarify.y);
    rect.setAttribute("width", item.treemapSquarify.width);
    rect.setAttribute("height", item.treemapSquarify.height);
    rect.setAttribute("fill", "#" + ((1 << 24) * Math.random() | 0).toString(16).padStart(6, "0"));
 
    let text = document.createElementNS("http://www.w3.org/2000/svg", "text");
    let newContent = document.createTextNode(item["symbol"])
    text.setAttribute("x", item.treemapSquarify.x+(item.treemapSquarify.width/2));
    text.setAttribute("y", item.treemapSquarify.y+(item.treemapSquarify.height/2));
    text.setAttribute("text-anchor", "middle");
    text.setAttribute("font-size", "2rem")
 
    text.setAttribute("dominant-baseline", "middle")
   
    text.setAttribute("fill", "#000000");
    text.appendChild(newContent)
 
    svg.appendChild(rect)
    svg.appendChild(text)
 
    frame.appendChild(svg)
});