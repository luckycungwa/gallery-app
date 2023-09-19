import { createAppContainer } from 'react-navigation';
import { createStackNavigator } from 'react-navigation-stack';
import CameraScreen from '../CameraScreen';
import GalleryScreen from "../GalleryScreen";

const AppNavigator = createStackNavigator(
// necessary navigation screen  
    {
    Camera: CameraScreen,
    ImageViewer: GalleryScreen,
  },
  {
    initialRouteName: 'Camera', // Set the initial screen
    headerMode: 'none', // Hide nav header
  }
);

export default createAppContainer(AppNavigator);
