export async function onRequest({ request, params }) {
  const parts = params.path || [];
  const hosts = {
    paper: "https://paper-api.alpaca.markets",
    live: "https://api.alpaca.markets",
    data: "https://data.alpaca.markets",
  };
  const target = hosts[parts[0]];
  if (!target) return new Response("bad path", { status: 404 });
  const url = new URL(request.url);
  const noBody = ["GET", "HEAD", "DELETE"].includes(request.method);
  return fetch(target + "/" + parts.slice(1).join("/") + url.search, {
    method: request.method,
    headers: {
      "APCA-API-KEY-ID": request.headers.get("APCA-API-KEY-ID") || "",
      "APCA-API-SECRET-KEY": request.headers.get("APCA-API-SECRET-KEY") || "",
      "Content-Type": "application/json",
    },
    body: noBody ? undefined : await request.text(),
  });
}
