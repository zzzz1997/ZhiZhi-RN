import { StackNavigator } from 'react-navigation'
import SplashScreen from "./js/screen/WelcomeScreen";
import StartUp from "./js/screen/StartUp";
import SearchScreen from "./js/screen/SearchScreen";
import Tabs from "./js/screen/tabs/Tabs";

const App = StackNavigator({
    StartUp: StartUp,
    SplashScreen: SplashScreen,
    Tabs: Tabs,
    SearchScreen: SearchScreen
});

export default App;