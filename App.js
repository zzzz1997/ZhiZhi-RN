import { StackNavigator } from 'react-navigation'
import SplashScreen from "./js/screen/SplashScreen";
import MainScreen from "./js/screen/MainScreen";
import StartUp from "./js/utils/StartUp";
import SearchScreen from "./js/screen/SearchScreen";

const App = StackNavigator({
    StartUp: StartUp,
    SplashScreen: SplashScreen,
    MainScreen: MainScreen,
    SearchScreen: SearchScreen
});

export default App;