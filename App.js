import React from 'react';
import {NavigationContainer} from '@react-navigation/native';
import {createStackNavigator} from '@react-navigation/stack';
import {isAuthenticated} from './src/services/AuthService';
import LoginScreen from './src/screens/LoginScreen';
import DashboardScreen from './src/screens/DashboardScreen';
import AddReadingScreen from './src/screens/AddReadingScreen';
import ReportsScreen from './src/screens/ReportsScreen';

const Stack = createStackNavigator();

const App = () => {
  const [isLoading, setIsLoading] = React.useState(true);
  const [isAuth, setIsAuth] = React.useState(false);

  React.useEffect(() => {
    isAuthenticated().then(auth => {
      setIsAuth(auth);
      setIsLoading(false);
    });
  }, []);

  if (isLoading) return null;

  return (
    <NavigationContainer>
      <Stack.Navigator initialRouteName={isAuth ? 'Dashboard' : 'Login'}>
        <Stack.Screen name="Login" component={LoginScreen} options={{headerShown: false}} />
        <Stack.Screen name="Dashboard" component={DashboardScreen} />
        <Stack.Screen name="AddReading" component={AddReadingScreen} />
        <Stack.Screen name="Reports" component={ReportsScreen} />
      </Stack.Navigator>
    </NavigationContainer>
  );
};

export default App;
