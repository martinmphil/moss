export function renderHeader(markup: string) {
  const headerLogInOut = document.querySelector<HTMLDivElement>("header")!;
  headerLogInOut.innerHTML = markup;
}
