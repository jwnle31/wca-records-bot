# WCA Records Bot [@wca.voytxt.com](https://bsky.app/profile/wca.voytxt.com)

Posts the latest Rubik's cube records to Bluesky. Uses Deno Deploy.

[deno wasm canvas](https://jsr.io/@gfx/canvas-wasm) needed write access to function properly, which is not possible on deno deploy, so i tried to use [npm canvas](https://www.npmjs.com/package/canvas) instead, that gave the `Error: Cannot find module '../build/Release/canvas.node'` error even after running `deno install --allow-scripts=npm:canvas` on deno deploy as an install step
