import { serveDir } from "https://deno.land/std@0.224.0/http/file_server.ts";

Deno.serve((req) => {
  const url = new URL(req.url);

  // Fix Unity WASM MIME type
  if (url.pathname.endsWith(".wasm")) {
    return fetch(req.url).then((res) =>
      new Response(res.body, {
        headers: {
          "content-type": "application/wasm",
        },
      })
    );
  }

  return serveDir(req, {
    fsRoot: ".",
    showDirListing: true,
    enableCors: true,
  });
});
