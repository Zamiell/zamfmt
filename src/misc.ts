export function error(...msg: any[]) {
  console.error('error:', msg);
  process.exit(1);
}

export function warning(...msg: any[]) {
  console.warn('warning:', msg);
}
