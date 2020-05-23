import * as http from "http";

import { HttpRequest, HttpStatus, toNodeRequestListener, res } from "..";

async function handler(req: HttpRequest) {
  await req.body.asString("UTF-8");
  return res({
    body: "Hello world!",
    status: HttpStatus.OK
  });
}

const server = http.createServer(toNodeRequestListener(handler));

const hostname = "127.0.0.1";
const port = 3000;

server.listen(port, hostname, () => {
  console.log(`Server running at http://${hostname}:${port}/`);
});
