import { View, Text, TouchableOpacity, Image} from "react-native";

const Card = ({ cardData, onPress }) => {
  const datePosted = new Date(cardData.createdAt);
  const formattedDate = datePosted.toLocaleDateString("en-US", {
    year: "numeric",
    month: "2-digit",
    day: "2-digit",
  });

    //since only the error post contain grad am checking for grad if exists to apply the error card style else i apply the mediform style 
  return (
      <TouchableOpacity onPress={onPress}>
      <View style={styles.cardContainer}>
      {cardData.image && <View>
      <Image source={{ uri: cardData.image }} style={{ width: 130, height: 130, borderRadius: 10, }} />
      </View>}
      <View style={styles.infoContainer}>
      <Text style={cardData.grad ? styles.errorTitle : styles.title}>{cardData.title}</Text>
      <Text style={styles.description} lineBreakMode="middle" >{cardData.description}</Text>
      {cardData.errorNature &&(<>
      <Text style={styles.errorDescription}>Type d'erreur: {cardData.errorType}{"\nNature de l'erreur: "}{cardData.errorNature === "Autre" ? cardData.errorNatureDescription : cardData.errorNature }</Text>
      <Text style={styles.errorDescription}>Correction immediate: {cardData.correction}</Text>
      </>)}
      <Text style={styles.date}>● {formattedDate}</Text>
      {/* Add more blog content here as needed */}
      </View>
      </View>
      </TouchableOpacity>
  );
}

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
      height: 200,
      width: 382,
      position : "relative"
  },
    infoContainer:{
        display: "flex",
        flexDirection: "column",
        justifyContent: "center",
        alignItems: "start",
        gap: 10  
    },
  title: {
    width:200,
    fontSize: 15,
    fontWeight: "bold",
  },
    errorTitle:{
      width: 320,
    fontSize: 15,
    fontWeight: "bold",
    },
  description: {
      width: 200,
    maxHeight: 35,
    fontSize: 12,
    color: "gray",
  },
    errorDescription:{
    width: 300,
    maxHeight: 35,
    fontSize: 12,
    color: "gray",
    },
  date: {
    fontSize: 14,
    color: "gray",
  },
 deleteButton: {
     backgroundColor: '#FF0011', // Blue color
    height: 30,
    width:30,
    borderRadius:  50,
    alignItems: 'center',
    justifyContent: "center",
    position: 'absolute',
    bottom: 10,
    right: 10,

  },
 deleteButtonText: {
    color: '#fff',
      fontSize: 15,
  },
};

export default Card;
