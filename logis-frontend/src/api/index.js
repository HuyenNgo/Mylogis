
import axios from 'axios';
import { notifier } from '../helpers'




const remoteApiUrl = 'http://52.168.24.38:9911'

export const getAllProvinceProxy = (queryObject, successCallbackFn = undefined, errorCallbackFn = undefined) => {
    const fullUrl = remoteApiUrl + `/address/get-all-province`
    axios.get(fullUrl)
        .then(res => _handleResultStatus(res, successCallbackFn))
        .catch(error => _handleError(error, errorCallbackFn));
}

export const getAllDistrictProxy = (queryObject, successCallbackFn = undefined, errorCallbackFn = undefined) => {
    const fullUrl = remoteApiUrl + `/address/get-all-district`
    axios.get(fullUrl)
        .then(res => _handleResultStatus(res, successCallbackFn))
        .catch(error => _handleError(error, errorCallbackFn));
}

export const getAllWardProxy = (queryObject, successCallbackFn = undefined, errorCallbackFn = undefined) => {
    const fullUrl = remoteApiUrl + `/address/get-all-ward`
    axios.get(fullUrl)
        .then(res => _handleResultStatus(res, successCallbackFn))
        .catch(error => _handleError(error, errorCallbackFn));
}

export const loginProxy = (queryObject, successCallbackFn = undefined, errorCallbackFn = undefined) => {
    const fullUrl = remoteApiUrl + `/user/login`
    axios.post(fullUrl,queryObject)
        .then(res => _handleResultStatus(res, successCallbackFn))
        .catch(error => _handleError(error, errorCallbackFn));
}

export const getSuggestionsProxy = (queryObject, successCallbackFn = undefined, errorCallbackFn = undefined) => {
    const fullUrl = remoteApiUrl + `/trans/get-suggestions`
    axios.post(fullUrl,queryObject)
        .then(res => _handleResultStatus(res, successCallbackFn))
        .catch(error => _handleError(error, errorCallbackFn));
}

export const getAllOrderProxy = (queryObject, successCallbackFn = undefined, errorCallbackFn = undefined) => {
    const fullUrl = remoteApiUrl + `/trans/orders?cusId=${queryObject.cusID}`
    axios.get(fullUrl)
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