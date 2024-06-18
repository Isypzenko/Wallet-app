import { TIMEOUT_SEC as time } from "./config";
export async function StartStopLoader(fn) {
  const promise2 = new Promise((resolve, reject) => {
    setTimeout(() => reject("Something went wrong"), time * 1000);
  });
  const res = await Promise.race([fn, promise2])
    .then((value) => {
      return value;
    })
    .catch((error) => error);
  return res;
}
