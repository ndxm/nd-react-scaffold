try {
    module.exports = require('CONFIG'); // webpack externals
} catch(e) {
    // 这部分的配置移为外部配置以便使用 spring 自动替换配置
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
