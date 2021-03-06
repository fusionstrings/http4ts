import {
  HttpRequest,
  HttpResponse,
  res,
  setupEnvironment,
  BufferedBody
} from "./core/mod.ts";

import { toHttp4tsHeader } from "./utils.ts";

setupEnvironment(TextDecoder, TextEncoder);

export async function send(req: HttpRequest): Promise<HttpResponse> {
  const response = await fetch(req.url, {
    headers: req.headers as Record<string, string>
  });

  return res({
    status: response.status,
    body: response.body ? new BufferedBody(response.body) : undefined,
    headers: toHttp4tsHeader(response.headers)
  });
}
