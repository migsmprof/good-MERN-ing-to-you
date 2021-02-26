import http from '../http.common';

class CountyDataService {
    create(data) {
        return http.post('/counties', data)
    }

    get(code) {
        return http.get(`/counties/${code}`)
    }

    getAll(query) {
		if (query) {
			return http.get(`/counties?home_state=${query.home_state}`)
		}
        return http.get('/counties')
    }

    update(code, data) {
        return http.put(`/counties/${code}`, data)
    }

    delete(code) {
        return http.delete(`/counties/${code}`)
    }

    deleteAll() {
        return http.delete('/counties')
    }
}

export default new CountyDataService()