import * as moment from 'moment';

export function durationString(startUtc: string, endUtc: string) {
  const end = moment.utc(endUtc);
  const start = moment.utc(startUtc);

  const timeAgoSeconds = Math.floor(end.diff(start) / 1000);

  if (timeAgoSeconds === 1) {
    return '1 second';
  }
  if (timeAgoSeconds < 60) {
    return `${timeAgoSeconds} seconds`;
  }
  if (timeAgoSeconds < (60 + 60)) {
    return '1 minute';
  }
  if (timeAgoSeconds < 3600) {
    return `${Math.floor(timeAgoSeconds / 60)} minutes`;
  }
  if (timeAgoSeconds < (3600 + 3600)) {
    return '1 hour';
  }
  if (timeAgoSeconds < 86400) {
    return `${Math.floor(timeAgoSeconds / 3600)} hours`;
  }
  if (timeAgoSeconds < (86400 + 86400)) {
    return '1 day';
  }

  return `${Math.floor(timeAgoSeconds / 86400)} days`;
}
