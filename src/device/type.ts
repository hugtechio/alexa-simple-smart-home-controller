import {
  ControllerNameSpace,
  ControllerResponseNameSpace,
  ControllerResponseName,
} from '../namespace';

/**
 * Supported Header name
 */
export type ControllerHeaderName = 'Response';

export interface ControllerRequestEvent {
  directive: Directive;
}

export interface Directive {
  header: DirectiveRequestHeader;
  endpoint: DirectiveRequestEndpoint;
  payload: DirectiveRequestPayload;
}

export interface DirectiveRequestHeader {
  namespace: ControllerNameSpace;
  name: string;
  payloadVersion: string;
  messageId: string;
  correlationToken: string;
}

export interface DirectiveRequestEndpoint {
  scope: TokenScope | any;
  endpointId: string;
  cookie: Cookie;
}

export interface DirectiveRequestPayload {
  [key: string]: any;
}

export interface Response {
  context: {
    properties: Property[];
  };
  event: ResponseEvent;
}

export interface Property {
  namespace: ControllerNameSpace;
  name: string;
  value: any;
  timeOfSample: string;
  uncertaintyInMilliseconds: number;
}

export interface ResponseEvent {
  header: Header;
  endpoint: Endpoint;
  payload: {};
}

/**
 * Header
 */
export interface Header {
  namespace: ControllerResponseNameSpace;
  name: ControllerResponseName;
  payloadVersion: string;
  correlationToken: string;
  messageId: string;
}

export interface Endpoint {
  scope: TokenScope | any;
  endpointId: string;
  cookie: Cookie;
}

export interface TokenScope {
  type: TokenType;
  token: string;
}

export type TokenType = 'BearerToken' | string;

export interface Cookie {
  [key: string]: string;
}
