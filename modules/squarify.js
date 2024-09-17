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
            let side1 = sumData/Math.min(ratioWidth,ratioHeight)
            let side2 = item["treemapSquarify"]["area"]/side1
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

export { GetSquarifyTreeMap };