'use strict';

import React, { Component } from 'react';
import {View} from "react-native";

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