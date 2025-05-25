/**
 * Welcome to Cloudflare Workers! This is your first worker.
 *
 * - Run `npm run dev` in your terminal to start a development server
 * - Open a browser tab at http://localhost:8787/ to see your worker in action
 * - Run `npm run deploy` to publish your worker
 *
 * Learn more at https://developers.cloudflare.com/workers/
 */

export default {
  async fetch(request, env) {
    const url = new URL(request.url);
    const isDefaultLoad = url.searchParams.get("default") === "load";

    const referer = request.headers.get("referer") || "";
    const allowedReferers = [
      "https://veltra-maps.github.io",
      "http://localhost:1010",
      "http://127.0.0.1:1010",
      "http://localhost:8000",
      "http://localhost:3000",
    ];
    const isAllowed = allowedReferers.some((r) => referer.startsWith(r));
    if (!isAllowed) {
      return new Response("Forbidden", { status: 403 });
    }

    const fullData = await env.PORT_DATA.get("port.json", { type: "json" });
    if (!fullData || !fullData.features) {
      return new Response("port.json not found or invalid", { status: 500 });
    }

    const headers = {
      "Content-Type": "application/json",
      "Access-Control-Allow-Origin": "*",
      "Cache-Control": "public, max-age=604800",
    };

    if (isDefaultLoad) {
      const minimalData = {
        type: "FeatureCollection",
        features: fullData.features.map((f) => ({
          type: "Feature",
          geometry: f.geometry,
          properties: {
            PortName: f.properties.PortName,
            Primary: f.properties.Primary,
            AvgAnnualPortCalls: f.properties.AvgAnnualPortCalls,
            VTAreaNo: f.properties.VTAreaNo,
          },
        })),
      };
      return new Response(JSON.stringify(minimalData), { headers });
    }

    return new Response(JSON.stringify(fullData), { headers });
  },
};
