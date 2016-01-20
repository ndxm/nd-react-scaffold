try {
    module.exports = require('CONFIG'); // webpack externals
} catch(e) {
    // �ⲿ�ֵ�������Ϊ�ⲿ�����Ա�ʹ�� spring �Զ��滻����
    if (process.env.NODE_ENV === 'production') {
        module.exports = require('./config.prod');
    }else if (process.env.NODE_ENV === 'beta') {
        module.exports = require('./config.beta');
    }else if (process.env.NODE_ENV === 'debug') {
        module.exports = require('./config.debug');
    } else {
        module.exports = require('./config.dev');
    }
}
