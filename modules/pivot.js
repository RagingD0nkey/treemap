function GetPivotTreeMap(data, width, height, keyData = "value", pivotType = "size"){
 
    function CheckArguments(data, width, height, keyData, pivotType){
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
        if (pivotType!== "size" && pivotType!== "middle"){
            throw new Error('Pivot Treemap cannot accept a type other than SIZE or MIDDLE');
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

    let validatedData=CheckArguments(data, width, height, keyData, pivotType) // Check validity of arguments
    let scaledData = ScaleData(validatedData, width, height, keyData) // Scale data based on original rectangle dimensions
    const ORIG_WIDTH = width;
    const ORIG_HEIGHT = height;

    return scaledData;
}


export { GetPivotTreeMap };