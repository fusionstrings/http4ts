import { request as httpsRequest } from "https";
import { request as httpRequest } from "http";
import { HttpRequest, HttpResponse, res, BufferedBody } from "../core/mod";
import { writeIterableToStream } from "./node-stream-utils";

export async function send(req: HttpRequest): Promise<HttpResponse> {
  const url = new URL(req.url);

  const request = url.protocol === "https:" ? httpsRequest : httpRequest;

  return new Promise(async resolve => {
    const reqToSend = request(
      req.url,
      { method: req.method, headers: req.headers },
      response => {
        if (response.statusCode === undefined) {
          throw new Error("Response statusCode cannot be undefined");
        }
        resolve(
          res({
            status: response.statusCode,
            headers: response.headers,
            body: new BufferedBody(response)
          })
        );
      }
    );

    await writeIterableToStream(req.body, reqToSend);
  });
}
