export interface HttpRequestHeaders {
  [header: string]: string | string[] | undefined;
}

export type HttpMethod = string;
export type HttpBody = string; // | stream

export interface HttpMessage {
  headers: HttpRequestHeaders;
  body: HttpBody;
}

export interface HttpRequest extends HttpMessage {
  method: HttpMethod;
  url: string;
}

export type HttpStatus = number;

export interface HttpResponse extends HttpMessage {
  status: HttpStatus;
}
