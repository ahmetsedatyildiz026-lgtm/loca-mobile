// LOCA - React Navigation Setup
import React from 'react';
import { NavigationContainer } from '@react-navigation/native';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';

// Screens
import { HomeScreen } from '../screens/HomeScreen';
import { PlaceDetailScreen } from '../screens/PlaceDetailScreen';

// Types
import { RootStackParamList } from '../types';
import { THEME_COLORS, DESIGN_TOKENS } from '../types';

const Stack = createNativeStackNavigator<RootStackParamList>();
const Tab = createBottomTabNavigator();

// Stack Navigator for Places
const PlacesStackNavigator = () => {
  return (
    <Stack.Navigator
      screenOptions={{
        headerStyle: {
          backgroundColor: THEME_COLORS.primary,
        },
        headerTintColor: THEME_COLORS.surface,
        headerTitleStyle: {
          fontWeight: 'bold',
        },
        headerShadowVisible: false,
      }}
    >
      <Stack.Screen 
        name="Home" 
        component={HomeScreen}
        options={{ headerShown: false }}
      />
      <Stack.Screen 
        name="PlaceDetail" 
        component={PlaceDetailScreen}
        options={{ 
          title: 'Mekan Detayı',
          headerBackTitle: 'Geri'
        }}
      />
    </Stack.Navigator>
  );
};

// Tab Navigator (Future expansion için)
const TabNavigator = () => {
  return (
    <Tab.Navigator
      screenOptions={{
        tabBarStyle: {
          backgroundColor: THEME_COLORS.surface,
          borderTopColor: THEME_COLORS.background,
          borderTopWidth: 1,
          paddingTop: DESIGN_TOKENS.spacing.xs,
          paddingBottom: DESIGN_TOKENS.spacing.sm,
          height: 60,
        },
        tabBarActiveTintColor: THEME_COLORS.primary,
        tabBarInactiveTintColor: THEME_COLORS.textSecondary,
        tabBarLabelStyle: {
          fontSize: 12,
          fontWeight: '600',
        },
        headerShown: false,
      }}
    >
      <Tab.Screen 
        name="Places" 
        component={PlacesStackNavigator}
        options={{
          tabBarLabel: 'Keşfet',
          tabBarIcon: ({ color }) => (
            <TabIcon icon="🏪" color={color} />
          ),
        }}
      />
      
      {/* Future tabs can be added here */}
      {/* 
      <Tab.Screen 
        name="Favorites" 
        component={FavoritesScreen}
        options={{
          tabBarLabel: 'Favoriler',
          tabBarIcon: ({ color }) => (
            <TabIcon icon="❤️" color={color} />
          ),
        }}
      />
      
      <Tab.Screen 
        name="Map" 
        component={MapScreen}
        options={{
          tabBarLabel: 'Harita',
          tabBarIcon: ({ color }) => (
            <TabIcon icon="🗺️" color={color} />
          ),
        }}
      />
      
      <Tab.Screen 
        name="Profile" 
        component={ProfileScreen}
        options={{
          tabBarLabel: 'Profil',
          tabBarIcon: ({ color }) => (
            <TabIcon icon="👤" color={color} />
          ),
        }}
      />
      */}
    </Tab.Navigator>
  );
};

// Tab Icon Component
interface TabIconProps {
  icon: string;
  color: string;
}

const TabIcon: React.FC<TabIconProps> = ({ icon, color }) => (
  <span style={{ fontSize: 24, color }}>{icon}</span>
);

// Main App Navigator
export const AppNavigator: React.FC = () => {
  return (
    <NavigationContainer
      theme={{
        dark: false,
        colors: {
          primary: THEME_COLORS.primary,
          background: THEME_COLORS.background,
          card: THEME_COLORS.surface,
          text: THEME_COLORS.textPrimary,
          border: THEME_COLORS.background,
          notification: THEME_COLORS.error,
        },
      }}
    >
      <TabNavigator />
    </NavigationContainer>
  );
};