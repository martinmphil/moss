import { egress } from "./egress";
import { fault } from "./fault";
import { fetchCatalog } from "./fetchCatalog";
import { fetchEmail } from "./fetchEmail";
import { renderCrux } from "./renderCrux";
import { renderHeader } from "./renderHeader";
import { setup } from "./setup";
import { showLoading } from "./showLoading";
import "./style.css";

async function main() {
  if (setup() === false) {
    return;
  }
  showLoading();
  renderHeader(egress);
  const emailAddr = await fetchEmail();
  if (emailAddr) {
    const cruxHtml = await fetchCatalog();
    if (cruxHtml) {
      renderCrux(cruxHtml);
    }
  }
}

main().catch((err) => {
  sessionStorage.clear();
  if (err) {
    console.warn(
      `Fault occured ${new Date().toISOString()}:- ${err.toString()}`
    );
  }
  fault();
});
