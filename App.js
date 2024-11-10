import WelCome from "./components/WelCome";
import BikeList from "./components/BikeList";
import BikeDetail from "./components/BikeDetail";
import AddProductScreen from "./components/AddProductScreen";
import { NavigationContainer } from "@react-navigation/native";
import { createNativeStackNavigator } from "@react-navigation/native-stack";
import { Provider } from "react-redux";
import store from "./store/store";
const Stack = createNativeStackNavigator();
export default function App() {
  return (
    <Provider store={store}>
      <NavigationContainer>
        <Stack.Navigator>
          <Stack.Screen name="Home" component={WelCome} />
          <Stack.Screen name="BikeList" component={BikeList} />
          <Stack.Screen name="AddProductScreen" component={AddProductScreen} />
          <Stack.Screen name="BikeDetail" component={BikeDetail} />
        </Stack.Navigator>
      </NavigationContainer>
    </Provider>
  );
}
