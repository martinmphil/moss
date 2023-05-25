type TMethod = "GET" | "POST";

interface IInitObj {
  method: TMethod;
  headers?: { Authorization: string };
  body?: string;
}

export async function authorizedFetch(
  path = "",
  method: TMethod = "GET",
  upload = ""
): Promise<unknown> {
  const Authorization = sessionStorage.getItem("Authorization");
  if (typeof Authorization != "string" || Authorization.length < 1) {
    console.warn(" Authorization header missing from authorized-fetch. ");
    throw new Error(" Authorization header missing from authorized-fetch. ");
  }

  const gatewayUrl = "https://jwdqdupcfi.execute-api.eu-west-1.amazonaws.com/";
  const url = gatewayUrl + path;

  const initObj: IInitObj = {
    method,
    headers: {
      Authorization,
    },
  };

  if (typeof upload === "string" && upload.length > 0) {
    initObj.body = upload;
  }

  const result = await fetch(url, initObj)
    .then((response) => {
      if (!response.ok) {
        console.warn(response.statusText);
        throw new Error(
          ` Authorized fetch response not ok, ${response.statusText} `
        );
      }
      return response.json();
    })
    .then((dataObj) => {
      if (dataObj.body) {
        return dataObj.body;
      }
      if (dataObj.error) {
        throw new Error(` Error in authorizedFetch:- ${dataObj.error}. `);
      }
      if (dataObj.message) {
        throw new Error(
          ` Message from authorizedFetch is:- ${dataObj.message}. `
        );
      }
      throw new Error(" Response missing from authorizedFetch ");
    })
    .catch((err) => {
      throw new Error(` Failure in authorizedFetch:- ${err}`);
    });

  return result;
}
