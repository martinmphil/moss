import { authorizedFetch } from "./authorizedFetch";
import { renderGreeting } from "./renderGreeting";

export async function fetchEmail() {
  return authorizedFetch("candidate-email")
    .then((emailAddr) => {
      if (typeof emailAddr === "string" && emailAddr.length > 0) {
        renderGreeting(`<p>Hello ${emailAddr}</p>`);
        return emailAddr;
      }
      throw new Error(" Our databank returned an empty email address. ");
    })
    .catch((err) => {
      throw new Error(` We failed to fetch email address:- ${err.toString()} `);
    });
}
