import type {
  JutSuperTypeFilter,
  JutSuperTypeDeepPartial
} from "/src/types/shared.d.ts";
import { JutSuperSettingsSkipOrderKeys } from "/src/settings.js";
export {
  JutSuperSettingsObject,
  JutSuperSettingsObjectPartial,
  JutSuperSettingsObjectFilter
};


interface JutSuperSettingsObject {
  openings: {
    doSkip: boolean;
    skipOrder: JutSuperSettingsSkipOrderKeys;
  };
  endings: {
    doSkip: boolean;
    skipOrder: JutSuperSettingsSkipOrderKeys;
    doPersistFullscreen: boolean;
    maxSkips: number;
  };
  skipDelayS: number;
  skipCancelKey: string;
}

type JutSuperSettingsObjectPartial = JutSuperTypeDeepPartial<JutSuperSettingsObject>;
type JutSuperSettingsObjectFilter = JutSuperTypeFilter<JutSuperSettingsObjectPartial>;
