import moment from 'moment';
import React from 'react';
import nzh from 'nzh/cn';
import { parse, stringify } from 'qs';

const Storage =  {}

Storage.get = function (name) {
    return JSON.parse(localStorage.getItem(name))
}

Storage.set = function (name, val) {
    localStorage.setItem(name, JSON.stringify(val))
}

Storage.add = function (name, addVal) {
    let oldVal = Storage.get(name)
    let newVal = oldVal.concat(addVal)
    Storage.set(name, newVal)
}

export default Storage
