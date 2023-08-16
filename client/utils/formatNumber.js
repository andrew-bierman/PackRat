export function formatNumber(num) {
  if (num != null) {
    return Number(+num.toFixed(2)).toLocaleString();
  }
}
