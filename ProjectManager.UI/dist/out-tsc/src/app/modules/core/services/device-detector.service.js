import { __decorate, __param } from "tslib";
import { PLATFORM_ID, Inject, Injectable } from '@angular/core';
import { isPlatformBrowser } from '@angular/common';
import * as Constants from '../../../utilities/device-detector';
import { ReTree } from '@app/utilities';
var DeviceDetectorService = /** @class */ (function () {
    function DeviceDetectorService(platformId) {
        this.platformId = platformId;
        this.ua = '';
        this.userAgent = '';
        this.os = '';
        this.browser = '';
        this.device = '';
        this.os_version = '';
        this.browser_version = '';
        if (isPlatformBrowser(this.platformId)) {
            this.ua = window.navigator.userAgent;
        }
        this._setDeviceInfo();
    }
    /**
     * @desc Sets the initial value of the device when the service is initiated.
     * This value is later accessible for usage
     */
    DeviceDetectorService.prototype._setDeviceInfo = function () {
        var _this = this;
        var reTree = new ReTree();
        var ua = this.ua;
        this.userAgent = ua;
        var mappings = [
            { const: 'OS', prop: 'os' },
            { const: 'BROWSERS', prop: 'browser' },
            { const: 'DEVICES', prop: 'device' },
            { const: 'OS_VERSIONS', prop: 'os_version' },
        ];
        mappings.forEach(function (mapping) {
            _this[mapping.prop] = Object.keys(Constants[mapping.const]).reduce(function (obj, item) {
                obj[Constants[mapping.const][item]] = reTree.test(ua, Constants[mapping.const + "_RE"][item]);
                return obj;
            }, {});
        });
        mappings.forEach(function (mapping) {
            _this[mapping.prop] = Object.keys(Constants[mapping.const])
                .map(function (key) {
                return Constants[mapping.const][key];
            }).reduce(function (previousValue, currentValue) {
                return (previousValue === Constants[mapping.const].UNKNOWN && _this[mapping.prop][currentValue])
                    ? currentValue : previousValue;
            }, Constants[mapping.const].UNKNOWN);
        });
        this.browser_version = '0';
        if (this.browser !== Constants.BROWSERS.UNKNOWN) {
            var re = Constants.BROWSER_VERSIONS_RE[this.browser];
            var res = reTree.exec(ua, re);
            if (!!res) {
                this.browser_version = res[1];
            }
        }
    };
    /**
     * @desc Returns the device information
     * @returns the device information object.
     */
    DeviceDetectorService.prototype.getDeviceInfo = function () {
        var deviceInfo = {
            userAgent: this.userAgent,
            os: this.os,
            browser: this.browser,
            device: this.device,
            os_version: this.os_version,
            browser_version: this.browser_version
        };
        return deviceInfo;
    };
    /**
     * @desc Compares the current device info with the mobile devices to check
     * if the current device is a mobile and also check current device is tablet so it will return false.
     * @returns whether the current device is a mobile
     */
    DeviceDetectorService.prototype.isMobile = function () {
        if (this.isTablet()) {
            return false;
        }
        var mobiles = Constants.MOBILES;
        var isMob = false;
        for (var key in mobiles) {
            if (mobiles.hasOwnProperty(key)) {
                var pattern = new RegExp(mobiles[key]);
                if (pattern.test(this.userAgent)) {
                    isMob = true;
                    break;
                }
            }
        }
        return isMob;
    };
    /**
     * @desc Compares the current device info with the tablet devices to check
     * if the current device is a tablet.
     * @returns whether the current device is a tablet
     */
    DeviceDetectorService.prototype.isTablet = function () {
        var tablets = Constants.TABLETS;
        var isTab = false;
        for (var key in tablets) {
            if (tablets.hasOwnProperty(key)) {
                var pattern = new RegExp(tablets[key]);
                if (pattern.test(this.userAgent)) {
                    isTab = true;
                    break;
                }
            }
        }
        return isTab;
    };
    /**
     * @desc Compares the current device info with the desktop devices to check
     * if the current device is a desktop device.
     * @returns whether the current device is a desktop device
     */
    DeviceDetectorService.prototype.isDesktop = function () {
        var desktopDevices = [
            Constants.DEVICES.PS4,
            Constants.DEVICES.CHROME_BOOK,
            Constants.DEVICES.UNKNOWN
        ];
        if (this.device === Constants.DEVICES.UNKNOWN) {
            if (this.isMobile() || this.isTablet()) {
                return false;
            }
        }
        return desktopDevices.indexOf(this.device) > -1;
    };
    DeviceDetectorService = __decorate([
        Injectable(),
        __param(0, Inject(PLATFORM_ID))
    ], DeviceDetectorService);
    return DeviceDetectorService;
}());
export { DeviceDetectorService };
//# sourceMappingURL=device-detector.service.js.map