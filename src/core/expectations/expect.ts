import {IMatcher} from "./matchers/IMatcher";

let matchers: IMatcher[] = [];
let expectationAPI = {};
let negatedExpectationAPI = {};

interface INote {
    expectedValue: any;
    actualValue: any;
    result: boolean;
    exception?: Error;
}

let note: INote;

let argsChecker = (matcher, argsLength): boolean => {
    if (argsLength < matcher.minArgs || argsLength > matcher.maxArgs) {
        note.exception = new Error(`${matcher.apiName}(): invalid arguments`);
        return false;
    }
    return true;
};

// add not api to expect api
expectationAPI["not"] = negatedExpectationAPI;

// expect(value)
export let expect = (ev: any): {} => {
    // if a callback was returned then call it and use what it returns for the expected value
    let expectedValue = typeof(ev) === "function" && ev() || ev;
    note = { expectedValue: expectedValue, actualValue: null, result: null, exception: null };
    return expectationAPI;
};

export let registerMatcher = (matcher: IMatcher) => {
    let proxy = (...args): void => {
        if (argsChecker(matcher, args.length)) {
            note.actualValue = matcher.api.apply(null, args);
            // if a callback was returned then call it and use what it returns for the actual value
            note.actualValue = typeof(note.actualValue) === "function" && note.actualValue();
            note.result = matcher.evalueator(note.expectedValue, note.actualValue);
            console.log("note", note);
        }
    };
    let proxyNot = (...args): void => {
        if (argsChecker(matcher, args.length)) {
            note.actualValue = matcher.api.apply(null, args);
            // if a callback was returned then call it and use what it returns for the actual value
            note.actualValue = typeof(note.actualValue) === "function" && note.actualValue();
            note.result = !matcher.evalueator(note.expectedValue, note.actualValue);
        }
    };
    expectationAPI[matcher.apiName] = proxy;
    if (matcher.negator) {
        negatedExpectationAPI[matcher.apiName] = proxyNot;
    }
};