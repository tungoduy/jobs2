import React, { Component } from 'react';
import { View, Text, Platform, Dimensions, Alert } from 'react-native';
import { MapView } from 'expo';
import { Button } from 'react-native-elements';
import { connect } from 'react-redux';

import { fetchJobs } from '../redux/actions';
import { logStart, logEnd, logConsole, logContinue } from '../mylogger';
import { JOBS_SCREEN } from '../constants';

const SCREEN_WIDTH = Dimensions.get('window').width;

class MapScreen extends Component {
    state = {
        region: {
            latitude: 37,
            longitude: -122,
            latitudeDelta: Platform.OS === 'android' ? 0.005 : 0.09,
            longitudeDelta: Platform.OS === 'android' ? 0.0002 : 0.04,
        }
    }

    onRegionChange = (region) => {
        this.setState({ region });
    }

    fetchJobs = () => {
        this.props.fetchJobs(this.state.region, 
            () => {this.props.navigation.navigate(JOBS_SCREEN);},
            () => {Alert.alert('Cannot fetch jobs. Please try again.')},
        )
    }

    render() {

        return (
            <View style={{ flex: 1 }}>
                <View style={{ flex: 1 }}>
                    <MapView
                        style={{ flex: 1 }}
                        region ={this.state.region}
                        onRegionChange={this.onRegionChange}
                    />
                </View>

                <View style={styles.floatButtonStyle}>
                    <Button
                        title="Search this area"
                        icon={{ name: 'search' }}
                        backgroundColor='#009988'
                        large
                        onPress={this.fetchJobs}
                    />
                </View>
            </View>
        );
    }
}

const styles = {
    floatButtonStyle: {
        position: 'absolute',
        bottom: 25,
        width: SCREEN_WIDTH
    }
}
export default connect(null, { fetchJobs })(MapScreen);
