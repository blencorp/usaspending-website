/**
 * downloadHelper.js
 * Created by Kevin Li 5/8/17
 */

import Axios, { CancelToken } from 'axios';

import kGlobalConstants from 'GlobalConstants';

import * as MockDownload from './mockDownload';

export const requestAwardTable = (params) => {
    const source = CancelToken.source();
    return {
        promise: Axios.request({
            url: 'v1/download/awards/',
            baseURL: kGlobalConstants.API,
            method: 'post',
            data: params,
            cancelToken: source.token
        }),
        cancel() {
            source.cancel();
        }
    };
};

export const requestFullDownload = (params, type) => {
    const source = CancelToken.source();
    return {
        // promise: Axios.request({
        //     url: `v2/download/${type}/`,
        //     baseURL: kGlobalConstants.API,
        //     method: 'post',
        //     data: params,
        //     cancelToken: source.token
        // }),
        promise: new Promise((resolve) => {
            setTimeout(() => {
                resolve({
                    data: MockDownload.mockStatus
                });
            }, 1000);
        }),
        cancel() {
            source.cancel();
        }
    };
};

export const requestDownloadStatus = (params) => {
    const source = CancelToken.source();
    return {
        // promise: Axios.request({
        //     url: 'v2/download/status/',
        //     baseURL: kGlobalConstants.API,
        //     method: 'get',
        //     params,
        //     cancelToken: source.token
        // }),
        promise: new Promise((resolve) => {
            setTimeout(() => {
                resolve({
                    data: MockDownload.mockStatus
                });
            }, 1000);
        }),
        cancel() {
            source.cancel();
        }
    };
};

export const requestDownloadCount = (params) => {
    const source = CancelToken.source();
    return {
        // promise: Axios.request({
        //     url: 'v2/download/count/',
        //     baseURL: kGlobalConstants.API,
        //     method: 'post',
        //     data: params,
        //     cancelToken: source.token
        // }),
        promise: new Promise((resolve) => {
            setTimeout(() => {
                resolve({
                    data: MockDownload.mockCount
                });
            }, 1000);
        }),
        cancel() {
            source.cancel();
        }
    };
};
