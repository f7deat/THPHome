// Example method, no practical significance
export function trim(str: string) {
  return str.trim();
}

export function language(str: string) {
  if (!str) {
    return 1;
  }
  return str === 'vi-VN' ? 1 : 2
}

/**
 * Format bytes as human-readable text.
 * 
 * @param bytes Number of bytes.
 * @param si True to use metric (SI) units, aka powers of 1000. False to use 
 *           binary (IEC), aka powers of 1024.
 * @param dp Number of decimal places to display.
 * 
 * @return Formatted string.
 */
export function humanFileSize(bytes: number, si=false, dp=1) {
  const thresh = si ? 1000 : 1024;
  let newBytes = bytes;

  if (Math.abs(bytes) < thresh) {
    return bytes + ' B';
  }

  const units = si 
    ? ['kB', 'MB', 'GB', 'TB', 'PB', 'EB', 'ZB', 'YB'] 
    : ['KiB', 'MiB', 'GiB', 'TiB', 'PiB', 'EiB', 'ZiB', 'YiB'];
  let u = -1;
  const r = 10**dp;

  do {
    newBytes /= thresh;
    ++u;
  } while (Math.round(Math.abs(newBytes) * r) / r >= thresh && u < units.length - 1);


  return newBytes.toFixed(dp) + ' ' + units[u];
}