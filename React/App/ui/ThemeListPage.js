'use strict';

import React, {View, Text, ListView, TouchableHighlight, InteractionManager} from "react-native";
import ToolbarAndroid from "ToolbarAndroid";
import NativeLog from "../native/NativeLog";
import Res from "../res/Res";
import Api from "../data/HttpApi";
import AppStyles from "./AppStyles";
import AppNavigator from "../App";
import ThemeListItem from "./ThemeListItem";
import NativeRefreshLayout from "../widget/native/NativeRefreshLayout";

var styles = AppStyles.ThemeListStyle;

class ThemeListPage extends React.Component {

    constructor(props:any) {
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
                    data: this.state.data.cloneWithRows(allThemes)
                });
            })
            .finally(()=> {
                this.swipeRefreshLayout && this.swipeRefreshLayout.finishRefresh();
            });
    }

    onItemClick(theme) {
        NativeLog.i("ThemeListPage.onItemClick theme = " + theme.name);
        var name = AppNavigator.PAGE_NORMAL_LIST;
        if (theme.id == -1) {
            name = AppNavigator.PAGE_HOME_LIST;
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
                <ToolbarAndroid
                    style={Res.styleTitleBar}
                    title="主题列表"
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
                <NativeRefreshLayout
                    onRefresh={this.onRefresh.bind(this)}
                    ref={(layout) => {this.swipeRefreshLayout = layout;}}>
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
                    />
                </NativeRefreshLayout>
            );
        }
    }

    onRefresh() {
        this.swipeRefreshLayout && this.swipeRefreshLayout.startRefresh();
        this.getAllThemes();
    }
}

export default ThemeListPage;