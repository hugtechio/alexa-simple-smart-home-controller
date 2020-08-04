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

export type ControllerResponseName = 'Response' | 'ErrorResponse';

export type ControllerErrorResponseType =
  | 'ALREADY_IN_OPERATION'
  | 'BRIDGE_UNREACHABLE'
  | 'CLOUD_CONTROL_DISABLED'
  | 'ENDPOINT_BUSY'
  | 'ENDPOINT_LOW_POWER'
  | 'ENDPOINT_UNREACHABLE'
  | 'EXPIRED_AUTHORIZATION_CREDENTIAL'
  | 'FIRMWARE_OUT_OF_DATE'
  | 'HARDWARE_MALFUNCTION'
  | 'INSUFFICIENT_PERMISSIONS'
  | 'INTERNAL_ERROR'
  | 'INVALID_AUTHORIZATION_CREDENTIAL'
  | 'INVALID_DIRECTIVE'
  | 'INVALID_VALUE'
  | 'NO_SUCH_ENDPOINT'
  | 'NOT_CALIBRATED'
  | 'NOT_SUPPORTED_IN_CURRENT_MODE'
  | 'NOT_IN_OPERATION'
  | 'POWER_LEVEL_NOT_SUPPORTED'
  | 'RATE_LIMIT_EXCEEDED'
  | 'TEMPERATURE_VALUE_OUT_OF_RANGE'
  | 'TOO_MANY_FAILED_ATTEMPTS'
  | 'VALUE_OUT_OF_RANGE';
