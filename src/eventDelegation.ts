import { fetchWorkbook } from "./fetchWorkbook";
import { showLoading } from "./showLoading";

export async function eventDelegation() {
  const crux = document.querySelector<HTMLDivElement>("#crux")!;

  crux.addEventListener("click", async (event: MouseEvent) => {
    const dataset = (event.target as HTMLButtonElement).dataset;

    if (dataset?.workflowId) {
      showLoading();
      await fetchWorkbook(dataset?.workflowId);
    }
  });
}
