import { ControllerResponseName, ControllerErrorResponseType } from '../namespace';

import * as Device from './index';

/**
 * DeviceSearchFunction is a logic of finding a target device from Alexa's controller Request.
 * SmartHomeController class requires this function on the Constructor.
 */
export type DeviceSearchFunction = (
  event: Device.ControllerRequestEvent
) => Promise<Device.IUserDevice>;

/**
 * Device interface
 * sendSignal method is called automatically
 */
export interface IUserDevice {
  getEndpointId(): string;
  sendSignal(): Promise<Device.Response>;
}

/**
 * Base class of User Device
 */
export abstract class UserDevice implements IUserDevice {
  protected event: Device.ControllerRequestEvent;
  protected endpointId: string;
  constructor(event: Device.ControllerRequestEvent) {
    this.event = event;
    this.endpointId = event.directive.endpoint.endpointId;
  }

  /**
   * endpoint Id
   */
  public getEndpointId(): string {
    return this.endpointId;
  }

  public abstract async sendSignal(): Promise<Device.Response>;

  /**
   * Get response header
   */
  protected getResponseHeader(
    name: ControllerResponseName = 'Response'
  ): Device.Header {
    return {
      namespace: 'Alexa',
      name: name,
      messageId: this.event.directive.header.messageId + '-R',
      payloadVersion: '3',
      correlationToken: this.event.directive.header.correlationToken,
    };
  }

  /**
   * 
   * @param type Type of Error
   * @param message error message
   */
  protected getErrorResponse(type: ControllerErrorResponseType, message: string): Device.Response {
    return {
      event: {
        header: this.getResponseHeader('ErrorResponse'),
        endpoint: {
          endpointId: this.endpointId
        },
        payload: {
          type: type,
          message: message
        }
      }
    }
  }
}
