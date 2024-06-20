import * as React from 'react';
import {StyleSheet, SafeAreaView} from 'react-native';
import {NavigationContainer} from '@react-navigation/native';
import {createBottomTabNavigator} from '@react-navigation/bottom-tabs';
import {createStackNavigator} from '@react-navigation/stack';
import {HeaderBackButton} from '@react-navigation/elements';
import DashboardScreen from './src/Components/Dashboard';
import ProfileScreen from './src/Components/ProfileScreen';
import MarketDataScreen from './src/Components/MarketDataScreen';
import {AppProvider} from './src/Context/AppContext';

type RootStackParamList = {
  Dashboard: undefined;
  Profile: undefined;
  MarketData: undefined;
};

const DashboardStack = createStackNavigator<RootStackParamList>();
const ProfileStack = createStackNavigator<RootStackParamList>();
const MarketStack = createStackNavigator<RootStackParamList>();

function DashboardStackScreen() {
  return (
    <DashboardStack.Navigator
      screenOptions={{
        headerTitleAlign: 'center',
        headerTintColor: 'blue',
      }}>
      <DashboardStack.Screen name="Dashboard" component={DashboardScreen} />
    </DashboardStack.Navigator>
  );
}

function ProfileStackScreen() {
  return (
    <ProfileStack.Navigator
      screenOptions={{
        headerTitleAlign: 'center',
        headerTintColor: 'blue',
      }}>
      <ProfileStack.Screen
        name="Profile"
        component={ProfileScreen}
        options={({navigation}) => ({
          headerLeft: () => (
            <HeaderBackButton onPress={() => navigation.goBack()} />
          ),
          headerShown: true,
        })}
      />
    </ProfileStack.Navigator>
  );
}

function MarketStackScreen() {
  return (
    <MarketStack.Navigator
      screenOptions={{
        headerTitleAlign: 'center',
        headerTintColor: 'blue',
      }}>
      <MarketStack.Screen
        name="MarketData"
        component={MarketDataScreen}
        options={({navigation}) => ({
          headerLeft: () => (
            <HeaderBackButton onPress={() => navigation.goBack()} />
          ),
          headerShown: true,
        })}
      />
    </MarketStack.Navigator>
  );
}

const Tab = createBottomTabNavigator();

function MyTabs() {
  return (
    <Tab.Navigator
      screenOptions={{
        headerShown: false,
        tabBarLabelStyle: {fontSize: 20, marginBottom: 10},
      }}>
      <Tab.Screen
        name="DashboardStack"
        component={DashboardStackScreen}
        options={{tabBarIcon: () => null, tabBarLabel: 'Dashboard'}}
      />
      <Tab.Screen
        name="ProfileStack"
        component={ProfileStackScreen}
        options={{tabBarIcon: () => null, tabBarLabel: 'Profile'}}
      />
      <Tab.Screen
        name="MarketDataStack"
        component={MarketStackScreen}
        options={{tabBarIcon: () => null, tabBarLabel: 'Market data'}}
      />
    </Tab.Navigator>
  );
}

// Main Stack Navigator
const Stack = createStackNavigator();

export default function App() {
  return (
    <SafeAreaView style={{flex: 1}}>
      <AppProvider>
        <NavigationContainer>
          <Stack.Navigator>
            <Stack.Screen
              name="Home"
              component={MyTabs}
              options={{headerShown: false}}
            />
          </Stack.Navigator>
        </NavigationContainer>
      </AppProvider>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  dashboardTitle: {
    fontWeight: 'bold',
    color: '#fff',
    fontSize: 20,
    marginBottom: 5,
  },
  input: {
    height: 40,
    margin: 12,
    borderWidth: 1,
    padding: 10,
    backgroundColor: '#fff',
    borderRadius: 7,
  },
});
