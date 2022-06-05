export const checkNullAddSign = (item: number, sign: any): string => {
    let itemName = "";
    if (item == null || item === undefined) {
      itemName = item;
    }
    else  {
      itemName += item + sign;
    }      
    return itemName;
}
