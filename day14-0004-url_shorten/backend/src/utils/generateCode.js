import crypto from "crypto";

/**Genereate 6 character long unique short code for long urls ehich contains only a-z, A-Z, and 0-9 */

const generateCode = () => {
  const mainString =
    "abcdefghijklmnopqrstuvwxyzABCDEFGHIJKLMNOPQRSTUVWXYZ0123456789";
  let shortCode = "";

  for (let i = 0; i < 6; i++) {
    shortCode += mainString.charAt(Math.floor(Math.random() * 62));
  }

  return shortCode;
};

export default generateCode();
