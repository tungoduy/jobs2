import React, { Component } from 'react';
import { View } from 'react-native';
import { connect } from 'react-redux';
import { navigateToScreen, clearData } from '../redux/actions';
import { Apploading } from '../components/common';

class StartingScreen extends Component {
    async componentDidMount() {
        //await this.props.clearData();
        await this.props.navigateToScreen();
    }

    componentWillReceiveProps(nextProps) {
        console.log('nextScreen : ' + nextProps.nextScreen);
        if (nextProps.nextScreen) {
            this.props.navigation.navigate(nextProps.nextScreen);
        }
    }

    async componentDidUpdate() {
        await this.props.navigateToScreen();
    }
    
    render() {
        return (
            <View style={{ flex: 1 }}>
                <Apploading />
            </View>
        );
    }
}

const mapStateToProps = ({ nextScreen }) => {
    return { nextScreen };
}

export default connect(mapStateToProps, { navigateToScreen, clearData })(StartingScreen);
