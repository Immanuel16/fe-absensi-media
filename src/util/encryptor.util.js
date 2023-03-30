import CryptoJS from "crypto-js";

export function base64Decrypt(data) {
  return CryptoJS.enc.Utf8.stringify(CryptoJS.enc.Base64.parse(data));
}

export function base64Encrypt(data) {
  return CryptoJS.enc.Base64.stringify(CryptoJS.enc.Utf8.parse(data));
}
