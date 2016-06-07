'use strict';

import React, {Component} from "react";
import {Text, View, Image, TouchableHighlight} from "react-native";
import Line from "../widget/Line";
import AppLog from "../util/AppLog";

class StoryListItem extends React.Component {

    onItemClick(story:Object) {
        AppLog.i("StoryListItem.onItemClick story = " + story.title);

        this.props.onItemClick(story);
    }

    render() {
        var story = this.props.story;
        var image = null;
        var padding = 15;
        if (story.images && story.images.length > 0 && story.images[0]) {
            image = {uri: story.images[0]};
            padding = 10;
        }
        return (
            <TouchableHighlight onPress={()=>this.onItemClick(story)}>
                <View style={{flex: 1, flexDirection: 'column', backgroundColor: 'white'}}>
                    <View style={{flexDirection:'row', marginLeft:15, marginRight:15,
                                    marginTop:padding, marginBottom:padding}}>
                        <Text style={{flex: 1, color: '#333'}}>{story.title }</Text>
                        <Image source={image} style={{width: 50, height: 40}}/>
                    </View>
                    <Line/>
                </View>
            </TouchableHighlight>
        );
    }
}

export default StoryListItem;