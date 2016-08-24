'use strict';
import React, {Component} from "react";
import {View, Text, Image, ListView, Dimensions, InteractionManager, RefreshControl} from "react-native";
import AppStyles from "./AppStyles";
import {PAGE_DETAIL} from "../App";
import AppLog from "../util/AppLog";
import StoryListItem from "./StoryListItem";
import TitleBar from "./../widget/TitleBar";
import {doLoadNormalList} from "./../actions/storylist";
import {connect} from "react-redux";

var styles = AppStyles.StoryHomeListStyle;

class StoryListNormalPage extends React.Component {

    constructor(props) {
        super(props);
        var ds = new ListView.DataSource({rowHasChanged: (r1, r2) => r1 !== r2});
        this.state = {
            renderPlaceholderOnly: true,
            data: ds.cloneWithRows([])
        };
    }

    componentDidMount() {
        InteractionManager.runAfterInteractions(() => {
            this.setState({renderPlaceholderOnly: false});
        });
        this.getNormalStoryList(false);
    }

    getNormalStoryList(isRefresh) {
        this.props.dispatch(doLoadNormalList(isRefresh, this.props.theme.id));
    }

    onItemClick(story) {
        AppLog.i("StoryListNormalPage.onItemClick story = " + story.title);

        this.props.navigator.push({
            name: PAGE_DETAIL,
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
                <View style={{flex: 1, justifyContent: 'center'}}>
                    <Text>正在加载中...</Text>
                </View>
            );
        } else {
            var {isRefresh, stories, themeName, themeImageUrl} = this.props.storylist;
            if (!stories) {
                stories = [];
            }
            return (
                <ListView
                    style={styles.listview}
                    dataSource={this.state.data.cloneWithRows(stories)}
                    enableEmptySections={true}
                    initialListSize={5}
                    renderHeader={()=> {
                        return (
                            <Image
                                style={styles.header_image}
                                source={{uri: themeImageUrl}}>
                                <Text style={styles.header_text}>{themeName}</Text>
                            </Image>
                        );
                    }}
                    renderRow={(rowData)=> {
                        return (
                            <StoryListItem story={rowData} onItemClick={this.onItemClick.bind(this)}/>
                        );
                    }}
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

    onRefresh() {
        this.getNormalStoryList(true);
    }

    onIconClicked() {
        this.props.navigator.pop();
    }
}


function mapStateToProps(state) {
    return {
        storylist: state.storylist
    };
}

export default connect(mapStateToProps)(StoryListNormalPage);