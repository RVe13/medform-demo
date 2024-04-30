import { Dimensions, FlatList, Text } from "react-native";
import Card from "./card";

const CardsList = ({ cardDataList }) => {
  return (
    <>
      {cardDataList.length === 0 && (
        <Text style={{ paddingHorizontal: 20 }}>Empty.</Text>
      )}
      <FlatList
        style={{
          width: Dimensions.get("window").width,
          paddingHorizontal: 10,
        }}
        data={cardDataList}
        keyExtractor={(item) => item._id.toString()}
        renderItem={({ item }) => <Card cardData={item} />}
      />
    </>
  );
};

export default CardsList;
