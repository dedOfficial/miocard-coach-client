import { classnames } from 'tailwindcss-classnames'

export const objectiveItemWrapper = classnames(
  'flex',
  'flex-row',
  'justify-between',
  'items-center',
  'relative'
)

export const objectiveItemBox = classnames(
  'flex',
  'flex-col',
  'justify-between',
  'gap-6'
)

export const objectiveItemTitle = classnames('text-blue-600', 'font-semibold')

export const objectiveItemAchievement = classnames('font-thin', 'text-gray-400')

export const objectiveItemAchievementValue = classnames(
  'font-bold',
  'bg-transparent'
)
