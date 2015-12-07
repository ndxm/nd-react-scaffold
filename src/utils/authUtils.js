//import Crypto from 'crypto-js';
import HmacSHA256 from 'crypto-js/hmac-sha256';
import Base64 from 'crypto-js/enc-base64';
//import {'hmac-sha256' as HmacSHA256, 'enc-base64' as Base64 } from 'crypto-js.hmac-sha256';

export default {
    getAuthHeader ({url, accessToken, macKey, host=null, method="get"}) {
        //URI转码
        url = encodeURI(url);
        /**
         * @return {Promise}
         */
        let localToken = {};
        if(localStorage.token){
            //try
            //{
            //    localToken = JSON.parse(localStorage.token);
            //}catch(e){
            //    localStorage.removeItem('token');
            //}
        }

        let _accessToken = accessToken || localStorage.access_token;
        let _macKey = macKey || localStorage.mac_key;

        if (!_accessToken || !_macKey) {
            return;
        }

        if (!HmacSHA256) {
            console.error('please include crypto lib in the page.')
        }

        var strAuth = `MAC id="${_accessToken}",nonce="`;
        var nonce = new Date().getTime() + ':' + this.randomCode();
        strAuth += nonce + '",mac="';

        var path;
        var pos = url.indexOf("://");
        if (pos > 0) {// for cross domain requesting
            path = url.substring(pos + 3);
            pos = path.indexOf("/");
            host = path.substr(0, pos);
            path = path.substring(pos);
        } else {
            if(!host){
                console.error('parameter "host" is missed.');
                return;
            }
            path = url;
        }
        var requestContent = nonce + '\n' + method.toUpperCase()  + '\n' + path + '\n' + host + '\n';
        var hash = HmacSHA256(requestContent, _macKey);
        var mac = hash.toString(Base64);
        strAuth += mac + '"';
        return strAuth;

    },

    randomCode () {
        var code = "";
        var codeLength = 8;//验证码的长度
        var chars = [0, 1, 2, 3, 4, 5, 6, 7, 8, 9, 'a', 'b', 'c', 'd', 'e', 'f', 'g', 'h', 'i', 'j', 'k', 'l', 'm', 'n', 'o', 'p', 'q', 'r', 's', 't', 'u', 'v', 'w', 'x', 'y', 'z'];
        //所有候选组成验证码的字符，当然也可以用中文的

        for (var i = 0; i < codeLength; i++) {
            var charIndex = Math.floor(Math.random() * 36);
            code += chars[charIndex];
        }
        return code;
    },
    saveAuth(accessToken,macKey, userInfo={}){
        localStorage.user_info = JSON.stringify(userInfo);
        localStorage.access_token = accessToken;
        localStorage.mac_key = macKey;
    },
    getAuth(){
        return {
            userInfo : localStorage.user_info ? JSON.parse(localStorage.user_info) : null,
            accessToken : localStorage.access_token || null,
            macKey : localStorage.mac_key || null
        }
    },
    cleanAuth(){
        delete localStorage.user_info;
        delete localStorage.access_token;
        delete localStorage.mac_key;
    }
};
