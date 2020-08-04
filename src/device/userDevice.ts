import {
  ControllerResponseName,
  ControllerResponseNameSpace,
  ControllerErrorResponseType,
} from '../namespace';

import * as Device from './index';
import { ControllerRequestEvent } from './type';

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
 * Parameter of constructor UserDevice class
 */
export interface UserDeviceParam {
  event: ControllerRequestEvent;
  isAsyncResponse?: boolean;
}

/**
 * GetErrorResponseParam in UserDevice class
 */
interface UserDeviceGetErrorResponseParam {
  type: ControllerErrorResponseType;
  message: string;
}

/**
 * Base class of User Device
 */
export abstract class UserDevice implements IUserDevice {
  protected readonly config: UserDeviceParam;
  constructor(param: Device.UserDeviceParam) {
    this.config = param;
  }

  /**
   * endpoint Id
   */
  public getEndpointId(): string {
    return this.config.event.directive.endpoint.endpointId;
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
      messageId: this.config.event.directive.header.messageId + '-R',
      payloadVersion: '3',
      correlationToken: this.config.event.directive.header.correlationToken,
    };
  }

  /**
   * switch endpoint for esponse between sync and async
   */
  protected getResponseEndpoint() {
    return this.config.isAsyncResponse
      ? this.config.event.directive.endpoint
      : {
          endpointId: this.config.event.directive.endpoint.endpointId,
        };
  }
  /**
   * Error sResponse
   * @param param UserDeviceGetErrorResponseParam
   */
  protected getErrorResponse(
    param: UserDeviceGetErrorResponseParam
  ): Device.Response {
    return {
      event: {
        header: this.getResponseHeader('ErrorResponse'),
        endpoint: this.getResponseEndpoint(),
        payload: {
          type: param.type,
          message: param.message,
        },
      },
    };
  }
}
