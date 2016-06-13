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
import AppUtil from "../util/AppUtil";
import StoryCommentItem from "./StoryCommentItem";
import Line from "../widget/Line";
import TitleBar from "./../widget/TitleBar";
import {doLoadLongCommentList, doLoadShortCommentList} from "./../actions/storycomment";
import {connect} from "react-redux";

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
        this.getComments(false);
    }

    getComments(isRefresh) {
        var id = this.props.story.id;
        this.props.dispatch(doLoadLongCommentList(isRefresh, id));
        this.props.dispatch(doLoadShortCommentList(isRefresh, id));
    }

    render() {
        return (
            <View style={styles.container}>
                <TitleBar
                    title='评论'
                    showNavIco={true}
                    onLeftClicked={this.onIconClicked.bind(this)}
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
            var {longs, shorts, isRefresh} = this.props.storycomment;
            var comments = [];
            comments.push({num: longs.length, isLong: true});
            comments.push(...longs);
            comments.push({num: shorts.length, isLong: false});
            comments.push(...shorts);

            return (
                <ListView
                    style={styles.listview}
                    dataSource={this.state.allComments.cloneWithRows(comments)}
                    enableEmptySections={true}
                    initialListSize={3}
                    renderRow={this.renderListViewRow.bind(this)}
                    refreshControl={
                        <RefreshControl
                            refreshing={isRefresh}
                            onRefresh={this.onRefresh.bind(this)}
                            tintColor='#ff0000'
                            title='Loading...'
                            titleColor='#00ff00'
                            colors={['#ff0000', '#00ff00', '#0000ff']}
                        />
                    }
                />
            );
        }
    }

    renderListViewRow(comment) {
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
    }

    onRefresh() {
        this.getComments(true);
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

function mapStateToProps(state) {
    return {
        storycomment: state.storycomment
    };
}

export default connect(mapStateToProps)(StoryCommentPage);