export function encrypted(s) {
    return new Promise((resolve, reject) => {
      import("crypto-js")
        .then((CryptoJS) => {
          try {
            const key = CryptoJS.enc.Utf8.parse("3ucrdlc6twh84o7h");
            const aes = CryptoJS.AES.encrypt(s, key, {
              mode: CryptoJS.mode.CBC,
              padding: CryptoJS.pad.ZeroPadding,
              iv: key,
            });
            const ct = aes.ciphertext;
            resolve(ct.toString(CryptoJS.enc.Base64));
          } catch (e) {
            console.error("error", e);
            reject(e);
          }
        })
        .catch((e) => {
          reject(e);
        });
    });
  }