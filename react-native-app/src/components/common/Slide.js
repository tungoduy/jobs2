import React, { Component } from 'react';
import { View, Text, ScrollView, Dimensions } from 'react-native';
import { Button, Icon } from 'react-native-elements';

const SCREEN_WIDTH = Dimensions.get('window').width;

class Slide extends Component {
    static defaultProps = {
        onEndOfSlide: () => {},
        buttonTitle: 'default title',
        forceScrollTo: -1
    }

    componentDidMount() {
        this.forceScrollToPosition();
    }

    componentDidUpdate() {
        this.forceScrollToPosition();
    }

    renderSlides() {
        const data  = this.props.data;
        const _length = data.length - 1;
        return data.map((item, index) => {

            return (
                <View 
                    key={item.text}
                    style={{ 
                        width: SCREEN_WIDTH, 
                        justifyContent: 'center', 
                        alignItems: 'center',
                        backgroundColor: (index%2 == 0) ? '#008866' : '#114455'
                    }}
                    >
                    <Text style={styles.textStyle}>{item.text}</Text>
                    {this.renderButton(index, _length)}
                </View>
            );
        })
    }

    renderButton(itemIndex, dataLength) {
        if (itemIndex == dataLength) {
            return (
                <View style={styles.buttonStyle}>
                    <Button 
                        title={this.props.buttonTitle}
                        onPress={this.props.onEndOfSlide}
                        iconRight={{ name: 'keyboard-arrow-right', size: 30 }}
                        buttonStyle={{
                            backgroundColor: '#5A66D1',
                            borderRadius: 20,
                            height: 35
                        }}
                    />
                </View>
            );
        }

        return null;
    }


    forceScrollToPosition = () => {
        if ( this.props.forceScrollTo != -1 ) {
            this._slideScrollView.scrollTo({x: 0, y: 0, animated: true});
        }
    }

    render() {
        return (
            <ScrollView
                //ref='_slideScrollView'
                ref={(_slideScrollView) => { this._slideScrollView = _slideScrollView; }}
                horizontal
                pagingEnabled
            >
                {this.renderSlides()}
                
                
            </ScrollView>            
        );
    }
}

const styles = {
    textStyle: {
        fontSize: 16,
        color: 'white'
    },
    buttonStyle: {
        position: 'absolute',
        bottom: 10,
        right: 1,
    }
}

export {Slide};
