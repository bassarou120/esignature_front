var CryptoJS = require("crypto-js");
export function decrypt(string) {
    return JSON.parse(CryptoJS.AES.decrypt(string, 'esign-DINE-07').toString(CryptoJS.enc.Utf8));
}
