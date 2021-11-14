import { Grid } from "@mui/material";
import ItemCard from "./itemCard";

export default function ItemList({items}) {

    let bufferList = []
    const quantityList = []

    items.forEach(item => {
        const itemInfo = {name: item.item.name, level: item.item.level, stat: item.item.stat, type: item.item.type, value: item.item.value}
        if(bufferList.length) {
            let isDuplicate = false;
            bufferList.forEach(bufferitem => {
                if(JSON.stringify(itemInfo) === bufferitem) {
                    isDuplicate = true;
                }
            })
            if(isDuplicate) {
                console.log(bufferList)
                const index = bufferList.indexOf(JSON.stringify(itemInfo))
                console.log(index)
                quantityList[index].quantity += 1;
            }
            else {
                bufferList.push(JSON.stringify(itemInfo))
                let quantityObject = {...itemInfo}
                quantityObject.quantity = 1;
                quantityList.push(quantityObject)
            }
        }
        else {
            bufferList.push(JSON.stringify(itemInfo))
            let quantityObject = {...itemInfo}
            quantityObject.quantity = 1;
            quantityList.push(quantityObject)
        }
    })

    return(
        <Grid container spacing={2}>
            {quantityList.length ? 
            quantityList.map(item => {
                return(
                    <ItemCard item={item} />
                )
            }) : null}

        </Grid>
    )
}