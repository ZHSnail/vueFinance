"use strict";

import Vue from 'vue';
import axios from "axios";
import { Message, Loading } from 'element-ui'
// Full config:  https://github.com/axios/axios#request-config
// axios.defaults.baseURL = process.env.baseURL || process.env.apiUrl || '';
// axios.defaults.headers.common['Authorization'] = AUTH_TOKEN;
// axios.defaults.headers.post['Content-Type'] = 'application/x-www-form-urlencoded';

let config = {
    baseURL: 'http://127.0.0.1',
    timeout: 60 * 1000,
    withCredentials: true,
    // responseType: "blob"
    // baseURL: process.env.baseURL || process.env.apiUrl || ""
    // timeout: 60 * 1000, // Timeout
    // withCredentials: true, // Check cross-site Access-Control
};
let loadingInstance = null
const _axios = axios.create(config);

_axios.interceptors.request.use(
    function(config) {
        config.headers.Authorization = window.sessionStorage.getItem('token');
        loadingInstance = Loading.service({
                lock: true,
                text: '正在加载...',
            })
            // Do something before request is sent
        return config;
    },
    function(error) {
        Message.error('请求错误');
        // Do something with request error
        return Promise.reject(error);
    }
);

// Add a response interceptor
_axios.interceptors.response.use(
    function(response) {
        loadingInstance.close()
        if (response.data.code == 500) {
            Message.error(response.data.msg);
            return new Promise(() => {
                console.log(response.data.msg)
            })
        } else if (response.data.code == 404) {
            Message.error('接口不存在');
            return new Promise(() => {
                console.log(response.data.msg)
            })
        } else if (response.data.code == 200) {
            return response.data;
        } else if (response.data.code == 400) {
            Message.error(response.data.msg);
            return new Promise(() => {
                console.log(response.data.msg)
            })
        } else if (response.data.code == "401") {
            Message.error('权限不足！！');
            return new Promise(() => {
                console.log(response.data.msg)
            })
        } else if (response.data.code == "501") {
            Message.error(response.data.msg);
            return new Promise(() => {
                console.log(response.data.msg)
            })
        } else if (response.data.code == "500") {
            Message.error(response.data.msg);
            return new Promise(() => {
                console.log(response.data.msg)
            })
        }
        return response;
        // Do something with response data
    },
    function(error) {
        loadingInstance.close();
        Message.error('未知错误');
        // Do something with response error
        return Promise.reject(error);
    }
);

Plugin.install = function(Vue, options) {
    Vue.axios = _axios;
    window.axios = _axios;
    Object.defineProperties(Vue.prototype, {
        axios: {
            get() {
                return _axios;
            }
        },
        $axios: {
            get() {
                return _axios;
            }
        },
    });
};

Vue.use(Plugin)

export default {
    Plugin,
    config,
    _axios,
};