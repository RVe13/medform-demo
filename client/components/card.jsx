import { View, Text, TouchableOpacity } from 'react-native';

const Card = ({cardData})=>{
    return (
    <TouchableOpacity >
        <View style={styles.cardContainer}>
        <Text style={styles.title}>{cardData.title}</Text> 
        <Text style={styles.description}>{cardData.description}</Text>
        {/* Add more blog content here as needed */}
      </View>
    </TouchableOpacity>
  );
};

const styles = {
  cardContainer: {
    padding: 16,
    borderWidth: 1,
    borderColor: '#ccc',
    borderRadius: 8,
    marginBottom: 16,
  },
  title: {
    fontSize: 18,
    fontWeight: 'bold',
  },
  author: {
    fontSize: 14,
    color: 'gray',
  },
};



export default Card
