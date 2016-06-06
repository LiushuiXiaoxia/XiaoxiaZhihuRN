'use strict';
import React, {Component} from "react";
import {View, Text, Image, ListView, Dimensions, InteractionManager, RefreshControl} from "react-native";
import Api from "../data/HttpApi";
import AppStyles from "./AppStyles";
import App from "../App";
import AppLog from "../util/AppLog";
import StoryListItem from "./StoryListItem";
import TitleBar from "./../widget/TitleBar";

var styles = AppStyles.StoryHomeListStyle;


class StoryListNormalPage extends React.Component {

    constructor(props:any) {
        super(props);
        var ds = new ListView.DataSource({rowHasChanged: (r1, r2) => r1 !== r2});
        this.state = {
            themeName: this.props.theme.name,
            themeDesc: this.props.theme.description,
            // themeImageUrl: this.props.theme.thumbnail,
            renderPlaceholderOnly: true,
            refreshing: false,
            data: ds.cloneWithRows([])
        };
    }

    componentDidMount() {
        InteractionManager.runAfterInteractions(() => {
            this.setState({renderPlaceholderOnly: false});
        });
        this.getNormalStoryList();
    }

    getNormalStoryList() {
        new Api()
            .getNormalStoryList(this.props.theme.id)
            .then((respJson)=> {
                var allThemes = [];
                if (respJson && respJson.stories) {
                    allThemes = allThemes.concat(respJson.stories);
                }
                this.setState({
                    refreshing: false,
                    themeDesc: respJson.description,
                    themeImageUrl: respJson.background,
                    data: this.state.data.cloneWithRows(allThemes)
                });
                AppLog.i("StoryListNormalPage.getNormalStoryList allThemes.size = " + allThemes.length);
            })
            .catch((error)=> {
                AppLog.e("StoryListNormalPage.getNormalStoryList error = " + error);
            })
            .finally(()=> {
                this.swipeRefreshLayout && this.swipeRefreshLayout.finishRefresh();
            });
    }

    onItemClick(story:Object) {
        AppLog.i("StoryListNormalPage.onItemClick story = " + story.title);

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
            return (
                <ListView
                    style={styles.listview}
                    dataSource={this.state.data}
                    enableEmptySections={true}
                    initialListSize={5}
                    renderHeader={()=>{
                        return (
                            <Image
                                style={styles.header_image}
                                source={{uri: this.state.themeImageUrl}}>
                                <Text style={styles.header_text}>{this.state.themeName}</Text>
                            </Image>
                        );
                    }}
                    renderRow={(rowData)=>{
                        return (
                            <StoryListItem story={rowData} onItemClick={this.onItemClick.bind(this)}/>
                        );
                    }}
                    refreshControl={
                        <RefreshControl
                            refreshing={this.state.refreshing}
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

    onRefresh() {
        this.swipeRefreshLayout && this.swipeRefreshLayout.startRefresh();
        this.getNormalStoryList();
    }

    onIconClicked() {
        this.props.navigator.pop();
    }
}

export default StoryListNormalPage;