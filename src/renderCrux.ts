export function renderCrux(html: string) {
  const crux = document.querySelector<HTMLDivElement>("#crux")!;
  crux.hidden = false;
  crux.innerHTML = html;
}
