import { __decorate, __values } from "tslib";
import { HttpHeaders, HttpRequest } from '@angular/common/http';
import { throwError } from 'rxjs';
import { catchError } from 'rxjs/operators';
import { Injectable } from '@angular/core';
import { AppNotify, AppStorage } from '@app/utilities';
import { ACCESS_TOKEN_KEY, AUTH_SCHEME } from '@app/shared/constants';
import { API_URL } from '@app/shared/endpoints';
import { AppUrl } from '@app/shared/app-url';
var ApiService = /** @class */ (function () {
    function ApiService(httpClient, router) {
        this.httpClient = httpClient;
        this.router = router;
    }
    Object.defineProperty(ApiService.prototype, "accessToken", {
        get: function () {
            return AppStorage.getTokenData(ACCESS_TOKEN_KEY);
        },
        enumerable: false,
        configurable: true
    });
    Object.defineProperty(ApiService.prototype, "headerAuthorizationKey", {
        get: function () {
            return AUTH_SCHEME + this.accessToken;
        },
        enumerable: false,
        configurable: true
    });
    Object.defineProperty(ApiService.prototype, "headers", {
        get: function () {
            return new HttpHeaders({
                'Content-Type': 'application/json',
                Accept: 'q=0.8;application/json;q=0.9',
                APIKey: '~123456789~',
                Authorization: this.headerAuthorizationKey
            });
        },
        enumerable: false,
        configurable: true
    });
    Object.defineProperty(ApiService.prototype, "options", {
        get: function () {
            return { headers: this.headers };
        },
        enumerable: false,
        configurable: true
    });
    Object.defineProperty(ApiService.prototype, "formDataHeaders", {
        get: function () {
            return new HttpHeaders({
                Accept: 'application/json',
                Authorization: this.headerAuthorizationKey,
            });
        },
        enumerable: false,
        configurable: true
    });
    ApiService.prototype.get = function (url) {
        var _this = this;
        return this.httpClient
            .get(API_URL + "/" + url, this.options)
            .pipe(catchError(function (error) { return _this.handleError(error, url); }));
    };
    ApiService.prototype.post = function (url, data) {
        var _this = this;
        if (data instanceof FormData) {
            var httpOptions = {
                headers: this.formDataHeaders
            };
            return this.httpClient.post(API_URL + "/" + url, data, httpOptions)
                .pipe(catchError(function (error) { return _this.handleError(error, url); }));
        }
        else {
            return this.httpClient
                .post(API_URL + "/" + url, data, this.options)
                .pipe(catchError(function (error) { return _this.handleError(error, url); }));
        }
    };
    ApiService.prototype.postFile = function (url, files) {
        var e_1, _a;
        var formData = new FormData();
        try {
            for (var files_1 = __values(files), files_1_1 = files_1.next(); !files_1_1.done; files_1_1 = files_1.next()) {
                var file = files_1_1.value;
                formData.append(file.name, file, file.name);
            }
        }
        catch (e_1_1) { e_1 = { error: e_1_1 }; }
        finally {
            try {
                if (files_1_1 && !files_1_1.done && (_a = files_1.return)) _a.call(files_1);
            }
            finally { if (e_1) throw e_1.error; }
        }
        var headers = this.formDataHeaders;
        var uploadReq = new HttpRequest('POST', API_URL + "/" + url, formData, {
            reportProgress: true,
            headers: headers
        });
        return this.httpClient.request(uploadReq);
    };
    ApiService.prototype.update = function (url, data) {
        var _this = this;
        if (data instanceof FormData) {
            var httpOptions = {
                headers: this.formDataHeaders
            };
            return this.httpClient.put(API_URL + "/" + url, data, httpOptions)
                .pipe(catchError(function (error) { return _this.handleError(error, url); }));
        }
        else {
            return this.httpClient
                .put(API_URL + "/" + url, data, this.options)
                .pipe(catchError(function (error) { return _this.handleError(error, url); }));
        }
    };
    ApiService.prototype.delete = function (url) {
        var _this = this;
        var params = new URLSearchParams();
        var options = { headers: this.headers };
        if (params) {
            for (var key in params) {
                if (params.hasOwnProperty(key)) {
                    var val = params[key];
                    params.set(key, val);
                }
            }
            options.search = params;
        }
        return this.httpClient
            .delete(API_URL + "/" + url, options)
            .pipe(catchError(function (error) { return _this.handleError(error, url); }));
    };
    ApiService.prototype.handleError = function (response, requestUrl) {
        //
        if (response.status === 403) {
            return throwError('Permission Denied');
        }
        //
        if (response.status === 500) {
            var error = response.error ? response.error.message : response.statusText;
            if (!error) {
                error = 'Internal Server Error';
            }
            AppNotify.error(error);
            return throwError(response);
        }
        //
        var messageError = '';
        if (response.error instanceof ErrorEvent) {
            // A client-side or network error occurred. Handle it accordingly.
            console.error('An error occurred:', response.error.message);
        }
        else {
            // The backend returned an unsuccessful response code.
            // The response body may contain clues as to what went wrong,
            console.error("Backend returned code " + response.status + ", " +
                ("body was: " + response.error));
        }
        if (!!response.error && !!response.error.message) {
            messageError = response.error.message;
        }
        else {
            messageError = 'Something Bad Happened';
        }
        AppNotify.error(messageError);
        // return an observable with a user-facing error message
        return throwError(messageError);
    };
    ApiService.prototype.navigateToForbidden = function () {
        this.router.navigate([AppUrl.Forbidden]);
    };
    ApiService.prototype.navigateToLogin = function (callbackUrl) {
        if (callbackUrl === void 0) { callbackUrl = false; }
        var pathname = window.location.pathname;
        if (pathname === '/' || pathname === '/login') {
            pathname = null;
        }
        //
        //
        if (pathname && callbackUrl === true) {
            // window.location.href = `${AppUrl.Login}?callback=${callback}`;
            this.router.navigate(["/" + AppUrl.Login], {
                queryParams: { callback: encodeURIComponent(window.location.href) }
            });
        }
        else {
            // window.location.href = `${AppUrl.Login}`;
            this.router.navigate(["/" + AppUrl.Login]);
        }
    };
    ApiService = __decorate([
        Injectable()
    ], ApiService);
    return ApiService;
}());
export { ApiService };
//# sourceMappingURL=api.service.js.map