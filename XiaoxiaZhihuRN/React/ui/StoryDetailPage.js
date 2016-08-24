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
    Platform,
    InteractionManager
} from "react-native";
import ToolbarAndroid from "ToolbarAndroid";
import Res from "../res/Res";
import AppUtil from "../util/AppUtil";
import AppStyles from "./AppStyles";
import {PAGE_COMMENT} from "../App";
import AppToast from "../util/AppToast";
import TitleBar from "./../widget/TitleBar";
import {doLoadDetail} from "./../actions/storydetial";
import {connect} from "react-redux";

var styles = AppStyles.StoryDetail;

class StoryDetailPage extends React.Component {

    constructor(props: any) {
        super(props);
        this.state = {
            renderPlaceholderOnly: true
        };
    }

    componentDidMount() {
        InteractionManager.runAfterInteractions(() => {
            this.setState({renderPlaceholderOnly: false});
        });
        this.props.dispatch(doLoadDetail(this.props.story.id));
    }

    render() {
        var {storyDetail} = this.props.storydetail;
        if (storyDetail) {

            var body = '';
            var image = null;
            var title = '';
            var titleSource = '';

            if (storyDetail) {
                var cssUrl = storyDetail.css;
                var cssString = `<link rel="stylesheet" href="${cssUrl}" type="text/css" />`;
                body = cssString + storyDetail.body;
                title = storyDetail.title;
                titleSource = storyDetail["image_source"];
                if (storyDetail.image) {
                    image = storyDetail.image;
                }
            }
            var source = {html: body};

            return (
                <View style={styles.container}>
                    {this.rederTitleBar()}
                    {this.renderContent(title, titleSource, image, source)}
                </View>
            );
        }
        return (
            <View style={styles.container}>
                {this.rederTitleBar()}
            </View>
        );
    }

    rederTitleBar() {
        if (Platform.OS == 'ios') {
            return (
                <TitleBar
                    title='详情'
                    showNavIco={true}
                    onLeftClicked={this.onIconClicked.bind(this)}
                    onRightClicked={this.onRightClicked.bind(this)}
                    editIcon={require('../res/img/ic_comment_white.png')}
                />
            );
        } else {
            return (
                <ToolbarAndroid
                    title='详情'
                    style={Res.styleTitleBar}
                    titleColor={Res.colorTitleColor}
                    navIcon={require('image!ic_back_white')}
                    onIconClicked={this.onIconClicked.bind(this)}
                    onActionSelected={this.onActionSelected.bind(this)}
                    actions={[
                        {title: '分享', icon: require('image!ic_share_white'), show: 'always'},
                        {title: '收藏', icon: require('image!ic_favorites_white'), show: 'always'},
                        {title: '评论', icon: require('image!ic_comment_white'), show: 'always', showWithText: true},
                        {title: '点赞', icon: require('image!ic_praise_white'), show: 'always', showWithText: true}
                    ]}
                />
            );
        }
    }

    renderContent(title, titleSource, image, source) {
        if (this.state.renderPlaceholderOnly) {
            return StoryDetailPage.newLoadingView();
        } else {
            var views = [];
            if (image) {
                views.push(
                    <Image
                        key={"header_image"}
                        style={styles.header_image}
                        source={{uri: image}}>
                        <Text style={styles.header_text1}>{title}</Text>
                        <Text style={styles.header_text2}>{titleSource}</Text>
                    </Image>
                );
            }
            var scalesPageToFit = Platform.OS != 'ios';
            views.push(
                <WebView
                    key={"wevview"}
                    source={source}
                    scalesPageToFit={scalesPageToFit}
                    automaticallyAdjustContentInsets={false}
                    style={{
                        flex: 1,
                        width: AppUtil.WINDOW_WIDTH,
                        height: AppUtil.WINDOW_HEIGHT - styles.header_image.height,
                        alignSelf: 'stretch'
                    }}
                />
            );
            return views;
        }
    }

    static newLoadingView() {
        return (
            <View style={{flex: 1, justifyContent: 'center'}}>
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
            this.onRightClicked();
        } else if (position == 3) {
            AppToast.showShort("点赞")
        }
    }

    onIconClicked() {
        this.props.navigator.pop();
    }

    onRightClicked() {
        this.props.navigator.push({
            name: PAGE_COMMENT,
            params: {
                story: this.props.story
            }
        });
    }
}

function mapStateToProps(state) {
    return {
        storydetail: state.storydetail
    };
}

export default connect(mapStateToProps)(StoryDetailPage);