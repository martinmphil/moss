import { authorizedFetch } from "./authorizedFetch";
import { renderCrux } from "./renderCrux";
import { warn } from "./warn";
let error = "";

export async function fetchListings() {
  return authorizedFetch("listings")
    .then((listings) => {
      if (typeof listings === "string" && listings.length > 0) {
        renderCrux(listings);
        return listings;
      }
      error += " Our databank returned an empty listings. ";
      warn(error);
      return "";
    })
    .catch((err) => {
      error += ` We failed to fetch listings:- ${JSON.stringify(err)} `;
      warn(error);
      return "";
    });
}
