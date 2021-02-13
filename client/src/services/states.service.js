import http from "../http.common";

class StateDataService {
    create(data) {
        return http.post('/states', data);
    }

    get(code) {
        return http.get(`/states/${code}`);
    }

    getAll() {
        return http.get('/states');
    }

    update(code, data) {
        return http.put(`/states/${code}`, data);
    }

    delete(code) {
        return http.delete(`/states/${code}`);
    }

    deleteAll() {
        return http.deleteAll('/states');
    }
}

export default new StateDataService()