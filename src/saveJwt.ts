export function saveJwt(): void {
  const urlAuthToken = new URLSearchParams(window.location.hash).get(
    "access_token"
  );

  if (typeof urlAuthToken === "string" && urlAuthToken.length > 0) {
    sessionStorage.setItem("Authorization", urlAuthToken);
    window.location.hash = "";
  }
}
