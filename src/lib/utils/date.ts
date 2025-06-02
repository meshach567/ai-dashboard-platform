import { format, subDays, subMonths, subYears } from 'date-fns'

export function getDateRange(range: string): { start: Date; end: Date } {
  const end = new Date()
  let start: Date

  switch (range) {
    case '7d':
      start = subDays(end, 7)
      break
    case '30d':
      start = subDays(end, 30)
      break
    case '90d':
      start = subDays(end, 90)
      break
    case '1y':
      start = subYears(end, 1)
      break
    default:
      start = subMonths(end, 1)
  }

  return { start, end }
}

export function formatDateForAPI(date: Date): string {
  return format(date, 'yyyy-MM-dd')
}

export function formatDisplayDate(date: Date): string {
  return format(date, 'MMM dd, yyyy')
}