/* eslint-disable import/prefer-default-export */
import * as AuthService from './auth/auth.service'
import * as ChatService from './chat/chat.service'
import * as CheckinService from './checkin/checkin.service'
import * as DoctorService from './doctor/doctor.service'
import * as FileService from './files/files.service'
import * as OperatorService from './operator/operator.service'
import * as StatsService from './stats/stats.service'
import * as TaskService from './task/task.service'
import * as TemplateService from './template/template.service'
import * as DataKitService from './data-kits/data-kits.service'
import * as ReturnService from './return/return.service'
import * as MeasurementsService from './measurements/measurements.service'
import * as TrackedParameterService from './trackedParameter/trackedParameter.service'
import * as ObjectivesService from './objectives/objectives.service'
import * as CheckinProblemsService from './checkin-problems/checkinProblems.service'
import * as DataCollectionService from './data-collection/data-collection.service'
import * as NotesService from './notes/notes.service'

const ApiService = {
  ...AuthService,
  ...ChatService,
  ...CheckinService,
  ...DoctorService,
  ...FileService,
  ...OperatorService,
  ...StatsService,
  ...TaskService,
  ...TemplateService,
  ...DataKitService,
  ...ReturnService,
  ...MeasurementsService,
  ...TrackedParameterService,
  ...ObjectivesService,
  ...CheckinProblemsService,
  ...DataCollectionService,
  ...NotesService,
}

export {
  AuthService,
  ChatService,
  CheckinService,
  DoctorService,
  FileService,
  OperatorService,
  StatsService,
  TaskService,
  TemplateService,
  DataKitService,
  ReturnService,
  MeasurementsService,
  TrackedParameterService,
  ObjectivesService,
  CheckinProblemsService,
  DataCollectionService,
  NotesService,
}

export default ApiService
