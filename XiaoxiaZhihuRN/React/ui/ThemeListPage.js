'use strict';

import React, {Component} from "react";
import {View, Text, ListView, TouchableHighlight, InteractionManager, RefreshControl, StatusBar} from "react-native";
import AppLog from "../util/AppLog";
import Res from "../res/Res";
import AppStyles from "./AppStyles";
import {PAGE_HOME_LIST, PAGE_NORMAL_LIST} from "../App";
import ThemeListItem from "./ThemeListItem";
import TitleBar from "./../widget/TitleBar";
import {doLoadThemeList} from "./../actions/themelist";
import {connect} from "react-redux";

var styles = AppStyles.ThemeListStyle;

class ThemeListPage extends React.Component {

    constructor(props:any) {
        super(props);
        var ds = new ListView.DataSource({rowHasChanged: (r1, r2) => r1 !== r2});
        this.state = {
            refreshing: false,
            renderPlaceholderOnly: true,
            data: ds.cloneWithRows([])
        };
    }

    componentDidMount() {
        InteractionManager.runAfterInteractions(() => {
            this.setState({renderPlaceholderOnly: false});
        });
        this.getAllThemes(false);
    }

    getAllThemes(isRefresh) {
        this.props.dispatch(doLoadThemeList(isRefresh));
    }

    onItemClick(theme) {
        AppLog.i('ThemeListPage.onItemClick theme = ' + theme.name);
        var name = theme.id == -1 ? PAGE_HOME_LIST : PAGE_NORMAL_LIST;
        // 跳转到对应的主题页面
        this.props.navigator.push({
            name: name,
            params: {
                theme: theme
            }
        });
    }

    render() {
        return (
            <View style={styles.container}>
                <StatusBar
                    backgroundColor="#3F51B5"
                    barStyle="light-content"
                    showHideTransition="fade"
                />
                <TitleBar
                    title='主题列表'
                    titleColor={Res.colorTitleColor}
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
            var {isRefresh, allThemes} = this.props.themelist;
            if (!allThemes) {
                allThemes = [];
            }
            return (
                <ListView
                    style={styles.listview}
                    dataSource={this.state.data.cloneWithRows(allThemes)}
                    enableEmptySections={true}
                    initialListSize={5}
                    renderRow={(rowData)=>{
                        return (
                            <ThemeListItem theme={rowData} onItemClick={this.onItemClick.bind(this)}/>
                        );
                    }}
                    refreshControl={
                        <RefreshControl
                            refreshing={isRefresh}
                            onRefresh={this._onRefresh.bind(this)}
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

    _onRefresh() {
        this.getAllThemes(true);
    }
}


function mapStateToProps(state) {
    return {
        themelist: state.themelist
    };
}

export default connect(mapStateToProps)(ThemeListPage);