import { renderCrux } from "./renderCrux";

export function warn(fault: string) {
  sessionStorage.clear();

  const loadingPrelim = document.querySelector<HTMLElement>("#prelim .loading");
  if (loadingPrelim) {
    loadingPrelim.style.opacity = "0";
  }

  console.warn(`Fault occured ${new Date().toISOString()}:- ${fault}`);

  renderCrux(`
<div style="text-align:center">
<p>
Sorry we encountered a fault. Either refresh this page, try again later, 
or tell your administrator an error occurred at ${new Date().toUTCString()}.
</p>
<p>
<a href="./">Reload app</a> 
</p>
</div>
  `);
}
