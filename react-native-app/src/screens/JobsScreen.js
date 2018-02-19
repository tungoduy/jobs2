import React, { Component } from 'react';
import { View, Text, Platform } from 'react-native';
import { connect } from 'react-redux';
import { Card, Button } from 'react-native-elements';
import { MapView } from 'expo';

import { likeJob } from '../redux/actions';
import { Swipe } from '../components/common';
import { MAP_SCREEN } from '../constants';

class JobsScreen extends Component {

    componentWillReceiveProps(nextProps) {

    }

    renderCard = (item) => {
        const { jobkey, jobtitle, latitude, longitude, formattedRelativeTime, company, snippet, url } = item;
        const region = {
            latitude: latitude,
            longitude: longitude,
            latitudeDelta: Platform.OS === 'android' ? 0.005 : 0.09,
            longitudeDelta: Platform.OS === 'android' ? 0.0002 : 0.04,
        }
        //console.log(region);
        return (
            <Card 
                key={jobkey}
                title={jobtitle}
            >
                <View style={{ height: 300 }}>
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
            </Card>

        );
    }

    likeJob = (job) => {
        this.props.likeJob(job);
    }

    renderNoMoreCards = () => {
        return (
            <Card 
                title='No more jobs'
            >
                <Button
                    title='Get more jobs'
                    icon={{ name: 'my-location', size: 50 }}
                    onPress={() => this.props.navigation.navigate(MAP_SCREEN)}
                    backgroundColor='#009944'
                />
            </Card>
        );
    }
    render() {
        return (
            <View style={{ }}>
                <Swipe 
                    keyProp='jobkey'
                    data={this.props.jobList}
                    renderCard={this.renderCard}
                    onSwipeRight={this.likeJob}
                    renderNoMoreCards={this.renderNoMoreCards}
                />
            </View>
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

const mapStateToProps = ({ jobs }) => {
    //if (jobs.error) { return [];}
    //console.log(jobs);
    return { jobList: jobs.data };
    //const { jobList } = jobs.data;
    //return jobList;
}

export default connect(mapStateToProps, { likeJob })(JobsScreen);

//export {JobsScreen};
