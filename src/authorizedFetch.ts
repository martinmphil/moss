interface InitObj {
  method: string;
  headers?: { Authorization: string };
  body?: string;
}

export async function authorizedFetch(
  path = "",
  method = "GET",
  upload = ""
): Promise<unknown> {
  const Authorization = sessionStorage.getItem("Authorization");
  if (typeof Authorization != "string" || Authorization.length < 1) {
    console.warn(" Authorization header missing from authorized-fetch. ");
    throw new Error(" Authorization header missing from authorized-fetch. ");
  }

  const host = "https://5jjaawclpd.execute-api.eu-west-1.amazonaws.com/";
  const url = host + path;

  const initObj: InitObj = {
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
      if (data.fault) {
        throw new Error(` Fetching data returned error:- ${data.fault}. `);
      }
      throw new Error(" Data missing from fetch response. ");
    });

  return result;
}
