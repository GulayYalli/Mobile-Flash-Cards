import React, { Component } from 'react'
import { createStore } from 'redux'
import { Provider } from 'react-redux'
import { View, StyleSheet, StatusBar } from "react-native"
import reducer from './reducers/index'
import middleware from './middleware/index'
import Constants from 'expo-constants'
import MainNavigation from './components/MainNavigation'
import { setLocalNotification } from './utils/helpers'

const store = createStore(reducer, middleware)

function FlashCardsStatusBar({backgroundColor, ...props}) {
  return (
    <View style={{backgroundColor, height: Constants.statusBarHeight }}>
      <StatusBar translucent backgroundColor={backgroundColor} {...props} />
    </View>
  )
}
class App extends Component {
  componentDidMount () {
    setLocalNotification()
  }
  render() { 
    return ( 
      <Provider store={store}>
          <View style={styles.appContainer}>
            <FlashCardsStatusBar backgroundColor='grey' barStyle='light-content' />
            <MainNavigation />
          </View>
      </Provider>
    )
  }
}

export default App;

const styles = StyleSheet.create({
  appContainer: {
      flex:1
  }
})