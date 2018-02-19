import React, { Component } from 'react';
import { View, Text, Alert, ActivityIndicator } from 'react-native';
import { connect } from 'react-redux';
import { Card, Button, FormInput, FormLabel, FormValidationMessage } from 'react-native-elements';
import { SocialIcon, Icon, Divider } from 'react-native-elements';

import { facebookLogin, setNextScreen, requestCode, OTPLogin, signUp } from '../redux/actions';
import { 
    AUTH_SCREEN,
    MAP_SCREEN,
    SOCIAL_ICON_SIZE,
    OTP_REQUEST_SUCCESS,
    OTP_REQUEST_FAIL,
    OTP_LOGIN_SUCCESS,
    OTP_LOGIN_FAIL,
    OTP_SIGN_UP_SUCCESS,
    OTP_SIGN_UP_FAIL,
} from '../constants';
import { Apploading } from '../components/common';

class AuthScreen extends Component {
    state = { phone: '', code: '', isRequestingCode: false, isLoggingIn: false, isSigningUp: false };
    componentWillReceiveProps(nextProps) {
        // if (nextProps.nextScreen === AUTH_SCREEN)
        // {
        //     nextProps.facebookLogin(() => {
        //         nextProps.setNextScreen(MAP_SCREEN);
        //         nextProps.navigation.navigate(MAP_SCREEN);
        //     });
        // }
        if (nextProps.OTP.status === OTP_LOGIN_SUCCESS) {
            nextProps.setNextScreen(MAP_SCREEN);
            nextProps.navigation.navigate(MAP_SCREEN);
        }
    }

    doFacebookLogin = () => {
        this.props.facebookLogin(() => {
            this.props.setNextScreen(MAP_SCREEN);
            this.props.navigation.navigate(MAP_SCREEN);
        });
    }

    onRequestCode = async () => {
        this.setState({ isRequestingCode: true });
        
        await this.props.requestCode(this.state.phone);

        this.setState({ isRequestingCode: false });
    }

    renderRequestCodeMessage = () => {
        const { status, message } = this.props.OTP;
        //console.log(this.props.OTP);

        switch (status) {
            case OTP_REQUEST_SUCCESS:
            case OTP_SIGN_UP_SUCCESS:
                return (
                    <FormValidationMessage labelStyle={{color: '#727272', paddingBottom: 5 }}>
                        {message}
                    </FormValidationMessage>
                );
            case OTP_REQUEST_FAIL:
            case OTP_SIGN_UP_FAIL:
                return (
                    <FormValidationMessage labelStyle={{ paddingBottom: 5 }}>
                        {message}
                    </FormValidationMessage>
                );
            default:
                return null;
        }
    }

    renderLoginMessage = () => {
        const { status, message } = this.props.OTP;
        if (status === OTP_LOGIN_FAIL) {
            return (
                <FormValidationMessage>
                    {message}
                </FormValidationMessage>
            );
        }
    }

    onOTPLogin = async () => {
        this.setState({ isLoggingIn: true });
        const { phone, code } = this.state;
        await this.props.OTPLogin(phone, code);
        this.setState({ isLoggingIn: false });
    }

    onSignUp = async () => {
        this.setState({ isSigningUp: true });

        await this.props.signUp(this.state.phone);

        this.setState({ isSigningUp: false });
    }

    renderRequestCodeButton = () => {
        if (this.state.isRequestingCode) {
            return <ActivityIndicator size='small' color='#669AE0' />;
        }

        return (
            <Button 
                title='Request code'
                buttonStyle={{
                    backgroundColor: "transparent",
                    borderColor: "transparent",
                    padding: 0,
                }}
                textStyle={{
                    color:'#669AE0',
                    fontSize: 14,
                    padding: 0
                }}
                onPress={this.onRequestCode}
            />
        );

    };

    renderSignUpButton = () => {
        if (this.state.isSigningUp) {
            return <ActivityIndicator size='small' color='#669AE0' />;
        }

        return (
            <Button 
                title='Sign up'
                buttonStyle={{
                    backgroundColor: "transparent",
                    borderColor: "transparent",
                    padding: 0,
                }}
                textStyle={{
                    color:'#669AE0',
                    fontSize: 14,
                    padding: 0
                }}
                onPress={this.onSignUp}
            />
        );

    };

    render() {
        //console.log('--- Render AUTH --- ');
        return (
            <View style={{ flex: 1 }}>
                <Card
                    title='Log In'
                >
                    <View style={styles.iconContainerStyle}>
                        <SocialIcon
                            type='facebook'
                            iconSize={30}
                            onPress={this.doFacebookLogin}
                        />

                        <Icon
                            name='google'
                            type='font-awesome'
                            color='#FF5607'
                            size={SOCIAL_ICON_SIZE}
                            onPress={() => Alert.alert('Google function is not implemented.')}
                        />

                        <SocialIcon
                            type='instagram'
                            iconSize={35}
                            onPress={() => Alert.alert('Instagram function is not implemented.')}
                        />
                    </View>

                    <Divider style={{ backgroundColor: '#F0F0F0' }} />

                    <View style={styles.inputStyle}>
                        <View style={{ flex: 1 }}>
                            <FormLabel>Phone</FormLabel>
                        </View>
                        <View style={{ flex: 3 }}>
                            <View style={{ flexDirection: 'column' }}>
                                <FormInput 
                                    placeholder='Israel phone number'
                                    value={this.state.phone}
                                    onChangeText={(phone) => this.setState({ phone })}
                                />
                                {this.renderRequestCodeMessage()}
                            </View>
                        </View>
                    </View>

                    <View style={styles.inputStyle}>
                        <View style={{ flex: 1 }}>
                            <FormLabel></FormLabel>
                        </View>
                        <View style={{ flex: 3, flexDirection: 'row', justifyContent: 'flex-start', alignItems: 'center'}}>
                            <View style={{ width: 115 }}>
                                {this.renderRequestCodeButton()}
                            </View>
                            <View style={{ width: 20 }}>
                                <Text>or</Text>
                            </View>

                            <View style={{ width: 80 }}>
                                {this.renderSignUpButton()}
                            </View>
                            <View style={{ width: 20 }}/>
                        </View>
                    </View>

                    <View style={styles.inputStyle}>
                        <View style={{ flex: 1 }}>
                            <FormLabel>Code</FormLabel>
                        </View>
                        <View style={{ flex: 3 }}>
                            <FormInput 
                                placeholder='4 digits'
                                value={this.state.code}
                                onChangeText={(code) => this.setState({ code })}
                            />
                        </View>
                    </View>

                    <View style={styles.inputStyle}>
                        <View style={{ flex: 1 }}>

                        </View>
                        <View style={{ flex: 3 }}>
                            <View style={{ flexDirection: 'column' }}>
                                {this.renderLoginMessage()}
                                <Button
                                    title={this.state.isLoggingIn ? '' : 'Log in'}
                                    loading={this.state.isLoggingIn}
                                    buttonStyle={{
                                        backgroundColor: "#669AE0",
                                        borderRadius: 20,
                                        borderColor: "transparent",
                                        marginTop: 10
                                    }}
                                    onPress={this.onOTPLogin}
                                />
                            </View>
                        </View>
                    </View>
                </Card>
            </View>
        );
    }
}

const styles = {
    iconContainerStyle: {
        flexDirection: 'row',
        justifyContent: 'space-around'
    },

    inputStyle: {
        flexDirection: 'row',
        justifyContent: 'space-between'
    }
}

const mapStateToProps = ({ nextScreen, OTP }) => {
    //console.log
    return { OTP };

    // // Prevent re-render with props from other SCREEN
    // if ( nextScreen === AUTH_SCREEN)
    //     return { nextScreen };
    // else
    //     return {};
}

export default connect(mapStateToProps, { facebookLogin, setNextScreen, requestCode, OTPLogin, signUp })(AuthScreen);
//export {AuthScreen};
