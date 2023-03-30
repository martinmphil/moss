import { renderCrux } from "./renderCrux";

export function showLoading() {
  const loadingPara = `<p class="loading">Please wait...</p>`;
  renderCrux(loadingPara);
}
