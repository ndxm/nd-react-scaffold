'use strict'

import CacheStore from 'memory-cache';

/**
 * 为 service 增加 cache, cache 对象必须要是从 baseService 衍生的
 *
 * @param service
 * @param ttl
 * @returns {*}
 */
export default function cachify(service, ttl=60000) { //ttl 6000 millisecond
    return service;
    if(!service) throw new Error('service not defined');

    let oriRequest = service.request;
    if(typeof oriRequest == 'undefined' || typeof oriRequest !== 'function') return service;

    function cachedRequest(params) {
        let key = '_service_' + JSON.stringify(params);
        let cached = CacheStore.get(key)
        if (cached) {
            return Promise.resolve(cached);
        }else{
            let promise = oriRequest(params);
            return new Promise((resolve, reject) => {
                promise.then(data=>{
                    CacheStore.put(key, data, ttl);
                    resolve(data);
                }).catch(e=>reject(e));
            });
        }
    }
    service.request = cachedRequest.bind(service);
    return service;
}
