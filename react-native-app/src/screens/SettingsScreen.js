import React, { Component } from 'react';
import { View, Text } from 'react-native';
import { Card, Button } from 'react-native-elements';
import { connect } from 'react-redux';

import { clearJobs, clearData, setNextScreen } from '../redux/actions';
import { STARTING_SCREEN, REVIEW_SCREEN } from '../constants';

class SettingsScreen extends Component {
    static navigationOptions = ({ navigation }) => {
        return {
            title: 'Setting',
            headerTitleStyle: {
                fontWeight: 'bold',
                alignSelf: 'center',
            },
            headerRight: (
                <Text style={{ color: '#fff' }}>Setting</Text>
            ),
        }
    }

    render() {
        return (
            <View style={{ flex: 1 }}>
                <Card 
                    title='Do you want to clear all your saved jobs?'
                >
                    <Button
                        onPress={() => {this.props.clearJobs(); this.props.navigation.navigate(REVIEW_SCREEN);} }
                        title="Reset Jobs"
                        backgroundColor='#029862'
                    />
                </Card>

                <Card 
                    title='Do you want to clear everything to restart testing this app?'
                >
                    <Button
                        onPress={() => {
                            this.props.clearData(); 
                            this.props.navigation.navigate(REVIEW_SCREEN);
                            this.props.setNextScreen(STARTING_SCREEN);
                            this.props.navigation.navigate(STARTING_SCREEN);
                        }}
                        title="Reset All"
                        backgroundColor='#029862'
                    />
                </Card>
            </View>
        );
    }
}

export default connect(null, { clearJobs, clearData, setNextScreen })(SettingsScreen);
//export {SettingsScreen};
