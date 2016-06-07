'use strict';

import React, {Component} from "react";
import {
    View,
    Text,
    Image,
    ListView,
    InteractionManager,
    ViewPagerAndroid,
    RefreshControl,
    ScrollView,
    Platform
} from "react-native";
import Api from "../data/HttpApi";
import AppUtil from "../util/AppUtil";
import AppStyles from "./AppStyles";
import App from "../App";
import AppLog from "../util/AppLog";
import StoryListItem from "./StoryListItem";
import TitleBar from "./../widget/TitleBar";
import Carousel from "react-native-carousel";

var styles = AppStyles.StoryListStyle;

class StoryListHomePage extends React.Component {

    constructor(props:any) {
        super(props);
        var ds = new ListView.DataSource({rowHasChanged: (r1, r2) => r1 !== r2});
        this.state = {
            renderPlaceholderOnly: true,
            refreshing: false,
            topStories: [],
            // stories: ds.cloneWithRows([]),
            stories: []
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
                    refreshing: false,
                    topStories: topStories,
                    // stories: this.state.stories.cloneWithRows(stories),
                    stories: stories
                });
            })
            .catch((error)=> {
                AppLog.e("StoryListHomePage.getHomeStoryList error = " + error);
            })
            .finally(()=> {
                this.swipeRefreshLayout && this.swipeRefreshLayout.finishRefresh();
            });
    }

    onItemClick(story:Object) {
        AppLog.i("StoryListHomePage.onItemClick story = " + story.title);

        this.props.navigator.push({
            name: App.PAGE_DETAIL,
            params: {
                story: story
            }
        });
    }

    render() {
        return (
            <View style={styles.container}>
                <TitleBar
                    title={this.props.theme.name}
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
            var views = [];
            views.push(this.renderHeader());
            var stories = this.state.stories;
            var length = stories.length;
            for (var i = 0; i < length; i++) {
                views.push((
                    <StoryListItem key={"scroll_key_"+i} story={stories[i]} onItemClick={this.onItemClick.bind(this)}/>
                ));
            }

            return (
                <ScrollView
                    automaticallyAdjustContentInsets={false}
                    horizontal={false}
                    style={{flex:1,width:AppUtil.WINDOW_WIDTH}}
                    refreshControl={
                        <RefreshControl
                            refreshing={this.state.refreshing}
                            onRefresh={this.onRefresh.bind(this)}
                            tintColor='#ff0000'
                            title='Loading...'
                            titleColor='#00ff00'
                            colors={['#ff0000', '#00ff00', '#0000ff']}
                        />
                    }>
                    {views}
                </ScrollView>
            );
        }
    }

    renderHeader() {
        var tops = this.state.topStories;
        var views = [];
        var headherHeight = 220;
        for (let i = 0; i < tops.length; i++) {
            let top = tops[i];
            views.push((
                <View key={"list_key"+i}
                      style={{flex:1,width:AppUtil.WINDOW_WIDTH, height: headherHeight,
                        alignItems: 'center'}}>
                    <Image source={{uri: top.image}}
                           style={{width:AppUtil.WINDOW_WIDTH, height: headherHeight,justifyContent:'flex-end'}}>
                        <Text style={[styles.header_text,{color:'#fff', marginLeft:20,marginRight:20,marginBottom:30,
                            fontSize:15}]}
                        >{top.title}</Text>
                    </Image>
                </View>
            ));
        }

        // TODO xiaqiulei, Carousel Android支持有bug,后续在优化
        if (Platform.OS == 'ios') {
            return (
                <Carousel
                    key={"carousel"}
                    style={{
                        width: AppUtil.WINDOW_WIDTH,
                    }}
                    hideIndicators={false} // Set to true to hide the indicators
                    indicatorColor="#FFFFFF" // Active indicator color
                    indicatorSize={20} // Indicator bullet size
                    indicatorSpace={15} // space between each indicator
                    inactiveIndicatorColor="#999999" // Inactive indicator color
                    indicatorAtBottom={true} // Set to false to show the indicators at the top
                    indicatorOffset={2} // Indicator relative position from top or bottom
                    inactiveIndicatorText='•' // Inactive indicator content ( You can customize to use any Unicode character )
                    indicatorText='•' // Active indicator content ( You can customize to use any Unicode character )
                    delay={5000}>
                    {views}
                </Carousel>
            );
        }
        return (
            <ViewPagerAndroid
                key={"viewpagerandroid"}
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