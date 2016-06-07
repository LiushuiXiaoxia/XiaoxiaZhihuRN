/**
 * Created by xiaqiulei on 16/6/3.
 */
import React, {Component} from "react";
import {View, Image, Platform, ToolbarAndroid, Text, TouchableHighlight} from "react-native";
import Res from "../res/Res";
import AppUtil from "../util/AppUtil";

class TitleBar extends React.Component {

    constructor(props:any) {
        super(props);
        this.state = {};
    }

    render() {
        if (Platform.OS == 'ios') {
            return this.renderIOS();
        } else {
            return this.renderAndroid();
        }
    }

    renderIOS() {
        const titleBarHeight = 22;
        const navBarHeight = 50;
        const navButtonSize = navBarHeight - 16;

        var isShowNavIco = this.props.showNavIco == null ? false : this.props.showNavIco;
        var navIcon = isShowNavIco ? this.props.navIcon : null;
        if (isShowNavIco && navIcon == null) {
            navIcon = require('../res/img/ic_back_white.png');
        }
        var onLeftClicked = isShowNavIco ? this.props.onLeftClicked : null;
        var title = this.props.title;
        var editIcon = this.props.editIcon ? this.props.editIcon : null;
        var onRightClicked = this.props.onRightClicked ? this.props.onRightClicked : null;
        return (
            <View style={{
                width:AppUtil.WINDOW_WIDTH,
                height:navBarHeight + titleBarHeight,
                flexDirection:'row',
                // justifyContent:'center',
                alignItems:'center',
                backgroundColor:'#303F9F',
                paddingTop:titleBarHeight
                }}>
                <TouchableHighlight onPress={()=>{if(onLeftClicked){onLeftClicked()}}} underlayColor="#303F9F30">
                    <Image
                        style={{width:navButtonSize,height:navButtonSize,
                            marginLeft:(navBarHeight-navButtonSize)/2}}
                        source={navIcon}
                        resizeMode="cover"
                    />
                </TouchableHighlight>
                <Text style={{flex:1, fontSize:20,color:Res.colorTitleColor,textAlign:'center'}}>
                    {title}
                </Text>
                <TouchableHighlight onPress={()=>{if(onRightClicked){onRightClicked()}}} underlayColor="#303F9F30">
                    <Image
                        style={{width:navButtonSize,height:navButtonSize, marginRight:(navBarHeight-navButtonSize)/2}}
                        source={editIcon}
                    />
                </TouchableHighlight>
            </View>
        );
    }

    renderAndroid() {
        var isShowNavIco = this.props.showNavIco == null ? false : this.props.showNavIco;
        var navIcon = isShowNavIco ? this.props.navIcon : null;
        if (isShowNavIco && navIcon == null) {
            navIcon = require('image!ic_back_white');
        }
        var onIconClicked = isShowNavIco ? this.props.onLeftClicked : null;
        var title = this.props.title;
        return (
            <ToolbarAndroid
                style={Res.styleTitleBar}
                title={title}
                titleColor={Res.colorTitleColor}
                navIcon={navIcon}
                onIconClicked={onIconClicked}
            />
        );
    }
}

module.exports = TitleBar;