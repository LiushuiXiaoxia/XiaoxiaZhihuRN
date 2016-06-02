'use strict';

import React, {Component} from "react";
import {View, Text, Image, ListView, InteractionManager, ViewPagerAndroid} from "react-native";
import ToolbarAndroid from "ToolbarAndroid";
import Api from "../data/HttpApi";
import AppUtil from "../util/AppUtil";
import Res from "../res/Res";
import AppStyles from "./AppStyles";
import AppNavigator from "../App";
import NativeLog from "../native/NativeLog";
import StoryListItem from "./StoryListItem";
import Line from "./../widget/Line";
import NativeRefreshLayout from "./../widget/native/NativeRefreshLayout";

var styles = AppStyles.StoryListStyle;

class StoryListHomePage extends React.Component {

    constructor(props:any) {
        super(props);
        var ds = new ListView.DataSource({rowHasChanged: (r1, r2) => r1 !== r2});
        this.state = {
            renderPlaceholderOnly: true,
            topStories: [],
            stories: ds.cloneWithRows([])
        };
    }

    componentDidMount() {
        InteractionManager.runAfterInteractions(() => {
            this.setState({renderPlaceholderOnly: false});
        });
        this.getHomeStoryList();
    }

    getHomeStoryList() {
        new Api()
            .getHomeStoryList()
            .then((respJson)=> {
                var stories = [];
                if (respJson && respJson.stories) {
                    stories.push(...respJson.stories);
                }
                var topStories = [];
                if (respJson && respJson['top_stories']) {
                    topStories.push(...respJson['top_stories']);
                }
                this.setState({
                    topStories: topStories,
                    stories: this.state.stories.cloneWithRows(stories)
                });
            })
            .catch((error)=> {
                NativeLog.e("StoryListHomePage.getHomeStoryList error = " + error);
            })
            .finally(()=> {
                this.swipeRefreshLayout && this.swipeRefreshLayout.finishRefresh();
            });
    }

    onItemClick(story:Object) {
        NativeLog.i("StoryListHomePage.onItemClick story = " + story.title);

        this.props.navigator.push({
            name: AppNavigator.PAGE_DETAIL,
            params: {
                story: story
            }
        });
    }

    render() {
        return (
            <View style={styles.container}>
                <ToolbarAndroid
                    style={Res.styleTitleBar}
                    title={this.props.theme.name}
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
                <NativeRefreshLayout
                    onRefresh={this.onRefresh.bind(this)}
                    ref={(layout) => {this.swipeRefreshLayout = layout;}}>
                    {this.renderHeader()}
                    <Line />
                    <ListView
                        style={styles.listview}
                        dataSource={this.state.stories}
                        enableEmptySections={true}
                        initialListSize={5}
                        renderRow={(rowData)=>{
                            return (<StoryListItem story={rowData} onItemClick={this.onItemClick.bind(this)}/>);
                        }}
                    />
                </NativeRefreshLayout>
            );
        }
    }

    renderHeader() {
        var tops = this.state.topStories;
        var views = [];
        for (let i = 0; i < tops.length; i++) {
            let top = tops[i];
            views.push((
                <View key={"list_key"+i}
                      style={{flex:1,width:AppUtil.WINDOW_WIDTH, height: 220,
                        alignItems: 'center'}}>
                    <Image source={{uri: top.image}}
                           style={{width:AppUtil.WINDOW_WIDTH, height: 220,justifyContent:'flex-end'}}>
                        <Text style={[styles.header_text,{color:'#333', margin:10, fontSize:15}]}>{top.title}</Text>
                    </Image>
                </View>
            ));
        }

        return (
            <ViewPagerAndroid
                style={{width: AppUtil.WINDOW_WIDTH, height: 220,alignItems: 'center'}}
                initialPage={0}>
                {views}
            </ViewPagerAndroid>
        );
    }

    onRefresh() {
        this.swipeRefreshLayout && this.swipeRefreshLayout.startRefresh();
        this.getHomeStoryList();
    }

    onIconClicked() {
        this.props.navigator.pop();
    }
}

export default StoryListHomePage;