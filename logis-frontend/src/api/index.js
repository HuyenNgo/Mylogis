
import axios from 'axios';
import { notifier } from '../helpers'




const remoteApiUrl = 'http://104.45.196.189:9911'

export const getAllProvinceProxy = (queryObject, successCallbackFn = undefined, errorCallbackFn = undefined) => {
    const fullUrl = remoteApiUrl + `/address/get-all-province`
    return axios.get(fullUrl)
        .then(res => _handleResultStatus(res, successCallbackFn))
        .catch(error => _handleError(error, errorCallbackFn));
}

export const getAllDistrictProxy = (queryObject, successCallbackFn = undefined, errorCallbackFn = undefined) => {
    const fullUrl = remoteApiUrl + `/address/get-all-district`
    return axios.get(fullUrl)
        .then(res => _handleResultStatus(res, successCallbackFn))
        .catch(error => _handleError(error, errorCallbackFn));
}

export const getAllWardProxy = (queryObject, successCallbackFn = undefined, errorCallbackFn = undefined) => {
    const fullUrl = remoteApiUrl + `/address/get-all-ward`
    return axios.get(fullUrl)
        .then(res => _handleResultStatus(res, successCallbackFn))
        .catch(error => _handleError(error, errorCallbackFn));
}

export const loginProxy = (queryObject, successCallbackFn = undefined, errorCallbackFn = undefined) => {
    const fullUrl = remoteApiUrl + `/user/login`
    axios.post(fullUrl, queryObject)
        .then(res => _handleResultStatus(res, successCallbackFn))
        .catch(error => _handleError(error, errorCallbackFn));
}

export const getSuggestionsProxy = (queryObject, successCallbackFn = undefined, errorCallbackFn = undefined) => {
    const fullUrl = remoteApiUrl + `/trans/get-suggestions`
    axios.post(fullUrl, queryObject)
        .then(res => _handleResultStatus(res, successCallbackFn))
        .catch(error => _handleError(error, errorCallbackFn));
}

export const getAllOrderProxy = (queryObject, successCallbackFn = undefined, errorCallbackFn = undefined) => {
    let fullUrl = remoteApiUrl + `/trans/orders-by-customerId?customerId=${queryObject.cusID}`
    if (queryObject.queryType && queryObject.queryType == "BYCOMPANY") {
        fullUrl = remoteApiUrl + `/trans/orders-by-companyId?companyId=${queryObject.cusID}`
    }
    axios.get(fullUrl)
        .then(res => _handleResultStatus(res, successCallbackFn))
        .catch(error => _handleError(error, errorCallbackFn));
}


export const updateOrderProxy = (queryObject, successCallbackFn = undefined, errorCallbackFn = undefined) => {
    const fullUrl = remoteApiUrl + `/trans/update-status-order?orderId=${queryObject.orderId}&rulrateId=${queryObject.rulrateId}&status=${queryObject.status}`
    axios.get(fullUrl)
        .then(res => _handleResultStatus(res, successCallbackFn))
        .catch(error => _handleError(error, errorCallbackFn));
}

export const updateOrder2Proxy = (queryObject, successCallbackFn = undefined, errorCallbackFn = undefined) => {
    const fullUrl = remoteApiUrl + `/trans/update-status-order?orderId=${queryObject.orderId}&status=${queryObject.status}`
    axios.get(fullUrl)
        .then(res => _handleResultStatus(res, successCallbackFn))
        .catch(error => _handleError(error, errorCallbackFn));
}

export const createOrderProxy = (queryObject, successCallbackFn = undefined, errorCallbackFn = undefined) => {
    const fullUrl = remoteApiUrl + `/trans/create-order`
    axios.post(fullUrl, queryObject)
        .then(res => _handleResultStatus(res, successCallbackFn))
        .catch(error => _handleError(error, errorCallbackFn));
}

const _handleResultStatus = (res, callbackFn = undefined) => {
    if (res.status == 200) {
        if (callbackFn) callbackFn(res.data)
    }
}

const _handleError = (error, errorCallbackFn = undefined) => {
    if (errorCallbackFn) errorCallbackFn(error)
    console.error('There was an error!', error);
    notifier.hideWaiting()
    notifier.showErrorMessage("Internal Server")
    throw error
}