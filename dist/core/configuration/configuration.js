/**
 * Environment Dependent Configuration
 */
"use strict";
// import {environment} from "../environment/environment";
var environment_1 = require("../environment/environment");
require("../../polyfills/Object.assign"); // prevent eliding import
// TODO(js): clean up configuration - remove shortCircuit, windowGlobals and make uiTestContainerId conditional
var defaultConfiguration = {
    // windowGlobals: true,
    timeoutInterval: 5000,
    name: "Suite",
    uiTestContainerId: "preamble-ui-container",
    hidePassedTests: typeof window !== "undefined" ? false : true,
    shortCircuit: false
};
if (environment_1.pGlobal.preambleConfig) {
    exports.configuration = Object.assign({}, defaultConfiguration, environment_1.pGlobal.preambleConfig);
}
else {
    exports.configuration = defaultConfiguration;
}
// log merged configuration
// console.log("configuration", configuration);
//# sourceMappingURL=configuration.js.map