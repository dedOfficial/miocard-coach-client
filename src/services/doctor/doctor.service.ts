/* eslint-disable import/prefer-default-export */
import { api } from '../api-client'
import { DoctorType } from '../../store/doctorStore/doctor.store.types'

export async function listDoctors(): Promise<DoctorType[]> {
  const response = await api.get('doctor').json<DoctorType[]>()
  return response
}

export async function getDoctor(id: string): Promise<DoctorType> {
  const response = await api.get(`doctor/${id}`).json<DoctorType>()
  return response
}

export async function addDoctor(
  name: string,
  number: string,
  email: string
): Promise<DoctorType> {
  const response = await api
    .post('doctor', {
      json: {
        name,
        email,
        number,
      },
    })
    .json<DoctorType>()
  return response
}

export async function deleteDoctor(id: string): Promise<DoctorType> {
  const response = await api
    .delete('doctor', {
      json: {
        id,
      },
    })
    .json<DoctorType>()
  return response
}

export async function changeDoctor(
  id: string,
  email: string,
  name: string,
  number: string
): Promise<void> {
  await api.patch('doctor', {
    json: {
      email,
      name,
      number,
      id,
    },
  })
}

export async function callDoc(chatId: string, doctorId: string): Promise<void> {
  await api.post('doctor/call', {
    json: {
      chatId,
      doctorId,
    },
  })
}
