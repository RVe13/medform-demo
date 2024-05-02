import { View, Text, TouchableOpacity, Image } from "react-native";

const Card = ({ cardData }) => {
  const datePosted = new Date(cardData.createdAt);
  const formattedDate = datePosted.toLocaleDateString("en-US", {
    year: "numeric",
    month: "2-digit",
    day: "2-digit",
  });
  return (
      <TouchableOpacity>
      <View style={styles.cardContainer}>
      <View>
      <Image source={{ uri: cardData.image }} style={{ width: 130, height: 130, borderRadius: 10, }} />
      </View>
      <View style={styles.infoContainer}>
      <Text style={styles.title}>{cardData.title}</Text>
      <Text style={styles.description} lineBreakMode="middle" >{cardData.description}</Text>
      <Text style={styles.date}>● {formattedDate}</Text>
      {/* Add more blog content here as needed */}
      </View>
      </View>
      </TouchableOpacity>
  );
};

const styles = {
  cardContainer: {
      elevation: 3,
      overflow:"hidden",
      display: "flex",
      flexDirection: "row",
      jusifyContent: "center",
      alignItems: "center",
      gap: 20,
    padding: 16,
    borderRadius: 8,
    backgroundColor: "#ffffff",
      minHeight: 200,
  },
    infoContainer:{
        display: "flex",
        flexDirection: "column",
        justifyContent: "center",
        alignItems: "start",
        gap: 10
    },
  title: {
    fontSize: 18,
    fontWeight: "bold",
  },
  description: {
      width: 200,
    maxHeight: 55,
    fontSize: 14,
    color: "gray",
  },
  date: {
    fontSize: 14,
    color: "gray",
  },
};

export default Card;
