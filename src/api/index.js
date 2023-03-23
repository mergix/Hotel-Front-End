import axios from 'axios'

export const BASE_URL = 'https://localhost:7099/';

export const ENDPOINTS = {
    room: 'Room',
    user:'User',
    booking : 'Booking'
}

export const createAPIEndpoint = endpoint => {

    let url = BASE_URL + 'api/' + endpoint + '/';
    return {
        fetch: () => axios.get(url),
        fetchById: id => axios.get(url + id),
        post: newRecord => axios.post(url,newRecord),
        postB: (userid,roomid,newRecord) => axios.post(url + userid +'/'+roomid,newRecord),
        put: (id, updatedRecord) => axios.put(url + id, updatedRecord),
        delete: id => axios.delete(url + id),
    }
}