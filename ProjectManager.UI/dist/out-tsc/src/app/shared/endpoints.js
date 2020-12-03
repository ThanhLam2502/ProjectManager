import { environment } from '@environment';
export var API_URL = !!environment.baseUrl ? "" + environment.baseUrl : "" + window.location.origin;
export var API_ENDPOINT = {
    //
    // Base
    Auth: "api/authentication",
};
//# sourceMappingURL=endpoints.js.map