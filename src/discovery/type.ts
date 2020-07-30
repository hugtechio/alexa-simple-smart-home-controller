import {
  ControllerNameSpace,
  DiscoveryNameSpace,
  DiscoveryHeaderName,
} from '../namespace';
import { DeviceCategory } from './category';

/**
 * Alexa Interface version
 */
export const LATEST_INTERFACE_VERSION = '3';

/**
 * Discovery Interface
 * https://developer.amazon.com/en-US/docs/alexa/device-apis/alexa-discovery.html
 */

/**
 * DiscoveryRequest
 */
export interface DiscoveryRequestEvent {
  directive: DiscoveryRequestDirective;
}

/**
 * Directive object in DiscoveryRequest 
 */
export interface DiscoveryRequestDirective {
  header: Header;
  payload: DiscoveryRequestPayload;
}

/**
 * Payload object in DiscoveryRequest 
 */
export interface DiscoveryRequestPayload {
  scope: TokenScope | any;
}

/**
 * TokenScope 
 */
export interface TokenScope {
  type: TokenType;
  token: string;
}

/**
 * Type of token 
 */
export type TokenType = 'BearerToken' | string;

/**
 * Discovery Header
 */
export interface Header {
  namespace: DiscoveryNameSpace | ControllerNameSpace;
  name: DiscoveryHeaderName;
  payloadVersion: string;
  messageId: string;
}

/**
 * Discovery Response
 */
export interface Response {
  header: Header;
  payload: Payload;
}

/**
 * Discovery Response Payload
 */
export interface Payload {
  endpoints: Endpoint[];
}

/**
 * EndpointInformation
 * https://developer.amazon.com/en-US/docs/alexa/device-apis/alexa-discovery.html#endpoint-object
 */
export interface Endpoint {
  endpointId: string;
  manufacturerName: string;
  description: string;
  friendlyName: string;
  displayCategories: DeviceCategory[];
  additionalAttributes?: AdditionalAttributes;
  capabilities: Capability[];
  connections?: Connections;
  relationships?: Relationships;
  cookie?: Cookie;
}

/**
 * EndpointInformation(Balk)
 */
export interface BalkEndpoint {
  endpointId: string;
  manufacturerName: string;
  description: string;
  friendlyName: string;
  displayCategories?: DeviceCategory[];
  additionalAttributes?: AdditionalAttributes;
  capabilities?: Capability[];
  connections?: Connections;
  relationships?: Relationships;
  cookie?: Cookie;
}

/**
 * Additional manufactures attributes
 * https://developer.amazon.com/en-US/docs/alexa/device-apis/alexa-discovery.html#additionalattributes-object
 */
export interface AdditionalAttributes {
  manufacturer?: string;
  model?: string;
  serialNumber?: string;
  firmwareVersion?: string;
  softwareVersion?: string;
  customIdentifier?: string;
}

/**
 * https://developer.amazon.com/en-US/docs/alexa/device-apis/alexa-discovery.html#connections-object
 */
export interface Connections {
  type: string;
  macAddress?: string;
  homeId?: string;
  nodeId: string;
  value?: string;
}

/**
 * Relationships object
 * https://developer.amazon.com/en-US/docs/alexa/device-apis/alexa-discovery.html#relationships-object
 */
export interface Relationships {
  isConnectedBy: {
    endpointId: string;
  };
}

/**
 * Cookie in the Endpoint
 */
export interface Cookie {
  [name: string]: string;
}

/**
 * Capability of each controller
 */
export interface Capability {
  type: string;
  interface: ControllerNameSpace;
  instance?: string;
  version: string;
  properties?: Properties;
  capabilityResources?: {};
  configuration?: {} | ThermostatControllerConfiguration;
  verificationsRequired?: {};
  semantics?: Semantics;
}

/**
 * Capability Property
 */
export interface Properties {
  supported: Property[];
  proactivelyReported: boolean;
  retrievable: boolean;
}

/**
 * Capability Property Object
 */
export interface Property {
  name: string;
}

/**
 * Semantics object
 * https://developer.amazon.com/en-US/docs/alexa/device-apis/alexa-discovery.html#semantics-object
 */
export interface Semantics {
  actionMappings: ActionMapping[];
  stateMappings?: StateMapping[];
}

/**
 * ActionMapping Object
 * This object is part of Semantics object
 */
export interface ActionMapping {
  '@type': string;
  actions?: Action[];
  directive?: ActionMappingDirective;
}

/**
 * Actions in ActionMapping
 */
export type Action =
  | 'Alexa.Actions.Open'
  | 'Alexa.Actions.Close'
  | 'Alexa.Actions.Raise'
  | 'Alexa.Actions.Lower';

/**
 * Directive Object
 * This object is part of ActionMapping
 */
export interface ActionMappingDirective {
  name: string;
  payload: {};
}

/**
 * StateMapping object
 * This object is part of ActionMapping object
 */
export interface StateMapping {
  '@type': StateMappingType;
  states?: StateMappingState[];
  value?: any;
  range?: {};
}

/**
 * Value of state mapping
 */
export type StateMappingType = 'StatesToValue' | 'StatesToRange';

/**
 * Value of state mapping state
 */
export type StateMappingState = 'Alexa.States.Open' | 'Alexa.States.Closed'

/**
 * Thermostat capability configuration 
 * (This is required on Discovery interface)
 */
export interface ThermostatControllerConfiguration {
  supportedModes: ThermostatMode;
  supportsScheduling: boolean;
}

/**
 * Thermo stat mode
 */
export type ThermostatMode = 
    | 'AUTO'
    | 'COOL'
    | 'HEAT'
    | 'ECO'
    | 'OFF'
