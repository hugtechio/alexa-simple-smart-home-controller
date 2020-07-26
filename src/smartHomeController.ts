import * as Discovery from './discovery';
import * as Device from './device';

/**
 * Main Controller
 */
class SmartHomeController {
  private event: any;
  private discoveryFunction: Discovery.DiscoveryFunction;
  private deviceSearchFunction: Device.DeviceSearchFunction;

  constructor(
    event: any,
    discoverFunction: Discovery.DiscoveryFunction,
    deviceSearchFunction: Device.DeviceSearchFunction
  ) {
    this.event = event;
    this.discoveryFunction = discoverFunction;
    this.deviceSearchFunction = deviceSearchFunction;
  }

  public async run(): Promise<{}> {
    try {
      const header: Discovery.Header = this.event.directive.header;

      if (
        header.namespace === 'Alexa.Discovery' &&
        header.name === 'Discover'
      ) {
        console.log('Discover event', this.event);
        header.name = 'Discover.Response';
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

      const device = await this.deviceSearchFunction(this.event);
      if (!device) throw new Error('error');

      const response = await device.sendSignal();
      return response;
    } catch (e) {
      console.log(e);
      return {};
    }
  }
}

export default SmartHomeController;
