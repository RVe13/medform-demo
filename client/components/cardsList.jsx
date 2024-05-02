import { Dimensions, FlatList, Text, View } from "react-native";
import Card from "./card";
import { GestureHandlerRootView, ScrollView } from "react-native-gesture-handler";

const CardsList = ({ cardDataList }) => {
  return (
    <>
      {cardDataList.length === 0 && (
        <Text style={{ paddingHorizontal: 20 }}>Empty.</Text>
      )}
      <FlatList
      contentContainerStyle={{
          width: Dimensions.get("window").width,
              padding: 20,
              flexDirection: "column",
              justifyContent: "flex-start",
              alignItems: "center",
              gap: 10,
      }}
        data={cardDataList}
        renderItem={({ item }) => <Card cardData={item} />}
      />
    </>
  );
};

export default CardsList;
