import reverseGeocode from 'latlng-to-zip';
import axios from 'axios';
import qs from 'qs';

import {
    FETCH_JOBS_SUCCESS,
    FETCH_JOBS_FAIL,
    LIKE_JOB,
    DELETE_LIKED_JOB,
    CLEAR_ALL_LIKED_JOBS
} from '../../constants';

const JOB_ROOT_URL = 'http://api.indeed.com/ads/apisearch?';
const JOB_QUERY_PARAMS = {
    publisher: '4201738803816157',
    format: 'json',
    v: '2',
    latlong: 1,
    radius: 10,
    q: 'javascript'
}

const buildJobUrl = (zipcode) => {
    const query = qs.stringify({ ...JOB_QUERY_PARAMS, l: zipcode });
    return `${JOB_ROOT_URL}${query}`;
}

export const fetchJobs = (region, success_callback, fail_callback) => async (dispatch) => {

    // // For testing only
    // console.log('---- fetchJobs ---- ');
    // dispatch({ type: FETCH_JOBS, payload: fakeData });
    // callback();

    try {
        let zipcode = await reverseGeocode(region);
        console.log(1);
        const url = buildJobUrl(zipcode);
        console.log(2);
        let { data } = await axios.get(url);
        console.log(3);
        //console.log(data);
        dispatch({ type: FETCH_JOBS_SUCCESS, payload: data.results });
        console.log(4);
        success_callback();
    } catch (err) {
        console.error(err);
        dispatch({ type: FETCH_JOBS_FAIL, payload: err });
        fail_callback(err);
    }
}

export const likeJob = (job) => {
    return { type: LIKE_JOB, payload: job };
}

export const deleteLikedJob = (job) => {
    return { type: DELETE_LIKED_JOB, payload: job };
}

export const clearJobs = () => {
    return { type: CLEAR_ALL_LIKED_JOBS };
}
