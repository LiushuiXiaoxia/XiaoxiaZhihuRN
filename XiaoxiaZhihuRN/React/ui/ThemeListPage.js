'use strict';

import React, {Component} from "react";
import {View, Text, ListView, TouchableHighlight, InteractionManager, RefreshControl, StatusBar} from "react-native";
import AppLog from "../util/AppLog";
import Res from "../res/Res";
import Api from "../data/HttpApi";
import AppStyles from "./AppStyles";
import App from "../App";
import ThemeListItem from "./ThemeListItem";
import TitleBar from "./../widget/TitleBar";

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
        this.getAllThemes();
    }

    getAllThemes() {
        new Api().getAllThemes()
            .then((respJson)=> {
                var allThemes = [];
                allThemes.push({
                    name: '热门主题',
                    id: -1
                });
                if (respJson && respJson.others) {
                    allThemes = allThemes.concat(respJson.others);
                }

                this.setState({
                    data: this.state.data.cloneWithRows(allThemes),
                    refreshing: false
                });
            })
            .done();
    }

    onItemClick(theme) {
        AppLog.i('ThemeListPage.onItemClick theme = ' + theme.name);
        var name = App.PAGE_NORMAL_LIST;
        if (theme.id == -1) {
            name = App.PAGE_HOME_LIST;
        }
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
            return (
                <ListView
                    style={styles.listview}
                    dataSource={this.state.data}
                    enableEmptySections={true}
                    initialListSize={5}
                    renderRow={(rowData)=>{
                        return (
                            <ThemeListItem theme={rowData} onItemClick={this.onItemClick.bind(this)}/>
                        );
                    }}
                    refreshControl={
                        <RefreshControl
                            refreshing={this.state.refreshing}
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
        this.getAllThemes();
    }
}

export default ThemeListPage;