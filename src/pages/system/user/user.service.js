import HttpService from '../../../common/service/HttpService';

class UserService {

    list = (searchBody) => {
        return HttpService.post('/user/list', searchBody).then(res => res, () => null);
    };

    delete = (id) => {
        return HttpService.get('/user/delete/' + id).then(res => res, () => null);
    };

    add = (body) => {
        return HttpService.post('/user/add', body).then(res => res, () => null);
    };

    update = (body) => {
        return HttpService.post('/user/update', body).then(res => res, () => null);
    };

    query = (id) => {
        return HttpService.get('/user/query/' + id).then(res => res, () => null);
    };

    roleList = () => {
        return HttpService.get('/role/main/list').then(res => res, () => null);
    };

}

const userService = new UserService();

export default userService;
