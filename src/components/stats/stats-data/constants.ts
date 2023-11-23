export interface StatDataProps {
  clientNumber: string
  currentDate: string
  selectedValue: string
  checkin: string
  title: string
  storeStatsType: string
  type: string
  text?: string
  handleAddModal: (
    isShow: boolean,
    value: string,
    checkin: string,
    habitName?: string,
    habitId?: string
  ) => void
  handleEditModal: (isShow: boolean, value: any) => void
}
