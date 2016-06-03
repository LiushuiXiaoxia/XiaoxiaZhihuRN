'use strict';
import React, {Component} from "react";
import {
    View,
    Text,
    Image,
    ListView,
    Dimensions,
    Navigator,
    TouchableHighlight,
    WebView,
    ScrollView,
    InteractionManager
} from "react-native";
import ToolbarAndroid from "ToolbarAndroid";
import Res from "../res/Res";
import AppUtil from "../util/AppUtil";
import Api from "./../data/HttpApi";
import AppStyles from "./AppStyles";
import App from "../App";
import AppLog from "../util/AppLog";
import AppToast from "../util/AppToast";

var styles = AppStyles.StoryDetail;

class StoryDetailPage extends React.Component {

    constructor(props:any) {
        super(props);
        this.state = {
            renderPlaceholderOnly: true,
            storyDetail: null
        };
    }

    componentDidMount() {
        InteractionManager.runAfterInteractions(() => {
            this.setState({renderPlaceholderOnly: false});
        });
        this.getStoryDetail();
    }

    getStoryDetail() {
        new Api().getStoryDetail(this.props.story.id)
            .then((respJson)=> {
                AppLog.i("StoryDetailPage.getStoryDetail respJson = " + respJson);

                var storyDetail = null;
                if (respJson) {
                    storyDetail = respJson;
                }
                this.setState({
                    storyDetail: storyDetail
                });
            })
            .catch((error)=> {
                AppLog.e("ThemeListPage.getStoryDetail error = " + error);
            })
            .done();
    }

    render() {
        var detail = this.state.storyDetail;

        var body = '';
        var image = null;
        var title = '';
        var titleSource = '';

        if (detail) {
            var cssUrl = detail.css;
            var cssString = `<link rel="stylesheet" href="${cssUrl}" type="text/css" />`;
            body = cssString + detail.body;
            title = detail.title;
            titleSource = detail["image_source"];
            if (detail.image) {
                image = detail.image;
            }
        }
        var source = {html: body};
        return (
            <View style={styles.container}>
                <ToolbarAndroid
                    style={Res.styleTitleBar}
                    titleColor={Res.colorTitleColor}
                    navIcon={require('image!ic_back_white')}
                    onIconClicked={this.onIconClicked.bind(this)}
                    onActionSelected={this.onActionSelected.bind(this)}
                    actions={[
                    {title:'11',icon:require('image!ic_share_white'),show:'always'},
                    {title:'11',icon:require('image!ic_favorites_white'),show:'always'},
                    {title:'11',icon:require('image!ic_comment_white'),show:'always',showWithText:true},
                    {title:'11',icon:require('image!ic_praise_white'),show:'always',showWithText:true}
                    ]}
                />
                {this.renderContent(title, titleSource, image, source)}
            </View>
        )
    }

    renderContent(title, titleSource, image, source) {
        if (this.state.renderPlaceholderOnly) {
            return this.newLoadingView();
        } else {
            return ([
                <Image
                    key={"header_image"}
                    style={styles.header_image}
                    source={{uri: image}}>
                    <Text style={styles.header_text1}>{title}</Text>
                    <Text style={styles.header_text2}>{titleSource}</Text>
                </Image>,
                <WebView
                    key={"wevview"}
                    source={source}
                    scalesPageToFit={true}
                    automaticallyAdjustContentInsets={false}
                    style={{
                            flex: 1,
                            width: AppUtil.WINDOW_WIDTH,
                            paddingTop: 220,
                            height: AppUtil.WINDOW_HEIGHT - 220,
                            alignSelf: 'stretch'
                         }}
                />
            ]);
        }
    }

    newLoadingView() {
        return (
            <View style={{flex:1, justifyContent:'center'}}>
                <Text>正在加载中...</Text>
            </View>
        );
    }

    onActionSelected(position) {
        if (position == 0) {
            AppToast.showShort("分享")
        } else if (position == 1) {
            AppToast.showShort("收藏")
        } else if (position == 2) {
            this.props.navigator.push({
                name: App.PAGE_COMMENT,
                params: {
                    story: this.props.story
                }
            });
        } else if (position == 3) {
            AppToast.showShort("点赞")
        }
    }

    onIconClicked() {
        this.props.navigator.pop();
    }
}

export default StoryDetailPage;