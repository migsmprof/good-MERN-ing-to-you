import http from '../http.common';

class VoterDataService {
    create(data) {
        return http.post('/voters', data)
    }

    get(id) {
        return http.get(`/voters/${id}`)
    }

    getAll() {
        return http.get('/voters')
    }

    update(id, data) {
        return http.put(`/voters/${id}`, data)
    }

    delete(id) {
        return http.delete(`/voters/${id}`)
    }

    deleteAll() {
        return http.delete('/voters')
    }
}

export default new VoterDataService()