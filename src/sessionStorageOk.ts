export function sessionStorageOk(): boolean {
  let storage:
    | {
        setItem: (arg0: string, arg1: string) => void;
        removeItem: (arg0: string) => void;
        length: number;
      }
    | undefined;
  try {
    storage = window["sessionStorage"];
    const x = "__storage_test__";
    storage.setItem(x, x);
    storage.removeItem(x);
    return true;
  } catch (err) {
    if (!storage) {
      return false;
    }
    return (
      err instanceof DOMException &&
      // everything except Firefox
      (err.code === 22 ||
        // Firefox
        err.code === 1014 ||
        // test name field too, because code might not be present
        // everything except Firefox
        err.name === "QuotaExceededError" ||
        // Firefox
        err.name === "NS_ERROR_DOM_QUOTA_REACHED") &&
      // acknowledge QuotaExceededError only if there's something already stored
      storage &&
      storage.length !== 0
    );
  }
}

// Sources
// https://developer.mozilla.org/en-US/docs/Web/API/Web_Storage_API/Using_the_Web_Storage_API#testing_for_availability
