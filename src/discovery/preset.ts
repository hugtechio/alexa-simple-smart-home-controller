import { ControllerNameSpace } from '../namespace';
import * as Discovery from './type';
import { DiscoveryRequestEvent } from './type';

/**
 * Parameter for createCapability method
 */
export interface CreateCapabilityParam {
  interface: ControllerNameSpace;
  supportedProperties?: string[];
  instance?: string;
  proactivelyReported?: boolean;
  retrieable?: boolean;
  capabilityResources?: {};
  semantics?: Discovery.Semantics;
  configuration?: {} | Discovery.ThermostatControllerConfiguration;
}

/**
 * Base object of Controller Capability
 */
const Version3ControllerCapability: Discovery.Capability = {
  type: 'AlexaInterface',
  interface: 'Alexa.BrightnessController',
  version: Discovery.LATEST_INTERFACE_VERSION,
};
/**
 * create Capability object
 * @param param Capability Param
 */
export function createCapability(
  param: CreateCapabilityParam
): Discovery.Capability {
  const capability: Discovery.Capability = {
    type: Version3ControllerCapability.type,
    version: Version3ControllerCapability.version,
    interface: param.interface,
  };

  if (param.instance) {
    capability.instance = param.instance;
  }

  if (param.capabilityResources) {
    capability.capabilityResources = param.capabilityResources;
  }

  if (param.semantics) {
    capability.semantics = param.semantics;
  }

  if (param.configuration) {
    capability.configuration = param.configuration
  }

  if (param.supportedProperties) {
    capability.properties = {
      supported: param.supportedProperties.map(p => {
        return { name: p };
      }),
      proactivelyReported: !!param.proactivelyReported,
      retrievable: !!param.retrieable,
    };
  }
  return capability;
}

/**
 * Controller directive presets
 */

 /**
  * PowerController with default value
  */
export const PowerControllerPreset = createCapability({
  interface: 'Alexa.PowerController',
  supportedProperties: ['powerState'],
});

 /**
  * BrightnessController with default value
  */
export const BrightnessControllerPreset = createCapability({
  interface: 'Alexa.BrightnessController',
  supportedProperties: ['brightness'],
});

/**
 * ChannelController with default value
 */
export const ChannelControllerPreset = createCapability({
  interface: 'Alexa.ChannelController',
  supportedProperties: ['channel'],
});

/**
 * StepSpeaker with default value
 */
export const StepSpeakerPreset = createCapability({
  interface: 'Alexa.StepSpeaker',
});

/**
 * Speaker with default value
 */
export const SpeakerPreset = createCapability({
  interface: 'Alexa.Speaker',
  supportedProperties: ['volume', 'muted'],
});

/**
 * Custom preset for Curtain device
 * This preset can accept 'Open', 'Close' utterance 
 * Note: only compatible ja-JP locale
 */
export const CurtainToggleControllerPreset = createCapability({
  interface: 'Alexa.ToggleController',
  instance: 'Curtain',
  supportedProperties: ['toggleState'],
  capabilityResources: {
    friendlyNames: [
      {
        '@type': 'text',
        value: {
          text: 'カーテン',
          locale: 'ja-JP',
        },
      },
    ],
  },
  semantics: {
    actionMappings: [
      {
        '@type': 'ActionsToDirective',
        actions: ['Alexa.Actions.Close'],
        directive: {
          name: 'TurnOff',
          payload: {},
        },
      },
      {
        '@type': 'ActionsToDirective',
        actions: ['Alexa.Actions.Open'],
        directive: {
          name: 'TurnOn',
          payload: {},
        },
      },
    ],
    stateMappings: [
      {
        '@type': 'StatesToValue',
        states: ['Alexa.States.Closed'],
        value: 'OFF',
      },
      {
        '@type': 'StatesToValue',
        states: ['Alexa.States.Open'],
        value: 'ON',
      },
    ],
  },
});

/**
 * ThermostatController preset with default value 
 */
export const ThermostatControllerPreset = createCapability({
  interface: 'Alexa.ThermostatController',
  supportedProperties: [
    'targetSetpoint',
    'lowerSetpoint',
    'upperSetpoint',
    'thermostatMode',
  ],
  configuration: {
    supportedModes: ['']
  }
});

/**
 * Getting Devices from Device Cloud
 */
export type DiscoveryFunction = (
  event: DiscoveryRequestEvent
) => Promise<Discovery.Endpoint[]>;
