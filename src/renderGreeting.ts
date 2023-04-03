export function renderGreeting(html: string) {
  document.querySelector<HTMLDivElement>("#greeting")!.innerHTML = html;
}
