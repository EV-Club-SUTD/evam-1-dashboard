#include <messages.h>

/********** MESSAGES FOR BLE CHARACTERISTICS **********/
uint8_t coreMessage[3];
uint8_t statusMessage[11];
uint8_t batteryMessage[5];

/********** MESSAGES FOR CAN BUS **********/
CAN_frame_t frontLightMsg;        //front light CAN message
CAN_frame_t rearLightMsg;         //rear light CAN message
CAN_frame_t intLightMsg;          //interior light CAN message
CAN_frame_t motorLockMsg;         //motor lock status
CAN_frame_t phoneConnectedMsg;    //phone connection status
CAN_frame_t reverseMsg;    //drive mode: reverse, normal, eco, boost

/*************** INITIALISE MESSAGE CONTENTS ***************/

//Initialises the ESP32 data for all the messages
//both CAN Bus and BLE
void initMessageData(){
  initCoreMsg();
  initBattMsg();
  initStatusMsg();

  initLightingMsg();
  initMotorLockMsg();
  initPhoneConnectedMsg();
  initReverseMsg();    
}


//Initialise the individual message contents

//BLE Messages

void initCoreMsg()
{
  for(int i = 0; i < sizeof(coreMessage); i++)
  {
    coreMessage[i] = 0;
  }
}

void initBattMsg() {
  for(int i = 0; i < sizeof(batteryMessage); i++)
  {
    batteryMessage[i] = 0;  //everything 0
  }
}

void initStatusMsg(){
  for(int i = 0; i < sizeof(statusMessage); i++)
  {
    statusMessage[i] = 255; //all offline
  }
}

//CAN Bus Messages

void initLightingMsg(){
  //setup front light message for CAN Bus
  frontLightMsg.FIR.B.FF = CAN_frame_std;
  frontLightMsg.MsgID  = FRONT_LIGHT_MSG_ID;
  frontLightMsg.FIR.B.DLC = 5;
  for(uint8_t i = 0; i < 3; i++){
    frontLightMsg.data.u8[i] = 255; //initialise front lights to white, 100% brightness
  }
  frontLightMsg.data.u8[3] = 0; //fade default (on)
  frontLightMsg.data.u8[4] = 0; //indicator off
  
  //setup rear light message for CAN Bus
  rearLightMsg.FIR.B.FF = CAN_frame_std;
  rearLightMsg.MsgID  = REAR_LIGHT_MSG_ID;
  rearLightMsg.FIR.B.DLC = 5;
  for(uint8_t i = 1; i < 5; i++){
    rearLightMsg.data.u8[i] = 0;
  }
  rearLightMsg.data.u8[0] = 40;  //initialise rear lights to red, 50% brightness

  //setup interior light message for CAN Bus
  intLightMsg.FIR.B.FF = CAN_frame_std;
  intLightMsg.MsgID  = INT_LIGHT_MSG_ID;
  intLightMsg.FIR.B.DLC = 5;
  for(uint8_t i = 0; i < 3; i++){
    intLightMsg.data.u8[i] = 128; //initialise interior lights to white, 50% brightness
  }
  intLightMsg.data.u8[3] = 0; //fade default (on)
  intLightMsg.data.u8[4] = 0; //indicator off
}

void initMotorLockMsg(){
  //setup front light message for CAN Bus
  motorLockMsg.FIR.B.FF = CAN_frame_std;
  motorLockMsg.MsgID  = MOTOR_LOCKOUT_MSG_ID;
  motorLockMsg.FIR.B.DLC = 1;
  motorLockMsg.data.u8[0] = 1;
}

void initPhoneConnectedMsg(){
  //setup front light message for CAN Bus
  phoneConnectedMsg.FIR.B.FF = CAN_frame_std;
  phoneConnectedMsg.MsgID  = PHONE_CONNECTED_MSG_ID;
  phoneConnectedMsg.FIR.B.DLC = 1;
  phoneConnectedMsg.data.u8[0] = 0;
}

void initReverseMsg(){
  //setup front light message for CAN Bus
  reverseMsg.FIR.B.FF = CAN_frame_std;
  reverseMsg.MsgID  = REV_BOOST_MSG_ID;
  reverseMsg.FIR.B.DLC = 2;
  reverseMsg.data.u8[0] = digitalRead(REVERSE_SWITCH_PIN);  //0= forward, 1 = reverse
  reverseMsg.data.u8[1] = 0;  //0= normal, 1 = eco, 2 = boost  
}