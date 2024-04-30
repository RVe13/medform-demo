import { View, Text, TouchableOpacity } from "react-native";

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
        <Text style={styles.title}>{cardData.title}</Text>
        <Text style={styles.description}>{cardData.description}</Text>
        <Text style={styles.date}>● {formattedDate}</Text>
        {/* Add more blog content here as needed */}
      </View>
    </TouchableOpacity>
  );
};

const styles = {
  cardContainer: {
    padding: 16,
    borderWidth: 1,
    borderColor: "#ccc",
    borderRadius: 8,
    marginBottom: 16,
    backgroundColor: "#ffffff",
  },
  title: {
    fontSize: 18,
    fontWeight: "bold",
  },
  description: {
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
