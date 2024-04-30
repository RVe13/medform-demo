import { Dimensions, FlatList } from "react-native";
import Card from "./card";

const CardsList = ({cardDataList})=>{
    return(
        <FlatList 
            style={
                {
                    width:Dimensions.get('window').width,
                    paddingHorizontal: 10,
                }
            }
            data={cardDataList}
            keyExtractor={item => item._id.toString()}
            renderItem={({item})=>(
                    <Card cardData={item} />
            )}
        />

    )

}

export default CardsList;
