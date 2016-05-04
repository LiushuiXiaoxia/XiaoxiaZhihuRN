'use strict';

import React, {
    Text,
    View
} from 'react-native';

class MyAwesomeApp extends React.Component {
    render() {
        return (
            <View style={styles.container}>
                <Text style={styles.hello}>Hello, World!!!</Text>
            </View>
        )
    }
}
var styles = React.StyleSheet.create({
    container: {
        flex: 1,
        justifyContent: 'center',
    },
    hello: {
        fontSize: 20,
        textAlign: 'center',
        margin: 10,
    },
});

React.AppRegistry.registerComponent('MyAwesomeApp', () => MyAwesomeApp);