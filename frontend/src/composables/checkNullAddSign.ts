export const checkNullAddSign = (item: number, sign: any): string => {
    let itemName = "";
    if (item == null) {
      itemName = item;
    }
    else  {
      itemName += item + sign;
    }      
    return itemName;
}