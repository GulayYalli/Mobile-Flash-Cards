import React from 'react'
import FontAwesome from 'react-native-vector-icons/FontAwesome';
import { NavigationContainer } from '@react-navigation/native'
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs'
import DeckList from './DeckList'
import NewDeck from './NewDeck'

const Tab = createBottomTabNavigator() 

const TabNav = () => {
    return (           
        <Tab.Navigator screenOptions={({ route }) => ({
            tabBarIcon: ({ focused, color, size }) => {
                let iconName;
                if (route.name === 'Decks') {
                    iconName = 'list-alt'
                } else if (route.name === 'Add Deck') {
                    iconName = 'plus-square'
                }
                return <FontAwesome name={iconName} size={size} color={color} />;
            },
        })}
        tabBarOptions={{
            activeTintColor: '#4B0082',
            inactiveTintColor: 'grey',
        }}>
            <Tab.Screen name="Decks" component={DeckList} />
            <Tab.Screen name="Add Deck" component={NewDeck} />
        </Tab.Navigator> 
     );
}

export default TabNav;