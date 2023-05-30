export function renderCrux(markup: string) {
  const crux = document.querySelector<HTMLDivElement>("#crux")!;
  crux.hidden = false;
  crux.innerHTML = markup;
}
