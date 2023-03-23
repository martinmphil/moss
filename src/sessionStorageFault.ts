export function sessionStorageFault() {
  const p1 =
    "Please enable session-storage " +
    "by reloading this page after leaving incognito Private Browsing.";
  document.querySelector<HTMLDivElement>("#crux")!.innerHTML = `
<p>${p1}</p>
  `;
}
