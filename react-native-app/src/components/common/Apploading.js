import React from 'react';
import { View, ActivityIndicator } from 'react-native';

const Apploading = ({ isVisible = true, color ="#039BE5" }) => {
    if (isVisible) {
        return (
            <View style={{ flex: 1, justifyContent: 'center', alignItems: 'center'}}>
                <ActivityIndicator size="large" color={color} />
            </View>
        );
    }
}

export {Apploading};
