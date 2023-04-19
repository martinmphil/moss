import { sessionStorageOk } from "./sessionStorageOk";
import { sessionStorageFault } from "./sessionStorageFault";
import { saveJwt } from "./saveJwt";
import { warn } from "./warn";

export function setup() {
  window.onunhandledrejection = (event) => {
    warn(`We had an unhandled promise rejection ${event.reason}`);
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
