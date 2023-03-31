import { sessionStorageOk } from "./sessionStorageOk";
import { sessionStorageFault } from "./sessionStorageFault";
import { saveJwt } from "./saveJwt";
import { fault } from "./fault";

export function setup() {
  window.onunhandledrejection = (event) => {
    fault();
    console.warn(`We had an unhandled promise rejection ${event.reason}`);
  };

  if (sessionStorageOk() === false) {
    sessionStorageFault();
    return false;
  }

  saveJwt();
  const Authorization = sessionStorage.getItem("Authorization");
  if (typeof Authorization === "string" && Authorization.length > 0) {
    return true;
  }

  return false;
}
