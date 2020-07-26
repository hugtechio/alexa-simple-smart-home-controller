import * as Device from './index';

export type DeviceSearchFunction = (
  event: Device.ControllerRequestEvent
) => Promise<Device.IUserDevice>;

export interface IUserDevice {
  sendSignal(): Promise<Device.ResponseEvent | {}>;
}

export class UserDevice implements IUserDevice {
  protected event: Device.ControllerRequestEvent;
  constructor(event: Device.ControllerRequestEvent) {
    this.event = event;
  }

  public async sendSignal(): Promise<Device.ResponseEvent | {}> {
    console.log(this.event);
    return {};
  }
}
