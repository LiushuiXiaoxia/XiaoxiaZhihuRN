import React, {AppRegistry, Component, StyleSheet, Text, View, Image, TouchableHighlight} from "react-native";

var SettingItemView = React.createClass({
    render: function () {
        return (
            <View style={{padding:10,flexDirection:'row',alignItems:'center',backgroundColor:'#fff'}}>
                <Image source={this.props.icon} style={{width:20,height:20}}/>
                <Text style={{marginLeft:10,flex:1}}>{this.props.name}</Text>
                <Image source={require('image!ic_action_hint')} style={{width:8,height:13}}/>
            </View>
        );
    }
});

var Space10 = React.createClass({
    render: function () {
        return (
            <View style={{height:10}}/>
        );
    }
});

class Line extends React.Component {

    constructor(props:any) {
        super(props);
        this.state = {
            spaceLeft: 10,
            spaceRight: 10
        };
    }

    render() {
        var spaceLeft = this.props.spaceLeft;
        var spaceRight = this.props.spaceRight;
        return (
            <View style={{height:0.5, backgroundColor:'#ccc', marginLeft:spaceLeft, marginRight:spaceRight}}/>
        )
    }
}

module.exports = Line;