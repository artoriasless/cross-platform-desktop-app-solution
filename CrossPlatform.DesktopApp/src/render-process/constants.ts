import { superChannelCollection } from './utils';

export const channelPrefix = 'art-ipc-';

//#region app-layout 的监听、发送事件名枚举
export const rendererProcessSendEvent_appLayout = superChannelCollection({
  switchMiniModeLayout: 'app-layout-switch-mini-mode-layout',
  backTabView: 'app-layout-back-tab-view',
  forwardTabView: 'app-layout-forward-tab-view',
  refreshTabView: 'app-layout-refresh-tab-view',
  forceRefreshTabView: 'app-layout-force-refresh-tab-view',
  addTab: 'app-layout-add-tab',
  removeTab: 'app-layout-remove-tab',
  switchActiveTab: 'app-layout-switch-active-tab',
  confirmExit: 'app-layout-confirm-exit',
  zoomInTabView: 'app-layout-zoom-in-tab-view',
  zoomOutTabView: 'app-layout-zoom-out-tab-view',
  openSettingWindow: 'app-layout-open-setting-window',
  openTagsMng: 'app-layout-open-tags-mng',
});

export const rendererProcessListenEvent_appLayout = superChannelCollection({
  appLayoutFinishLoaded: 'app-layout-finish-loaded',
  tabViewLoadStatusChange: 'app-layout-tab-view-load-status-change',
  tabViewTitleChange: 'app-layout-tab-view-title-change',
  syncTabViewZoomFactor: 'app-layout-sync-tab-view-zoom-factor',
  afterCreateTabViewTriggerByMain: 'app-layout-after-create-tab-view-trigger-by-main',
  switchTabViewTriggerByMain: 'app-layout-switch-tab-view-trigger-by-main',
});
//#endregion
