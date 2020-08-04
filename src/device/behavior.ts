import { ControllerDirectiveName, ControllerNameSpace } from '../namespace';
import * as Device from './type';

/**
 * Behavior definition which map directive
 * from Alexa to the specific action of DeviceCloud
 * @example
 * {
 *   'Alexa.BrightnessController': {
 *     'SetBrightness': (directive: Device.Directive) => {
 *       const r: DeviceResponse = {
 *         // construct response event
 *       }
 *       return r
 *     }
 *   }
 * }
 */
export type DeviceBehaviorDefinition = {
  [namespace in ControllerNameSpace]: {
    [name in ControllerDirectiveName]: DeviceBehavior;
  };
};

/**
 * Device action
 */
export type DeviceBehavior = (
  directive: Device.Directive
) => Promise<Device.Response>;
