import { StackNavigator } from 'react-navigation'
import WelcomeScreen from "./js/screen/WelcomeScreen";
import SplashScreen from "./js/screen/SplashScreen";
import SearchScreen from "./js/screen/SearchScreen";
import Tabs from "./js/screen/tabs/Tabs";

const App = StackNavigator({
    SplashScreen: SplashScreen,
    WelcomeScreen: WelcomeScreen,
    Tabs: Tabs,
    SearchScreen: SearchScreen
});

export default App;