// 示例方法，没有实际意义
export function trim(str: string) {
  return str.trim();
}

export function language(str: string) {
  if (!str) {
    return 1;
  }
  return str === 'vi-VN' ? 1 : 2
}