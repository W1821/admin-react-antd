import HttpService from '../../../common/service/HttpService';

class RoleService {

    list = (searchBody) => {
        return HttpService.post('/role/list', searchBody).then(res => res, () => null);
    };

    delete = (id) => {
        return HttpService.get('/role/delete/' + id).then(res => res, () => null);
    };

    add = (body) => {
        return HttpService.post('/role/add', body).then(res => res, () => null);
    };

    update = (body) => {
        return HttpService.post('/role/update', body).then(res => res, () => null);
    };

    query = (id) => {
        return HttpService.get('/role/query/' + id).then(res => res, () => null);
    };

    roleList = () => {
        return HttpService.get('/role/main/list').then(res => res, () => null);
    };
}

const roleService = new RoleService();

export default roleService;
