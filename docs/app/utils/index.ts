export function formatDateByLocale(d: string | number | Date, options: Intl.DateTimeFormatOptions = { year: 'numeric', month: 'long', day: 'numeric' }): string {
  return new Date(d).toLocaleDateString('en', options)
}
