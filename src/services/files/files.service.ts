/* eslint-disable import/prefer-default-export */
import { ChangeEvent } from 'react'
import { api } from '../api-client'

export async function uploadImage(files: FormData): Promise<void> {
  await api.post('files/upload', {
    body: files,
  })
}

export async function addAvatar(
  id: string,
  e: ChangeEvent<HTMLInputElement>,
  type: string
): Promise<void> {
  if (e.target.files) {
    const formData = new FormData()
    formData.append('file', e.target.files[0])
    formData.append('type', type)
    formData.append('id', id)
    await uploadImage(formData)
    await api.patch(`${type}/avatar`, {
      json: {
        id,
      },
    })
  }
}

export async function exportPdf(id: string): Promise<any> {
  return api.get(`export/${id}`)
}
