#include <EVAM.h>

//Define messages for BLE characteristics


unsigned long prevCoreMillis = 0; //timer for the important data service
unsigned long prevSlowMillis = 0; //timer for the less important data service
unsigned long prevMotorLockMillis = 0;  //timer for motor lock CAN Bus message

volatile bool lightSwitchOn = false;
volatile bool lightingISRFlag = false;
volatile unsigned long lastLightSwitchEvent = 0;

volatile bool driveMode = 0;
volatile bool revMode = 0;
volatile bool reverseISRFlag = false;
volatile unsigned long lastDriveModeSwitchEvent = 0;





//Sets the ESP32's GPIO Pins correctly for the connected switches
// to be run once in the Arduino Setup()
void setSwitchesGPIO(){
    pinMode(MOTOR_LOCK_PIN, INPUT);

    pinMode(LIGHTING_SWITCH_PIN, INPUT);
    pinMode(LIGHTING_LED_PIN, OUTPUT);

    //pinMode(BUZZER_OUT_PIN, OUTPUT);

    pinMode(REVERSE_SWITCH_PIN, INPUT);
    pinMode(BOOST_SWITCH_PIN, INPUT);
    pinMode(NORMAL_DRIVE_SWITCH_PIN, INPUT);
    pinMode(MOTOR_LOCK_PIN, INPUT);
}

//attaches interrupts for all the interrupt enabled switches
void attachInterrupts(){
    attachInterrupt(LIGHTING_SWITCH_PIN, lightingISR, RISING); //light switch is a pushbutton
    attachInterrupt(REVERSE_SWITCH_PIN, reverseISR, CHANGE);
}

//re-enables interrupts after a DEBOUNCE_INTERVAL has elapsed
//acts as a software debounce for the interrupt-enabled buttons
void checkReEnableInterrupts(unsigned long *_currentMillis){
    if(*_currentMillis - lastLightSwitchEvent > LIGHT_SWITCH_DEBOUNCE_INTERVAL){
        attachInterrupt(LIGHTING_SWITCH_PIN, lightingISR, RISING);
    }
    if(*_currentMillis - lastDriveModeSwitchEvent > DEBOUNCE_INTERVAL){
        attachInterrupt(REVERSE_SWITCH_PIN, reverseISR, CHANGE);
    }
}

//Checks if the motor lock pin is used
//And sends the message on the CAN Bus
void checkSendMotorLockout(){
    motorLockMsg.data.u8[0] = digitalRead(MOTOR_LOCK_PIN);
    #ifdef SERIAL_DEBUG
    Serial.print("Motors Locked: ");
    Serial.println(motorLockMsg.data.u8[0]);
    #endif
    ESP32Can.CANWriteFrame(&motorLockMsg);
}

void IRAM_ATTR lightingISR(){
    if((millis() - lastLightSwitchEvent) > LIGHT_SWITCH_DEBOUNCE_INTERVAL){
        lightSwitchOn = !lightSwitchOn;
        lightingISRFlag = true;  
    }

    lastLightSwitchEvent = millis();

}

void IRAM_ATTR reverseISR(){
    if((millis() - lastDriveModeSwitchEvent) > DEBOUNCE_INTERVAL){
        revMode = digitalRead(REVERSE_SWITCH_PIN);
        reverseISRFlag = true;  
    }
    lastDriveModeSwitchEvent = millis();
}

/* DISABLED: LIGHT SWITCH IS A MOMENTARY SWITCH SO THE ESP CANNOT DETERMINE THE STATE BY READING THE PIN
//Checks whether the light switch on the dashboard is pressed
//And turns on the LED for the switch if it is pressed
bool checkLightSwitch(){
    bool _lightSwitchOn = digitalRead(LIGHTING_SWITCH_PIN);
    digitalWrite(LIGHTING_LED_PIN, _lightSwitchOn);
    return _lightSwitchOn;
}
*/


