/* eslint-disable import/prefer-default-export */
export type CheckinType = {
  checkins: string[]
  additionally: string
}

export const defaultCheckin = {
  checkins: [],
  additionally: '',
}

export const initialCheckins = [
  {
    text: 'No problems',
    value: 'isNoProblems',
  },
  {
    text: 'Late for check-in',
    value: 'isLate',
  },

  {
    text: 'Complains about the program',
    value: 'isComplain',
  },
  {
    text: 'The patient interrupts the check-in and does not finish it',
    value: 'isInterrupt',
  },
  {
    text: 'The patient says that he has problems at work or at home',
    value: 'isProblems',
  },
  {
    text: 'The patient does not get in touch at the specifield time, skips the check-in',
    value: 'isNotGetInTouch',
  },
  {
    text: 'The client began to respond to message for a long time. Answers short, without details',
    value: 'isLongTime',
  },
  {
    text: 'Request to postpone check-in time',
    value: 'isPostpone',
  },
  {
    text: 'Doesn`t want to partcipate in coaching',
    value: 'isNotParticipate',
  },
  {
    text: 'The client rushes the coach during the chat and is noticeably in a hurry',
    value: 'isRushes',
  },
  {
    text: 'The client reports that he is very busy and works a lot',
    value: 'isBusy',
  },
]

export const checkinsName = {
  first: 'First check-in',
  second: 'Second check-in',
}
