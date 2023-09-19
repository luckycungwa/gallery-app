import React, { useEffect, useState } from "react";
import { View, FlatList, Image, TouchableOpacity, Text, StyleSheet } from "react-native";
import { Card } from "react-native-paper"; // replace with my css if iyabheda

const GalleryScreen = () => {
  const [images, setImages] = useState([]);

  useEffect(() => {
    // Fetch image metadata from SQLite database and update "images" state
    // You will implement this function to retrieve data from the database
    fetchImagesFromDatabase();
  }, []);

  // Render each image from db
  const renderImageItem = ({ item }) => (
    <TouchableOpacity onPress={() => openImageViewer(item)}>
      <Card style={styles.imageCard}>
        <Image source={{ uri: item.imagePath }} style={styles.image} />
      </Card>
    </TouchableOpacity>
  );

  // Function to open the image viewer for the selected image
  const openImageViewer = (imageData) => {
    // Implement navigation to the Image Viewer screen with "imageData"
    // For example, using React Navigation: navigation.navigate("ImageViewer", { image: imageData });
    navigation.navigate("GalleryScreen", { image: imageData });
  };

  return (
    <View style={styles.container}>
      <Text style={styles.header}>Image Gallery</Text>
      <FlatList
        data={images}
        keyExtractor={(item) => item.id.toString()} //identifier from your database
        renderItem={renderImageItem}
        numColumns={3} // Number of columns in the grid
      />
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 12,
  },
  header: {
    fontSize: 24,
    fontWeight: "bold",
    marginBottom: 16,
  },
  imageCard: {
    margin: 8,
    borderRadius: 8,
    overflow: "hidden",
    elevation: 4,
  },
  image: {
    width: 100,
    height: 100,
    resizeMode: "cover",
  },
  galleryContainer: {
    gap: 8,
    flexWrap: "wrap",
  }
});

export default GalleryScreen;
