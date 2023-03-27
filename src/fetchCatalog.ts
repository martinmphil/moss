import { authorizedFetch } from "./authorizedFetch";
import { renderCrux } from "./renderCrux";

export async function fetchCatalog() {
  return authorizedFetch("catalog")
    .then((catalog) => {
      if (typeof catalog === "string" && catalog.length > 0) {
        renderCrux(catalog);
        return catalog;
      }
      throw new Error(" Our databank returned an empty catalog. ");
    })
    .catch((err) => {
      throw new Error(` We failed to fetch catalog:- ${err.toString()} `);
    });
}
