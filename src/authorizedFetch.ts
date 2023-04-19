type TMethod = "GET" | "PUT";

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

  const gatewayUrl = "https://0swp0tsvvj.execute-api.eu-west-1.amazonaws.com/";
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
    .then((data) => {
      if (data.body) {
        return data.body;
      }
      if (data.error) {
        throw new Error(` Fetching data returned error:- ${data.error}. `);
      }
      if (data.message) {
        throw new Error(` Fetching data returned message:- ${data.message}`);
      }
      throw new Error(" Data missing from fetch response. ");
    })
    .catch((error) => {
      throw new Error(` Authorized fetch failed:- ${error}`);
    });

  return result;
}
