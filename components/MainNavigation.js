import React from 'react'
import { NavigationContainer } from '@react-navigation/native'
import { createStackNavigator } from '@react-navigation/stack'
import DeckDetail from './DeckDetail'
import TabNav from './TabNav'
import AddCard from './AddCard'
import Quiz from './Quiz'

const Stack = createStackNavigator();
  
const MainNavigation = () => {
    return ( 
        <NavigationContainer>
            <Stack.Navigator>
                <Stack.Screen name="Decks" component={TabNav} options={{ headerTitleStyle: { alignSelf: 'center' }}} />
                <Stack.Screen name="DeckDetail" component={DeckDetail} options={{ headerTitleStyle: { alignSelf: 'center' }}}/>
                <Stack.Screen name="AddCard" component={AddCard} headerLayoutPreset="center" options={{ headerTitleStyle: { alignSelf: 'center' }}} />
                <Stack.Screen name="Quiz" component={Quiz} headerLayoutPreset="center" options={{ headerTitleStyle: { alignSelf: 'center' }}} />
            </Stack.Navigator>
        </NavigationContainer>
     );
}
 
export default MainNavigation;