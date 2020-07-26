/**
 * Discovery namespace types
 */
export type DiscoveryNameSpace = 'Alexa.Discovery';

/**
 * Supported Header name
 */
export type DiscoveryHeaderName = 'Discover' | 'Discover.Response';

/**
 * Controller namespace types
 */
export type ControllerNameSpace =
  | 'Alexa.BrightnessController'
  | 'Alexa.Calendar'
  | 'Alexa.CameraStreamController'
  | 'Alexa.ChannelController'
  | 'Alexa.ColorController'
  | 'Alexa.ColorTemperatureController'
  | 'Alexa.ContactSensor'
  | 'Alexa.DoorbellEventSource'
  | 'Alexa.EqualizerController'
  | 'Alexa.EventDetectionSensor'
  | 'Alexa.InputController'
  | 'Alexa.InventoryLevelSensor'
  | 'Alexa.LockController'
  | 'Alexa.MediaMetadata'
  | 'Alexa.MeetingClientController'
  | 'Alexa.ModeController'
  | 'Alexa.MotionSensor'
  | 'Alexa.PercentageController'
  | 'Alexa.PowerController'
  | 'Alexa.PowerLevelController'
  | 'Alexa.RangeController'
  | 'Alexa.RTCSessionController'
  | 'Alexa.SceneController'
  | 'Alexa.SecurityPanelController'
  | 'Alexa.Speaker'
  | 'Alexa.StepSpeaker'
  | 'Alexa.TemperatureSensor'
  | 'Alexa.ThermostatController'
  | 'Alexa.TimeHoldController'
  | 'Alexa.ToggleController'
  | 'Alexa.WakeOnLANController';

export type ControllerResponseNameSpace =
  | 'Alexa'
  | 'Alexa.Cooking'
  | 'Alexa.Networking'
  | 'Alexa.Education'
  | 'Alexa.Business';

export type ControllerResponseName = 'Response';
