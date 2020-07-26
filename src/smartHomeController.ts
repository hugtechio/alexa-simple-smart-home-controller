import * as Discovery from './discovery';
import * as Device from './device';

/**
 * Main Controller
 */
class SmartHomeController {
  private event: any;
  private discoveryFunction: Discovery.DiscoveryFunction;
  private deviceSearchFunction: Device.DeviceSearchFunction;

  /**
   * 
   * @param event directive object from Alexa Cloud
   * @param discoverFunction discovery function which discover devices from device cloud 
   * @param deviceSearchFunction searching function which find a device from user utterance
   */
  constructor(
    event: any,
    discoverFunction: Discovery.DiscoveryFunction,
    deviceSearchFunction: Device.DeviceSearchFunction
  ) {
    this.event = event;
    this.discoveryFunction = discoverFunction;
    this.deviceSearchFunction = deviceSearchFunction;
  }

  /**
   * main logic 
   */
  public async run(): Promise<{} | Device.ResponseEvent> {
    try {
      const header: Discovery.Header = this.event.directive.header;

      /**
       * discovery
       */
      if (
        header.namespace === 'Alexa.Discovery' &&
        header.name === 'Discover'
      ) {
        console.log('Discover event', this.event);
        header.name = 'Discover.Response';

        // Search from DeviceCloud
        const endpoints: Discovery.Endpoint[] = await this.discoveryFunction(
          this.event
        );
        const payload = {
          endpoints: endpoints,
        };
        console.log(JSON.stringify({ header, payload }));
        return {
          header,
          payload,
        };
      }

      // get device for requesting the device cloud
      const device = await this.deviceSearchFunction(this.event);
      if (!device) throw new Error('error');

      // send signal
      const response = await device.sendSignal();
      return response;
    } catch (e) {
      console.log(e);
      return {};
    }
  }
}

export default SmartHomeController;
