const SPLASH_STATE = 0;
const GAME_RUNNING_STATE = 1;

var currState = SPLASH_STATE;

function isSplash() { return currState==SPLASH_STATE; }