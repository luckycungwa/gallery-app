import React, { useState, useEffect, useRef } from "react";
import { View, Text, TouchableOpacity, StyleSheet } from "react-native";
import { Camera, CameraType } from "expo-camera";
// handling saved image from the database
import { imageMetadata} from '..Database';

const CamScreen = ({ navigation }) => {
  const cameraRef = useRef(null);
  const [hasPermission, setHasPermission] = useState(null);
  const [type, setType] = useState(Camera.Constants.Type.back);
  // control available cam
  const [permission, requestPermission] = Camera.useCameraPermissions();
  

  useEffect(() => {
    (async () => {
      const { status } = await Camera.requestPermissionsAsync();
      setHasPermission(status === "granted");
    })();
  }, []);

  // CAPTURE & SAVE IMAGE WITH ITS MTADATA
  const takePicture = async () => {
    if (cameraRef.current) {
      const photo = await cameraRef.current.takePictureAsync();
      
      // nAVIGATE  TO GALLERY TO VIEW IMAGES
      navigation.navigate("GalleryScreen", { image: photo });
      console.log("Picture Taken");
    }
  };

  if (hasPermission === null) {
    console.log("Cam is being used");
    return <View />;
    
  }

  if (hasPermission === false) {
    console.log("Cam access denied");
    return <Text>No access to camera</Text>;
  }

  // Call & save image data from db
  imageMetadata(imagePath, latitude, longitude, captureDate)
  .then(() => {
    console.log('Image metadata saved');
  })
  .catch((error) => {
    console.error('Error saving image metadata:', error);
  });

  // FUNCTIONS FOR OTHER FEATURE TO - FLIP & VIEW
  const toggleCameraType = () => {
    setType(current => (current === CameraType.back ? CameraType.front : CameraType.back));
  }

  return (
    <View style={styles.container}>
      <Camera style={styles.camera} type={type} ref={cameraRef}>
        <View style={styles.buttonContainer}>
        {/* FLIP RARE & FROM CAM */}
         <TouchableOpacity style={styles.galleryIcon} onPress={takePicture}>
            
          </TouchableOpacity>
          {/* cAPTURE iMAGE */}
          <TouchableOpacity style={styles.camBtn} onPress={takePicture}>
            
          </TouchableOpacity>
         {/* NAV TO GALLERY */}
          <TouchableOpacity style={styles.flipToggle} onPress={toggleCameraType}>
            
          </TouchableOpacity>
        </View>
      </Camera>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    flexDirection: "column",
  },
  camera: {
    flex: 1,
  },
  buttonContainer: {
    flex: 1,
    width: "auto",
    height: "100%",
    display: "flex",
    justifyContent: "space-between",
    backgroundColor: "transparent",
    flexDirection: "row",
    alignItems: "center",
    gap: 50,
  },
  camBtn: {
    width: 60,
    height: 60,

    alignSelf: "flex-end",
    alignItems: "center",
    // backgroundColor: "#fbf418",
    padding: 10,
    borderWidth: 4,
    borderColor: "#ffdd00",
    borderRadius: 50,

  },
  buttonText: {
    fontSize: 18,
    color: "white",
  },
  galleryIcon: {
    
    width: 40,
    height: 40,
    borderWidth: 4,
    borderColor: "#ff009d",
    borderRadius: 50,
  },
  flipToggle: {
    width: 40,
    height: 40,
    borderWidth: 4,
    borderColor: "#00d5ff",
    borderRadius: 50,
  },
  CamFeatures: {
    
  },
});

export default CamScreen;
