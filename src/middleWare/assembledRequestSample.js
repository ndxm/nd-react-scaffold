/**
 * just a format sample of assembled api request action
 * Created by hjx on 12/14/2015.
 */
import { ASSEMBLED_REQUESTS, FILTER, LINK_REQUESTS_MODE, ZIP_REQUESTS_MODE, SINGLE_REQUEST_MODE,
    LINK_INDETERMINATE_REQUESTS_MODE, ZIP_INDETERMINATE_REQUESTS_MODE, TRANSFORMER_MODE } from './assembledApiRequester.js'

const XXX1_REQUEST = Symbol('XXX1 request');
const XXX1_SUCCESS = Symbol('XXX1 success');
const XXX1_FAILURE = Symbol('XXX1 failure');
const XXX2_REQUEST = Symbol('XXX2 request');
const XXX2_SUCCESS = Symbol('XXX2 success');
const XXX2_FAILURE = Symbol('XXX2 failure');
const XXX3_REQUEST = Symbol('XXX3 request');
const XXX3_SUCCESS = Symbol('XXX3 success');
const XXX3_FAILURE = Symbol('XXX3 failure');

const XYZ_SYMBOL   = Symbol('xyz');

let singleRequest = {
    [ASSEMBLED_REQUESTS]: {
        assembleMode: SINGLE_REQUEST_MODE,                           // required.
        actionTypes: [XXX1_REQUEST, XXX1_SUCCESS, XXX1_FAILURE],     // required. each action type can be null
        inMap: (lastResponse) => { return lastResponse },            // optional.
        service: (lastResponse, lastError) => {},                    // required.
        outMap: (response) => { return response },                   // optional.
        modifyActionError: (err) => { return err },
        modifyActionResponse: (response) => { return response },    // optional.
        onSuccess: (response) => {},                                 // optional.
        onFailure: (err) => {},                                      // optional.
        throwException: true,                                        // optional, default value: false
    },
    [FILTER]: {                                                  // optional
        symbol: XYZ_SYMBOL,                                      // required
        param: {},                                               // optional
        timeInterval: 1000,                                      // optional, milliseconds, default value: 1000
        onDiscard: () => {}                                      // optional
    }
};

let linkedRequests = {
    [ASSEMBLED_REQUESTS]: {
        assembleMode: LINK_REQUESTS_MODE,
        requests: [
            {
                assembleMode: SINGLE_REQUEST_MODE,                           // required.
                actionTypes: [XXX1_REQUEST, XXX1_SUCCESS, XXX1_FAILURE],     // required. each action type can be null
                inMap: (lastResponse) => { return lastResponse },            // optional.
                service: (lastResponse, lastError) => {},                    // required.
                outMap: (response) => { return response },                   // optional.
                modifyActionResponse: (response) => { return {payload} },    // optional.
                onSuccess: (response) => {},                                 // optional.
                onFailure: (err) => {},                                      // optional.
                throwException: true                                         // optional, default value: false
            },
            {
                assembleMode: LINK_REQUESTS_MODE,                            // required
                requests: []                                                 // required
            },
            {
                assembleMode: ZIP_REQUESTS_MODE,                             // required
                requests: [],                                                // required
                zip: (responses, errors) => {}                               // optional
            },
            {
                assembleMode: LINK_INDETERMINATE_REQUESTS_MODE,              // required
                getRequests: (lastResponse, lastError) => {}                 // required
            },
            {
                assembleMode: ZIP_INDETERMINATE_REQUESTS_MODE,               // required
                getRequests: (lastResponse, lastError) => {},                // required
                zip: (responses, errors) => {}                                // optional
            }
        ],
    }
};

let zippedRequests = {
    [ASSEMBLED_REQUESTS]: {
        assembleMode: ZIP_REQUESTS_MODE,
        requests: [
            {
                assembleMode: SINGLE_REQUEST_MODE,                           // required.
                actionTypes: [XXX1_REQUEST, XXX1_SUCCESS, XXX1_FAILURE],     // required. each action type can be null
                inMap: (lastResponse) => { return lastResponse },            // optional.
                service: (lastResponse, lastError) => {},                    // required.
                outMap: (response) => { return response },                   // optional.
                modifyActionResponse: (response) => { return {payload} },    // optional.
                onSuccess: (response) => {},                                 // optional.
                onFailure: (err) => {},                                      // optional.
                throwException: true                                         // optional, default value: false
            },
            {
                assembleMode: LINK_REQUESTS_MODE,                            // required
                requests: []                                                 // required
            },
            {
                assembleMode: ZIP_REQUESTS_MODE,                             // required
                requests: [],                                                // required
                zip: (responses, errors) => {}                               // optional
            },
            {
                assembleMode: LINK_INDETERMINATE_REQUESTS_MODE,              // required
                getRequests: (lastResponse, lastError) => {}                 // required
            },
            {
                assembleMode: ZIP_INDETERMINATE_REQUESTS_MODE,               // required
                getRequests: (lastResponse, lastError) => {},                // required
                zip: (responses, errors) => {}                                // optional
            }
        ],

        /**
         * do something to convert responses(an array) and errors(an array) to something you want, then return it.
         *
         * @param responses: an array, responses of requests, responses.length === requests.length
         * @param errors: an array, errors of requests, errors.length === requests.length
         *
         * return: the return value is the input argument 'lastResponse' of the next request
         */
        zip: (responses, errors) => { return XXX }  // optional. a default zip function will be used if you didn't setup a zip function
    }
}

let linkedIndeterminateRequests = {
    [ASSEMBLED_REQUESTS]: {
        assembleMode: LINK_INDETERMINATE_REQUESTS_MODE,                   // required
        /**
         * return a requests array which will be treated as in LINK_REQUESTS_MODE
         * @param lastResponse
         * @param lastError
         */
        getRequests: (lastResponse, lastError) => { return [] },          // required
    }
};

let zippedIndeterminateRequests = {
    [ASSEMBLED_REQUESTS]: {
        assembleMode: ZIP_INDETERMINATE_REQUESTS_MODE,               // required
        /**
         * return a requests array which will be treated as in ZIP_REQUESTS_MODE
         * @param lastResponse
         * @param lastError
         */
        getRequests: (lastResponse, lastError) => { return [] },     // required

        /**
         * do something to convert responses(an array) and errors(an array) to something you want, then return it.
         *
         * @param responses: an array, responses of requests, responses.length === requests.length
         * @param errors: an array, errors of requests, errors.length === requests.length
         *
         * return: the return value is the input argument 'lastResponse' of the next request
         */
        zip: (responses, errors) => { return XXX }  // optional. a default zip function will be used if you didn't setup a zip function
    }
};

let transformerRequests = {
    [ASSEMBLED_REQUESTS]: {
        assembleMode: TRANSFORMER_MODE,           // required
        /**
         * transform this request to a new request. new request can be a request of
         *      SINGLE_REQUEST_MODE | LINK_REQUESTS_MODE | ZIP_REQUESTS_MODE | LINK_INDETERMINATE_REQUESTS_MODE |
         *      ZIP_INDETERMINATE_REQUESTS_MODE | TRANSFORMER_MODE
         *
         * @param lastResponse
         * @param lastError
         * return: a new request
         */
        transform: (lastResponse, lastError) => { return newRequest; }  // required
    }
}
