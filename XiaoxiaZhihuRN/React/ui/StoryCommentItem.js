'use strict';
import React, {Component} from "react";
import {Text, View, Image} from "react-native";
import Line from "../widget/Line";

class StoryCommentItem extends React.Component {

    render() {
        var comment = this.props.comment;
        var image = {uri: comment.avatar};
        var date = new Date(comment.time * 1000);

        var year = date.getFullYear();
        var month = date.getMonth() + 1;
        var day = date.getDate();
        var hour = date.getHours();
        var min = date.getMinutes();
        var second = date.getSeconds();

        var dateText = year + '-' + month + '-' + day + ' ' + hour + ':' + min + ':' + second;

        return (
            <View style={{flex: 1, flexDirection: 'column'}}>
                <View style={{flex: 1, flexDirection: 'row',padding:10}}>
                    <Image source={image} style={{width: 40, height: 40}}/>
                    <View style={{flexDirection: 'column',flex:1, marginLeft:10}}>
                        <Text style={{color: '#000', fontSize:15, marginBottom:10}}>{comment.author}</Text>
                        <Text style={{color: '#555', fontSize:13, marginBottom:10}}>{comment.content}</Text>
                        <Text style={{color: '#ccc', fontSize:11}}>{dateText}</Text>
                    </View>
                </View>
                <Line/>
            </View>
        );
    }
}

export default StoryCommentItem;