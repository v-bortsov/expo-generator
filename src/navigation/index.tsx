import { DarkTheme, DefaultTheme, NavigationContainer } from '@react-navigation/native';
import { createStackNavigator } from '@react-navigation/stack';
import { createDrawerNavigator } from '@react-navigation/drawer';
import * as React from 'react';
import { ColorSchemeName, useWindowDimensions } from 'react-native';
import { RootStackParamList } from '../../types';
import NotFoundScreen from '../screens/NotFoundScreen'; 
import BottomTabNavigator from './BottomTabNavigator';
import LinkingConfiguration from './LinkingConfiguration';
import TabOneScreen from '../screens/TabOneScreen';
import Colors from '../constants/Colors'
import { MaterialIcons } from '@expo/vector-icons';
import { IconButton, Icon } from 'native-base';
import { AppBar } from '../components/Complex';
import { backgroundColor } from 'styled-system';

export default function Navigation({ colorScheme}: { colorScheme: ColorSchemeName}) {
  const colors = {
    background: Colors.dark.background,
    text: Colors.dark.text,
    border: Colors.dark.background,
    primary: Colors.dark.text,
    card: Colors.dark.background,
    notification: Colors.dark.text,
  }
  return (
    <NavigationContainer
      linking={LinkingConfiguration}
      theme={colorScheme === 'dark' ?   {
        dark: true,
        colors
      } : DefaultTheme}>
      {/* <StackNavigator/> */}
      <RootNavigator />
    </NavigationContainer>
  );
}

// A root stack navigator is often used for displaying modals on top of all other content
// Read more here: https://reactnavigation.org/docs/modal
// const Stack = createStackNavigator<RootStackParamList>();

// function StackNavigator() {
//   return (
//     <Stack.Navigator screenOptions={{ headerShown: false }}>
//       <Stack.Screen name="Home" component={TabOneScreen} options={{ title: 'My profile' }} />
//       <Stack.Screen name="NotFound" component={NotFoundScreen} options={{ title: 'Oops!' }} />
//     </Stack.Navigator>
//   );
// }
const Drawer = createDrawerNavigator<RootStackParamList>();
function RootNavigator() {
  const dimensions = useWindowDimensions();
  return (
    <Drawer.Navigator
      initialRouteName="Home"
      screenOptions={{
        drawerType: dimensions.width >= 768 ? 'permanent' : 'slide',
        drawerActiveTintColor: '#fff',
        drawerIcon: () => <IconButton icon={<Icon size="sm" as={<MaterialIcons name='arrow-back' />} color="white" />} />,
        header: ({ navigation, route, options }: any) =>  <AppBar {...{navigation}} />,
        // header: ()=> <MaterialIcons name='arrow-back' color="red"/>,
        headerStyle: {backgroundColor: '#000'}
      }}>
      <Drawer.Screen key={'home'} name="Home" component={TabOneScreen} />
      <Drawer.Screen key={'notifications'} name="Notifications" component={NotFoundScreen} />
    </Drawer.Navigator>
  );
}
