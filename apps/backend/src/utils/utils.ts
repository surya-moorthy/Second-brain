import randomstring from "randomstring";

export function generateRandomString(length : number) {
      return randomstring.generate({length});
}