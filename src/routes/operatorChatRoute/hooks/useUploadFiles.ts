import { MutableRefObject, useCallback } from 'react'

import { uploadImage } from '../../../services/files/files.service'

const useUploadFiles = (
  id: string,
  socket: MutableRefObject<SocketIOClient.Socket | undefined>,
  handler: () => void
): ((files: any) => Promise<void>) => {
  const uploadFile = useCallback(
    async (files) => {
      try {
        const file = files.target.files[0]
        const index = Date.now().toString()
        const formData = new FormData()
        formData.append('file', file)
        formData.append('type', 'image')
        formData.append('id', index)
        await uploadImage(formData)
        socket.current?.emit('image:operator', {
          message: `${index.split('.')[0]}.webp`,
          room: id,
        })
        handler()
      } catch (error) {
        // eslint-disable-next-line no-console
        console.error('error', error)
      }
    },
    [handler, id, socket]
  )

  return uploadFile
}

export default useUploadFiles
