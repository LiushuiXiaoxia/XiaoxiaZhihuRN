'use strict';

import React, {Component} from "react";
import {Text, View, Image, TouchableHighlight} from "react-native";
import Line from "../widget/Line";
import AppLog from "../util/AppLog";

class ThemeListItem extends React.Component {

    onItemClick(theme) {
        AppLog.i("ListItem.onItemClick theme = " + theme.name);
        this.props.onItemClick(theme);
    }

    render() {
        var theme = this.props.theme;
        return (
            <TouchableHighlight onPress={()=>this.onItemClick(theme)}>
                <View style={{flex: 1, flexDirection: 'column', backgroundColor: 'white'}}>
                    <Text style={{flex: 1, margin: 15, color: '#333'}}>
                        {theme.name }
                    </Text>
                    <Line/>
                </View>
            </TouchableHighlight>
        );
    }
}

export default ThemeListItem;