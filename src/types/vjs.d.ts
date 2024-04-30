/// <reference types="video.js/index.d.ts" />

/**
 * @file Basic VideoJS annotations so type checker doesn't complain
 */

export {};


declare global {
  namespace videojs {
    interface VideoJsPlayer {
      constructor: typeof videojs.default.Component;
      overlays_: VideoJsOverlay[];
    }

    interface ControlBar extends videojs.default.ControlBar {
      qualitySelector: videojs.default.Component;
    }

    interface VideoJsOverlay {
      options_: VideoJsOverlayOptions;
    }

    interface VideoJsOverlayOptions {
      start: number;
      end: number;
      the_function: string;
    }
  }
}
