export function renderHeader(html: string) {
  const headerLogInOut = document.querySelector<HTMLDivElement>("header")!;
  headerLogInOut.innerHTML = html;
}
