import datakitStore from '../../store/datakitStore/datakit.store'

/* eslint-disable import/prefer-default-export */
export const generateCopyName = (name: string): string => {
  const copyName = `${name} (Copy)`

  const existibleCopyNames = datakitStore.dataKits.filter(
    (dataKit) => dataKit.name === copyName
  )

  if (existibleCopyNames.length >= 1) {
    return `${copyName} ${existibleCopyNames.length + 1}`
  }

  return copyName
}

export const sortCheckins = (
  a: { name: string; order: number },
  b: { name: string; order: number }
): number => {
  if (a.order > b.order) return 1
  return -1
}
