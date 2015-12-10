require('es6-promise').polyfill();
require('isomorphic-fetch');

import authUtils from '../src/utils/authUtils';
import service from '../src/services/appService.js';
import chai, {expect} from 'chai';
import sinon from 'sinon';
import storageMock from './test_helper.js';

describe('appService', function () {
    it('get 1 item with getTaskList' , function () {

        //模拟 nodejs 中没有的 localStorage
        //global.localStorage = storageMock();

        //自定义 Authorization 请求头
        let stub = sinon.stub(authUtils, 'getAuthHeader');
        stub.returns('Custom auth header goes here');

        let result = service.getTaskList(1,0);
        stub.restore();
        return result.then(function(data){
            expect(data.page.page).to.equal(1);
        });
    });
});
