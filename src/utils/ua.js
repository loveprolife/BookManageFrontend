const ua = navigator.userAgent;
const os = {};
const browser = {};
const webkit = ua.match(/WebKit\/([\d.]+)/);
const android = ua.match(/(Android)\s+([\d.]+)/);
const ipad = ua.match(/(iPad).*OS\s([\d_]+)/);
const iphone = !ipad && ua.match(/(iPhone\sOS)\s([\d_]+)/);
const kindle = ua.match(/Kindle\/([\d.]+)/);
const silk = ua.match(/Silk\/([\d._]+)/);
const uc = ua.match(/UC/) || window.ucweb || window.ucbrowser;
const wechat = ua.match(/MicroMessenger/);
const andedu = ua.match(/andedu_app/i);
const tysx = ua.match(/tysx_app/i);
const client = (window.location.search.match(new RegExp('(?:\\?|&)client=(.*?)(?=&|$)')) || ['', ''])[1];
let qq = false;

browser.webkit = !!webkit;
os.device = '';

if (browser.webkit) {
    browser.version = webkit[1];
}

if (android) {
    os.android = true;
    os.version = android[2];
}

if (iphone) {
    os.ios = true;
    os.iphone = true;
    os.version = iphone[2].replace(/_/g, '.');
    os.device = 'mobile';
}

if (ipad) {
    os.ios = true;
    os.ipad = true;
    os.version = ipad[2].replace(/_/g, '.');
    os.device = 'pad';
}

if (kindle) {
    os.kindle = true; os.version = kindle[1];
    os.device = 'kindle';
}

if (silk) {
    browser.silk = true; browser.version = silk[1];
    os.device = 'silk';
}

if (!silk && os.android && ua.match(/Kindle Fire/)) {
    browser.silk = true;
    os.device = 'silk';
}

if (uc) {
    browser.uc = true;
    const ucstr = ua.substring(ua.indexOf('UC'), ua.length);
    let uclen = ucstr.indexOf(' ');
    uclen = uclen > -1 ? uclen : ucstr.length;
    browser.version = ucstr.substring(ucstr.indexOf('/') + 1, uclen);
}

if (wechat) {
    browser.wechat = true;
} else {
    browser.wechat = client === 'wechat';
}

if (browser.wechat) {
    os.device = 'wechat';
}


if (andedu) {
    browser.andedu = true;
} else {
    browser.andedu = client === 'andedu';
}

if (tysx) {
    browser.tysx = true;
} else {
    browser.tysx = client === 'tysx';
}

if (browser.andedu || browser.tysx) {
    os.device = 'app';
}

if (!android && !ipad && !iphone && !kindle && !silk && !wechat && !uc) {
    browser.desktop = true;
    os.device = 'pc';
}

// 安卓手机 qq内置包含MQQBrowser 且之后还包含QQ
if (os.android) {
    qq = (/MQQBrowser/i.test(ua) && /QQ/i.test(ua.split('MQQBrowser')));
}
// ios手机 qq内置包含空格QQ
if (os.ios) {
    qq = / QQ/i.test(ua);
}

export default {
    os,
    browser,
    qq,
};
