import { egress } from "./egress";
import { eventDelegation } from "./eventDelegation";
import { warn } from "./warn";
import { fetchListings } from "./fetchListings";
import { fetchEmail } from "./fetchEmail";
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
  await fetchEmail();
  eventDelegation();
  await fetchListings();
}

main().catch((err) => {
  let fault = " Main function failed ";
  if (err) {
    fault += `:- ${JSON.stringify(err)}`;
  }
  warn(fault);
});
