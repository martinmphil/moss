export function renderPrelim(markup: string) {
  document.querySelector<HTMLDivElement>("#prelim")!.innerHTML = markup;
}
