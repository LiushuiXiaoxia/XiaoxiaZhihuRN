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
    InteractionManager,
    StyleSheet,
    RefreshControl
} from "react-native";
import ToolbarAndroid from "ToolbarAndroid";
import AppLog from "../util/AppLog";
import AppUtil from "../util/AppUtil";
import Res from "../res/Res";
import Api from "../data/HttpApi";
import StoryCommentItem from "./StoryCommentItem";
import Line from "../widget/Line";


class StoryCommentPage extends React.Component {

    constructor(props:any) {
        super(props);
        var ds = new ListView.DataSource({rowHasChanged: (r1, r2) => r1 !== r2});
        this.state = {
            refreshing: false,
            renderPlaceholderOnly: true,
            allComments: ds.cloneWithRows([])
        };
    }

    componentDidMount() {
        InteractionManager.runAfterInteractions(() => {
            this.setState({renderPlaceholderOnly: false});
        });
        this.getComments();
    }

    getComments() {
        this.longComments = null;
        this.shortComments = null;
        this.doHttpRequest(true);
        this.doHttpRequest(false);
    }

    doHttpRequest(isLong) {
        var api = new Api();
        var id = this.props.story.id;
        var promise;
        if (isLong) {
            promise = api.getLongCommentList(id);
        } else {
            promise = api.getShortCommentList(id);
        }
        promise.then((respJson)=> {
            if (respJson && respJson.comments) {
                if (isLong) {
                    this.longComments = respJson.comments;
                } else {
                    this.shortComments = respJson.comments;
                }
                this.update();
            }
        })
            .catch((error)=> {
                AppLog.e("StoryCommentPage.getComments error = " + error);
                if (isLong) {
                    this.longComments = [];
                } else {
                    this.shortComments = [];
                }
                this.update();
            })
            .done();
    }

    update() {
        if (this.longComments && this.shortComments) {
            var comments = [];
            comments.push({num: this.longComments.length, isLong: true});
            comments.push(...this.longComments);
            comments.push({num: this.shortComments.length, isLong: false});
            comments.push(...this.shortComments);
            this.setState({
                refreshing: false,
                allComments: this.state.allComments.cloneWithRows(comments)
            });

            AppLog.i("StoryCommentPage.update comments = " + comments.length)

            this.swipeRefreshLayout && this.swipeRefreshLayout.finishRefresh();
        }
    }

    render() {
        return (
            <View style={styles.container}>
                <ToolbarAndroid
                    style={Res.styleTitleBar}
                    title='评论'
                    titleColor={Res.colorTitleColor}
                    navIcon={require('image!ic_back_white')}
                    onIconClicked={this.onIconClicked.bind(this)}
                />
                {this.renderContent()}
            </View>
        )
    }

    renderContent() {
        if (this.state.renderPlaceholderOnly) {
            return (
                <View style={{flex:1, justifyContent:'center'}}>
                    <Text>正在加载中...</Text>
                </View>
            );
        } else {
            return (
                <ListView
                    style={styles.listview}
                    dataSource={this.state.allComments}
                    enableEmptySections={true}
                    initialListSize={3}
                    renderRow={(comment)=>{
                        if (comment.hasOwnProperty('isLong')) {
                            var text = '';
                            if (comment.isLong) {
                                text = comment.num + '条长评';
                            } else {
                                text = comment.num + '条短评';
                            }
                            return (
                            <View>
                                <Text style={{margin:10}}>{text}</Text>
                                <Line />
                            </View>
                            );
                        } else {
                            return (<StoryCommentItem comment={comment}/>);
                        }
                    }}
                    refreshControl={
                        <RefreshControl
                            refreshing={this.state.refreshing}
                            onRefresh={this.onRefresh.bind(this)}
                            tintColor='#ff0000'
                            title='Loading...'
                            titleColor='#00ff00'
                            colors={['#ff0000', '#00ff00', '#0000ff']}
                            progressBackgroundColor='#3F51B5'
                        />
                    }
                />
            );
        }
    }

    onRefresh() {
        this.swipeRefreshLayout && this.swipeRefreshLayout.startRefresh();
        this.getComments();
    }

    onIconClicked() {
        this.props.navigator.pop();
    }
}

var styles = StyleSheet.create({
    container: {
        flex: 1,
        flexDirection: 'column',
        alignItems: 'center'
    },
    listview: {
        flex: 1,
        width: AppUtil.WINDOW_WIDTH
    }
});

export default StoryCommentPage;