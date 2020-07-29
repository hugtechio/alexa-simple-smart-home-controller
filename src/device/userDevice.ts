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
  sendSignal(): Promise<Device.ResponseEvent | {}>;
}

/**
 * Base class of User Device
 */
export class UserDevice implements IUserDevice {
  protected event: Device.ControllerRequestEvent;
  constructor(event: Device.ControllerRequestEvent) {
    this.event = event;
  }

  public async sendSignal(): Promise<Device.ResponseEvent | {}> {
    console.log(this.event);
    return {};
  }

  /**
   * Get response header 
   */
  protected getResponseHeader() {
    return  {
      namespace: 'Alexa',
      name: 'Response',
      messageId: this.event.directive.header.messageId + '-R',
      payloadVersion: '3',
      correlationToken: this.event.directive.header.correlationToken
    }
  }
}
