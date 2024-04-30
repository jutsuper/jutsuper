/// <reference types="video.js/index.d.ts"/>

/**
 * @file Basic Window annotations so type checker doesn't complain
 */

import { JutSuperSettingsObject } from "/src/settings.js";
import { JutSuperPopup } from "/src/popup/popup.js";
import { JutSuperSettingsPopup } from "/src/page/settings.js";
import { JutSuperSkipPopup } from "/src/page/skip.js";


declare global {
  interface Window {
    jutsu_new_player?: "yes";
    cur_time_cookie?: string[];
    player?: videojs.VideoJsPlayer;
  
    jsuperSettings?: JutSuperSettingsObject;
  
    // Debug
    JUTSUPER_DEBUG?: boolean;
    jsuperPopup?: JutSuperPopup;
    jsuperSettingsPopup?: JutSuperSettingsPopup;
    jsuperSkipPopup?: JutSuperSkipPopup;
  }
}
