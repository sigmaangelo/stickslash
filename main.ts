import { serveDir } from "https://deno.land/std@0.224.0/http/file_server.ts";

Deno.serve(async (req) => {
  const url = new URL(req.url);

  if (url.pathname.endsWith(".wasm")) {
    const file = await Deno.readFile("." + url.pathname);
    return new Response(file, {
      headers: { "Content-Type": "application/wasm" },
    });
  }

  return serveDir(req, {
    fsRoot: ".",
    showDirListing: true,
    enableCors: true,
  });
});
