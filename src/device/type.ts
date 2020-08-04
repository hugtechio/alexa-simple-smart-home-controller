import {
  ControllerNameSpace,
  ControllerResponseNameSpace,
  ControllerResponseName,
  ControllerErrorResponseType,
  ControllerDirectiveName,
} from '../namespace';

/**
 * Supported Header name
 */
export type ControllerHeaderName = 'Response';

/**
 * Request of the Controller interface from Alexa Cloud
 */
export interface ControllerRequestEvent {
  directive: Directive;
}

/**
 * Directive object in the Controller Request
 */
export interface Directive {
  header: DirectiveRequestHeader;
  endpoint: DirectiveRequestEndpoint;
  payload: DirectiveRequestPayload;
}

/**
 * Header object in the Controller Request
 */
export interface DirectiveRequestHeader {
  namespace: ControllerNameSpace;
  name: ControllerDirectiveName;
  payloadVersion: string;
  messageId: string;
  correlationToken: string;
}

/**
 * Endpoint object in the Controller request
 */
export interface DirectiveRequestEndpoint {
  scope: TokenScope | any;
  endpointId: string;
  cookie: Cookie;
}

/**
 * Payload object in the Controller request
 */
export interface DirectiveRequestPayload {
  [key: string]: any;
}

/**
 * Response object of Controller interface
 */
export interface Response {
  context?: {
    properties: Property[];
  };
  event: ResponseEvent;
}
/**
 * Property object in the Controller response
 */
export interface Property {
  namespace: ControllerNameSpace;
  name: string;
  value: any;
  timeOfSample: string;
  uncertaintyInMilliseconds: number;
}

/**
 * Event object in the Controller response
 */
export interface ResponseEvent {
  header: Header;
  endpoint: Endpoint;
  payload:
    | {}
    | ResponseEventErrorPayload
    | EndpointLowPowerErrorPayload
    | NotSupportInCurrentModePayload
    | TemperatureValueOutOfRangePayload
    | ValueOutOfRangePayload;
}

export interface ResponseEventErrorPayload {
  type: ControllerErrorResponseType;
  message: string;
}

export interface EndpointLowPowerErrorPayload
  extends ResponseEventErrorPayload {
  percentageState: number;
}

export interface NotSupportInCurrentModePayload
  extends ResponseEventErrorPayload {
  currentDeviceMode: string;
}

export interface TemperatureValueOutOfRangePayload
  extends ResponseEventErrorPayload {
  validRange: {
    minimumValue: {
      value: number;
      scale: string;
    };
    maximumValue: {
      value: number;
      scale: string;
    };
  };
}

export interface ValueOutOfRangePayload extends ResponseEventErrorPayload {
  validRange: {
    minimumValue: number;
    maximumValue: number;
  };
}

/**
 * Request/Response Header
 */
export interface Header {
  namespace: ControllerResponseNameSpace;
  name: ControllerResponseName;
  payloadVersion: string;
  correlationToken?: string;
  messageId: string;
}

/**
 * Endpoint object in the Controller response
 */
export interface Endpoint {
  scope?: TokenScope | any;
  endpointId: string;
  cookie?: Cookie;
}

/**
 * Token type scope
 */
export interface TokenScope {
  type: TokenType;
  token: string;
}

/**
 * Token type
 */
export type TokenType = 'BearerToken' | string;

/**
 * Cookie object
 */
export interface Cookie {
  [key: string]: string;
}

/**
 * device action helpers (to simplify implementation
 * of action mapping between from alexa to device)
 */
export type DeviceAction = any;
export type DeviceActionMatcher = (
  param: DeviceActionMatherParam
) => DeviceAction;
export interface DeviceActionMatherParam {
  deviceActions: any;
  valueFromAlexa: any;
}

export interface ActionMapping {
  [name: string]: DeviceActionMatcher;
}
