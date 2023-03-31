import { renderCrux } from "./renderCrux";

export function fault() {
  const loadingGreeting =
    document.querySelector<HTMLElement>("#greeting .loading");
  if (loadingGreeting) {
    loadingGreeting.style.opacity = "0";
  }

  renderCrux(`
<div style="text-align:center">
<p>
Please report a fault occured ${new Date().toUTCString()}.
</p>
<p>
<a href="./">Reload app</a> 
</p>
</div>
  `);
}
