var isUndefined = function (value) { return value === undefined; };
var isNull = function (value) { return value === null; };
var isObject = function (value) { return value === Object(value); };
var isArray = function (value) { return Array.isArray(value); };
var isDate = function (value) { return value instanceof Date; };
var isBlob = function (value) {
    return value &&
        typeof value.size === 'number' &&
        typeof value.type === 'string' &&
        typeof value.slice === 'function';
};
var isFile = function (value) {
    return isBlob(value) &&
        typeof value.name === 'string' &&
        (typeof value.lastModifiedDate === 'object' ||
            typeof value.lastModified === 'number');
};
/**
 * A convenient function that converts an object to a FormData instance
 *
 * @param obj: key-value mapping, values can be primitives or objects
 * @param cfg: Optional
 * indices: include array indices in FormData keys
 * nullsAsUndefineds: treat null values like undefined values and ignore them
 * @param fd: Existing FormData
 * @param pre: Key prefix
 */
export function objectToFormData(obj, cfg, fd, pre) {
    cfg = cfg || {};
    cfg.indices = isUndefined(cfg.indices) ? true : cfg.indices;
    cfg.nullsAsUndefineds = isUndefined(cfg.nullsAsUndefineds) ? false : cfg.nullsAsUndefineds;
    fd = fd || new FormData();
    if (isUndefined(obj)) {
        return fd;
    }
    else if (isNull(obj)) {
        if (!cfg.nullsAsUndefineds) {
            fd.append(pre, '');
        }
    }
    else if (isArray(obj)) {
        if (!obj.length) {
            var key = pre + '[]';
            fd.append(key, '');
        }
        else {
            obj.forEach(function (value, index) {
                var key = pre + '[' + (cfg.indices ? index : '') + ']';
                objectToFormData(value, cfg, fd, key);
            });
        }
    }
    else if (isDate(obj)) {
        fd.append(pre, obj.toISOString());
    }
    else if (isObject(obj) && !isFile(obj) && !isBlob(obj)) {
        Object.keys(obj).forEach(function (prop) {
            var value = obj[prop];
            if (isArray(value)) {
                while (prop.length > 2 && prop.lastIndexOf('[]') === prop.length - 2) {
                    prop = prop.substring(0, prop.length - 2);
                }
            }
            var key = pre ? pre + '[' + prop + ']' : prop;
            objectToFormData(value, cfg, fd, key);
        });
    }
    else {
        fd.append(pre, obj);
    }
    return fd;
}
//# sourceMappingURL=formdata.js.map