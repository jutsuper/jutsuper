import type { JutSuperTypeFilter } from "/src/types/shared.d.ts";
export {
  /** Internal */
  JutSuperIpcMessage,
  JutSuperIpcRspParams,
  JutSuperIpcInternalRspFilters,
  JutSuperIpcInternalRspFlags,
  JutSuperIpcCreationParams,
  /** Messages */
  JutSuperIpcReqSchema,
  JutSuperIpcRspSchema,
  JutSuperIpcReqSchemaFilter,
  JutSuperIpcRspSchemaFilter
}


//////////////
// Internal //
//////////////


interface JutSuperIpcMessage<T> {
  protocol: "jutsuperIpc";
  namespace: string;
  sender: string;
  flags: string[];
  data: T;
}

interface JutSuperIpcRspParams<RxSchema> {
  senderId?: string;
  senderIds?: string[];
  fromSelf?: boolean;
  schema?: RxSchema;
}

interface JutSuperIpcInternalRspFilters<RxSchema> {
  senders: string[];
  fromSelf?: boolean;
  schema?: RxSchema;
}

interface JutSuperIpcInternalRspFlags {
  shouldRecvFromAnySenders: boolean;
  shouldRecvAnySchema: boolean;
}

interface JutSuperIpcCreationParams {
  namespace: string;
  senderId: string;
  flagsWhitelist: string[];
  sendingFlags: string[];
}

interface JutSuperIpcReasonedResponse {
  isFulfilled: boolean;
  reason?: Error;
}

//////////////
// Messages //
//////////////

interface JutSuperIpcReqSchema {
  loadingAllowed?: {
    tell?: {
      state: true;
    };
  };
  assetsInjected?: {
    tell?: {
      state: true;
      extensionUrl: string;
    };
  };
  essentialsLoaded?: {
    tell?: {
      state: true;
    };
  };
  preEpisodeSwitch?: {
    askIsAllowed?: true;
    req?: {
      state: true;
      isFullscreen: boolean;
    };
  };
  playing?: {
    reqPlay?: true;
  };
  fullscreen?: {
    askIsWindowFullscreen?: true;
    reqExit?: true;
    reqPlayerFullscreenExit?: true;
    reqExitInjection?: true;
  };
  localization?: {
    reqLocalize: true;
  };
}

interface JutSuperIpcRspSchema {
  loadingAllowed?: JutSuperIpcReasonedResponse;
  assetsInjected?: JutSuperIpcReasonedResponse;
  essentialsLoaded?: JutSuperIpcReasonedResponse;
  preEpisodeSwitch?: {
    rspIsAllowed?: boolean;
    rsp?: JutSuperIpcReasonedResponse;
  };
  playing?: {
    rspPlay?: JutSuperIpcReasonedResponse;
  };
  fullscreen?: {
    rspIsWindowFullscreen?: boolean;
    rspExit?: JutSuperIpcReasonedResponse;
    rspPlayerFullscreenExit?: JutSuperIpcReasonedResponse;
    rspExitInjection?: JutSuperIpcReasonedResponse;
  };
  localization?: {
    rspLocalize: JutSuperIpcReasonedResponse;
  };
}

type JutSuperIpcReqSchemaFilter = JutSuperTypeFilter<JutSuperIpcReqSchema>;
type JutSuperIpcRspSchemaFilter = JutSuperTypeFilter<JutSuperIpcRspSchema>;
