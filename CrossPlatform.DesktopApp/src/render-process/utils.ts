import { channelPrefix } from './constants';

export const superChannelCollection = <T extends Record<string, string>>(channelCollection: T): { [K in keyof T]: string } => {
  const superChannelCollection: Partial<{ [K in keyof T]: string }> = {};

  for (const key in channelCollection) {
    superChannelCollection[key] = `${channelPrefix}${channelCollection[key]}`;
  }

  return superChannelCollection as { [K in keyof T]: string };
};
