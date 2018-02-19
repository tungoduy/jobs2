import React, { Component } from 'react';
import { View, Text } from 'react-native';
import { connect } from 'react-redux';

import { setNextScreen, updatePassedWelcome } from '../redux/actions';
import { Slide } from '../components/common';
import { AUTH_SCREEN } from '../constants';
const DATA = [
    {text: 'Find your desire jobs here.'},
    {text: 'Search jobs by location.'},
]

class WelcomeScreen extends Component {
    
    onEndOfSlide = () => {
        this.props.updatePassedWelcome();
        this.props.setNextScreen( AUTH_SCREEN );
        this.props.navigation.navigate('Auth');
    }

    render() {
        return (
            <View style={{ flex: 1 }}>
                <Slide 
                    data={DATA}
                    buttonTitle='Continue'
                    onEndOfSlide={this.onEndOfSlide}
                />
            </View>
        );
    }
}

const mapStateToProps = ({ nextScreen }) => {
    if ( nextScreen === AUTH_SCREEN)
        return { nextScreen };
    else
        return {};
}

export default connect(null, { setNextScreen, updatePassedWelcome })(WelcomeScreen);

//export default connect(mapStateToProps, {})(WelcomeScreen);
//export {WelcomeScreen};
