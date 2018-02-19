import React, { Component } from 'react';
import { View, Text } from 'react-native';
import { Card, Button } from 'react-native-elements';
import { connect } from 'react-redux';
import { clearJobs } from '../redux/actions';

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
                        onPress={() => {this.props.clearJobs(); this.props.navigation.pop();} }
                        title="Reset"
                        backgroundColor='#029862'
                    />
                </Card>
            </View>
        );
    }
}

export default connect(null, { clearJobs })(SettingsScreen);
//export {SettingsScreen};
