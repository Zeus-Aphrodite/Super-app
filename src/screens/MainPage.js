/**
 * Created by supervons on 2019/08/08.
 * 用户主界面
 * user main page
 */
import React, {Component} from 'react';
import {StatusBar, View} from 'react-native';
import Theme from '../styles/theme';

export default class MainPage extends Component {

    constructor(props) {
        super(props);
    }

    render() {
        return (
            <View style={{flex:1, backgroundColor: "#ffffff"}}>
                <StatusBar backgroundColor={Theme.primary} barStyle={'light-content'}/>
            </View>
        );
    }
}
