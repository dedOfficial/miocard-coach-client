export interface StatsHeaderProps {
  chartValue: {
    filledValue: number
    totalValue: number
  }
  currentDate: Date
  setCurrentDay: (date: Date) => void
}
