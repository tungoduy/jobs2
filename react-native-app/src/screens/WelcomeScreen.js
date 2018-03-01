import React, { Component } from 'react';
import { View, Text } from 'react-native';
import { connect } from 'react-redux';

import { setNextScreen, updatePassedWelcome } from '../redux/actions';
import { Slide } from '../components/common';
import { AUTH_SCREEN, WELCOME_SCREEN } from '../constants';
const DATA = [
    {text: 'Find your desire jobs here.'},
    {text: 'Search jobs by location.'},
]

class WelcomeScreen extends Component {
    state = {refreshScroll: false};
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
                    forceScrollTo={0}
                />
            </View>
        );
    }
}

const mapStateToProps = ({ nextScreen }) => {
    if ( nextScreen === WELCOME_SCREEN)
        return { nextScreen };
    else
        return {};
}

export default connect(mapStateToProps, { setNextScreen, updatePassedWelcome })(WelcomeScreen);

//export default connect(mapStateToProps, {})(WelcomeScreen);
//export {WelcomeScreen};
