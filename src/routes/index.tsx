import { lazy } from 'react'

const DownloadRoute = lazy(() => import('./download-route'))
const ChartsRoute = lazy(() => import('./charts-route'))
const PrivacyRoute = lazy(() => import('./privacyRoute/PrivacyRoute'))
const TermsRoute = lazy(() => import('./termsRoute/TermsRoute'))
const SupportRoute = lazy(() => import('./support-route'))
const StatsRoute = lazy(() => import('./stats-route'))
const OperatorChatRoute = lazy(
  () => import('./operatorChatRoute/OperatorChatRoute')
)
const OperatorNewEditRoute = lazy(() => import('./operator-new-edit-route'))
const DoctorChatRoute = lazy(() => import('./doctorChatRoute/DoctorChatRoute'))
const LoginRoute = lazy(() => import('./LoginRoute'))
const UserChatRoute = lazy(() => import('./userChatRoute/UserChatRoute'))
const BoardChatsRoute = lazy(() => import('./boardRoute/BoardChatsRoute'))
const BoardTasksRoute = lazy(() => import('./boardRoute/BoardTasksRoute'))
const BoardTemplatesRoute = lazy(
  () => import('./boardRoute/BoardTemplatesRoute')
)
const BoardOperatorsRoute = lazy(
  () => import('./boardRoute/operators-board-route')
)
const OperatorBoard = lazy(() => import('./operator-route'))
const OperatorAssignChats = lazy(() => import('./operator-assign-route'))
const OperatorDashboard = lazy(() => import('./operator-dashboard-route'))
const BoardDoctorsRoute = lazy(() => import('./boardRoute/BoardDoctorsRoute'))
const DataKitRoute = lazy(() => import('./data-kit-route'))
const AssignDataKitRoute = lazy(() => import('./data-kits-assign-route'))
const BoardDataKitsRoute = lazy(() => import('./boardRoute/kits-board-route'))
const AddDataKitRoute = lazy(() => import('./data-kits-add-route'))
const EditDataKitRoute = lazy(() => import('./data-kits-edit-route'))

const TrackedParametersRoute = lazy(() => import('./tracked-parameters-route'))
const EditTrackedParametersRoute = lazy(
  () => import('./tracked-parameters-edit-route')
)
const BoardReturnRoute = lazy(() => import('./boardRoute/BoardReturnRoute'))
const BoardReturnChatsRoute = lazy(
  () => import('./boardRoute/BoardReturnChatsRoute')
)
const DailyMeasurementsRoute = lazy(() => import('./daily-measurements-route'))
const CheckinProblemsRoute = lazy(() => import('./checkin-problems-route'))
const CheckinProblemsByCoachRoute = lazy(
  () => import('./checkin-problems-route/problems-by-coach')
)
const CheckinProblemsByChatRoute = lazy(
  () => import('./checkin-problems-route/problems-by-chat')
)
const BoardMeasurementsRoute = lazy(
  () => import('./boardRoute/BoardMeasurementsRoute')
)
const BoardMeasurementsChatsRoute = lazy(
  () => import('./boardRoute/BoardMeasurementsChatsRoute')
)
const ObjectivesRoute = lazy(() => import('./objectives-route'))
const AddObjectiveRoute = lazy(() => import('./objectives-add-route'))
const EditObjectiveRoute = lazy(() => import('./objectives-edit-route'))
const OpenObjectiveRoute = lazy(() => import('./objectives-open-route'))
const KeyResultRoute = lazy(
  () => import('./objectives-open-route/key-result-route')
)
const DataCollectionRoute = lazy(() => import('./data-collection-route'))
const DataCollectionByChatRoute = lazy(
  () => import('./data-collection-route/data-collection-by-coach')
)
const RecommendationsByChatRoute = lazy(
  () => import('./operator-dashboard-route/recommendations-by-chat-route')
)
const HabitsByChatRoute = lazy(
  () => import('./operator-dashboard-route/habits-by-chat-route')
)
const DrugsByChatRoute = lazy(
  () => import('./operator-dashboard-route/drugs-by-chat-route')
)

export const unauthorizedRotes = [
  {
    path: '/',
    component: LoginRoute,
    name: 'LoginRoute',
    exact: true,
  },
  {
    path: '/chat/:id',
    component: UserChatRoute,
    name: 'UserChatRoute',
    exact: false,
  },
  {
    path: '/privacy',
    component: PrivacyRoute,
    name: 'PrivacyRoute',
    exact: true,
  },
  {
    path: '/terms',
    component: TermsRoute,
    name: 'TermsRoute',
    exact: true,
  },
  {
    path: '/support',
    component: SupportRoute,
    name: 'SupportRoute',
    exact: true,
  },
  {
    path: '/download',
    component: DownloadRoute,
    name: 'DownloadRoute',
    exact: false,
  },
]

export const authorizedRoutes = [
  {
    path: '/',
    component: BoardChatsRoute,
    name: 'BoardChatsRoute',
    exact: true,
  },
  {
    path: '/charts/:id',
    component: ChartsRoute,
    name: 'ChartsRoute',
    exact: false,
  },
  {
    path: '/tasks',
    component: BoardTasksRoute,
    name: 'BoardTasksRoute',
    exact: false,
  },
  {
    path: '/templates',
    component: BoardTemplatesRoute,
    name: 'BoardTemplatesRoute',
    exact: false,
  },
  {
    path: '/operators',
    component: BoardOperatorsRoute,
    name: 'BoardOperatorsRoute',
    exact: false,
  },
  {
    path: '/operator/new',
    component: OperatorNewEditRoute,
    name: 'OperatorNew',
    exact: false,
  },
  {
    path: '/operator/:id',
    component: OperatorBoard,
    name: 'OperatorBoard',
    exact: true,
  },
  {
    path: '/operator/:id/assign',
    component: OperatorAssignChats,
    name: 'OperatorAssignChats',
    exact: false,
  },
  {
    path: '/operator/:id/dashboard',
    component: OperatorDashboard,
    name: 'OperatorDashboard',
    exact: false,
  },
  {
    path: '/operator/:id/edit',
    component: OperatorNewEditRoute,
    name: 'OperatorEdit',
    exact: false,
  },
  {
    path: '/doctors',
    component: BoardDoctorsRoute,
    name: 'BoardDoctorsRoute',
    exact: false,
  },
  {
    path: '/tracked-parameters',
    component: TrackedParametersRoute,
    name: 'TrackedParametersRoute',
    exact: false,
  },
  {
    path: '/tracked-parameter/edit/:trackedParameter',
    component: EditTrackedParametersRoute,
    name: 'EditTrackedParametersRoute',
    exact: true,
  },
  {
    path: '/tracked-parameter/daily-measurements',
    component: DailyMeasurementsRoute,
    name: 'DailyMeasurementsRoute',
    exact: false,
  },
  {
    path: '/tracked-parameter/checkin-problems',
    component: CheckinProblemsRoute,
    name: 'CheckinProblemsRoute',
    exact: true,
  },
  {
    path: '/tracked-parameter/checkin-problems/:operatorId',
    component: CheckinProblemsByCoachRoute,
    name: 'CheckinProblemsByCoachRoute',
    exact: true,
  },
  {
    path: '/tracked-parameter/checkin-problems/info/:chatId',
    component: CheckinProblemsByChatRoute,
    name: 'CheckinProblemsByChatRoute',
    exact: true,
  },
  {
    path: '/tracked-parameter/patient-return',
    component: BoardReturnRoute,
    name: 'BoardReturnRoute',
    exact: true,
  },
  {
    path: '/tracked-parameter/patient-return/:operatorId',
    component: BoardReturnChatsRoute,
    name: 'BoardReturnChatsRoute',
    exact: false,
  },
  {
    path: '/tracked-parameter/measurements',
    component: BoardMeasurementsRoute,
    name: 'BoardMeasurementsRoute',
    exact: true,
  },
  {
    path: '/tracked-parameter/measurements/:operatorId',
    component: BoardMeasurementsChatsRoute,
    name: 'BoardMeasurementsChatsRoute',
    exact: false,
  },
  {
    path: '/tracked-parameter/habits/:operatorId',
    component: HabitsByChatRoute,
    name: 'HabitsByChatRoute',
    exact: false,
  },
  {
    path: '/tracked-parameter/recommendations/:operatorId',
    component: RecommendationsByChatRoute,
    name: 'RecommendationsByChatRoute',
    exact: false,
  },
  {
    path: '/tracked-parameter/drugs/:operatorId',
    component: DrugsByChatRoute,
    name: 'DrugsByChatRoute',
    exact: false,
  },
  {
    path: '/tracked-parameter/objectives',
    component: ObjectivesRoute,
    name: 'ObjectivesRoute',
    exact: true,
  },
  {
    path: '/tracked-parameter/objectives/add',
    component: AddObjectiveRoute,
    name: 'AddObjectiveRoute',
    exact: true,
  },
  {
    path: '/tracked-parameter/objectives/:id/edit',
    component: EditObjectiveRoute,
    name: 'EditObjectiveRoute',
    exact: true,
  },
  {
    path: '/tracked-parameter/objectives/:id/',
    component: OpenObjectiveRoute,
    name: 'OpenObjectiveRoute',
    exact: true,
  },
  {
    path: '/tracked-parameter/objectives/:id/:keyResultName',
    component: KeyResultRoute,
    name: 'KeyResultRoute',
    exact: true,
  },
  {
    path: '/tracked-parameter/data-collection',
    component: DataCollectionRoute,
    name: 'DataCollectionRoute',
    exact: true,
  },
  {
    path: '/tracked-parameter/data-collection/:operatorId',
    component: DataCollectionByChatRoute,
    name: 'DataCollectionByChatRoute',
    exact: true,
  },
  {
    path: '/data-kits',
    component: BoardDataKitsRoute,
    name: 'BoardDataKitsRoute',
    exact: false,
  },
  {
    path: '/new-data-kit',
    component: AddDataKitRoute,
    name: 'AddDataKitRoute',
    exact: true,
  },
  {
    path: '/data-kit/:id',
    component: DataKitRoute,
    name: 'DataKitRoute',
    exact: true,
  },
  {
    path: '/data-kit/:id/assign',
    component: AssignDataKitRoute,
    name: 'AssignDataKitRoute',
    exact: false,
  },
  {
    path: '/data-kit/:id/edit',
    component: EditDataKitRoute,
    name: 'EditDataKitRoute',
    exact: false,
  },
  {
    path: '/doctor/chat/:id',
    component: DoctorChatRoute,
    name: 'DoctorChatRoute',
    exact: false,
  },
  {
    path: '/stats/:number',
    component: StatsRoute,
    name: 'StatsRoute',
    exact: false,
  },
  {
    path: '/operator/chat/:id',
    component: OperatorChatRoute,
    name: 'OperatorChatRoute',
    exact: false,
  },
  {
    path: '/privacy',
    component: PrivacyRoute,
    name: 'PrivacyRoute',
    exact: false,
  },
  {
    path: '/terms',
    component: TermsRoute,
    name: 'TermsRoute',
    exact: false,
  },
  {
    path: '/download',
    component: DownloadRoute,
    name: 'DownloadRoute',
    exact: false,
  },
]
