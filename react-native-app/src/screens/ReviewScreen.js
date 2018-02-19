import React, { Component } from 'react';
import { View, Text, Dimensions, Platform, ScrollView, Linking } from 'react-native';
import { connect } from 'react-redux';
import { Card, Button } from 'react-native-elements';
import { MapView } from 'expo';
import { deleteLikedJob } from '../redux/actions';

const SCREEN_WIDTH = Dimensions.get('window').width;

class ReviewScreen extends Component {
    static navigationOptions = ({ navigation }) => {
        return {
            title: 'Review',
            headerTitleStyle: {
                fontWeight: 'bold',
                alignSelf: 'center',
            },
            headerStyle: {
                justifyContent: 'center',
            },
            headerRight: (
                <Button
                    onPress={() => navigation.navigate('Settings')}
                    title="Setting"
                    color='#008866'
                    backgroundColor='#fff'
                />
            ),
            headerLeft: (
                <Text style={{ color: '#fff' }}>Setting</Text>
            ),
        }
    }

    renderJobs() {
        //console.log(this.props.likedJobs);
        return this.props.likedJobs.map((item, index) => {
            
            const { jobkey, jobtitle, latitude, longitude, formattedRelativeTime, company, snippet, url } = item;
            const region = {
                latitude: latitude,
                longitude: longitude,
                latitudeDelta: Platform.OS === 'android' ? 0.005 : 0.09,
                longitudeDelta: Platform.OS === 'android' ? 0.0002 : 0.04,
            }
            return (
                <Card key={jobkey}>
                    <View style={{ height: 150 }}>
                        <MapView 
                            style={{ flex: 1 }}
                            region ={region}
                            scrollEnabled={false}
                            cacheEnabled={ Platform.OS === 'android' ? true : false }
                            loadingEnabled
                        />
                    </View>
                    <View style={styles.wrapperStyle}>
                        <Text>{company}</Text>
                        <Text>{formattedRelativeTime}</Text>
                    </View>

                    <View style={styles.jobDescriptionContainerStyle}>
                        <Text style={styles.jobDescriptionStyle}>{snippet.replace(/[<b>]/g,'').replace(/[<\/b>]/g,'')}</Text>
                    </View>

                    <View style={styles.wrapperStyle}>
                        <Button
                            title='Delete'
                            backgroundColor='#029862'
                            onPress={() => this.props.deleteLikedJob(item)}
                        />
                        <Button
                            title='Apply'
                            backgroundColor='#059862'
                            onPress={() => Linking.openURL(url)}
                        />
                    </View>
                </Card>
            );
        })
    }

    render() {
        return (
            <ScrollView style={{ flex: 1 }}>
                {this.renderJobs()}
            </ScrollView>
        );
    }
}
const styles = {
    wrapperStyle: {
        flexDirection: 'row',
        justifyContent: 'space-between',
        marginTop: 15,
    },
    jobDescriptionStyle: {
        fontSize: 14
    }
}
const mapStateToObject = ({ likedJobs }) => {
    //console.log(likedJobs.length);
    return { likedJobs };
}

export default connect(mapStateToObject, { deleteLikedJob })(ReviewScreen);
//export {ReviewScreen};
