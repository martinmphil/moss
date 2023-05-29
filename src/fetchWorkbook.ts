import { authorizedFetch } from "./authorizedFetch";
import { renderCrux } from "./renderCrux";
import { warn } from "./warn";
let error = "";

export async function fetchWorkbook(
  workflowId: string,
  worksheetId?: string,
  candidateAnswer?: string
) {
  if (candidateAnswer) {
    const responseBody = JSON.stringify({
      workbookEvent: {
        worksheetId,
        candidateAnswer,
      },
    });

    return authorizedFetch(`workbook/${workflowId}`, "POST", responseBody)
      .then((workbook) => {
        if (typeof workbook === "string" && workbook.length > 0) {
          renderCrux(workbook);
          return workbook;
        }
        error += " Our databank returned an empty workbook. ";
        warn(error);
        return "";
      })
      .catch((err) => {
        error += ` We failed to fetch workbook:- ${JSON.stringify(err)} `;
        warn(error);
        return "";
      });
  }

  return authorizedFetch(`workbook/${workflowId}`, "POST")
    .then((workbook) => {
      if (typeof workbook === "string" && workbook.length > 0) {
        renderCrux(workbook);
        return workbook;
      }
      error += " Our databank returned an empty workbook. ";
      warn(error);
      return "";
    })
    .catch((err) => {
      error += ` We failed to fetch workbook:- ${JSON.stringify(err)} `;
      warn(error);
      return "";
    });
}
