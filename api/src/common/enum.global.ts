export enum StatusCode {
    OK = 200,
    CREATED = 201,


    BAD_REQUEST = 400,
    UNAUTHORIZED = 401,
    FORBIDDEN = 403,
    NOT_FOUND = 404,
    METHOD_NOT_ALOWED = 405,
    NOT_ACCEPTABLE = 406,
    UNSUPPORTED_MEDIA_TYPE = 415,
    TOO_MANY_REQUESTs = 429,

    INTERNAL_SERVER_ERROR = 500,
    BAD_GATEWAY = 502,
    SERVICE_UNAVAILABLE = 503,
}

export enum StatusMessage {
    OK = "200: The request has succeeded.",
    CREATED = "201: The request has been fulfilled and resulted in a new resource being created.",

    BAD_REQUEST = "400: The server could not understand the request due to invalid syntax.",
    UNAUTHORIZED = "401: The client must authenticate itself to get the requested response.",
    FORBIDDEN = "403: The client does not have access rights to the content.",
    NOT_FOUND = "404: The server can not find the requested resource.",
    METHOD_NOT_ALLOWED = "405: The method specified in the request is not allowed.",
    NOT_ACCEPTABLE = "406: The server cannot produce a response matching the list of acceptable values defined in the request's headers.",
    UNSUPPORTED_MEDIA_TYPE = "415: The media format of the requested data is not supported by the server.",
    TOO_MANY_REQUESTS = "429: The user has sent too many requests in a given amount of time (rate limiting).",

    INTERNAL_SERVER_ERROR = "500: The server has encountered a situation it doesn't know how to handle.",
    BAD_GATEWAY = "502: The server was acting as a gateway or proxy and received an invalid response from the upstream server.",
    SERVICE_UNAVAILABLE = "503: The server is not ready to handle the request."
}

export enum HttpError{
    OK = "200",
    CREATED = "201",


    BAD_REQUEST = "400",
    UNAUTHORIZED = "401",
    FORBIDDEN = "403",
    NOT_FOUND = "404",
    METHOD_NOT_ALOWED = "405",
    NOT_ACCEPTABLE = "406",
    UNSUPPORTED_MEDIA_TYPE = "415",
    TOO_MANY_REQUESTs = "429",

    INTERNAL_SERVER_ERROR = "500",
    BAD_GATEWAY = "502",
    SERVICE_UNAVAILABLE = "503",

}