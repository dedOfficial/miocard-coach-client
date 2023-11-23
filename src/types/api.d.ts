interface RequestState {
  loading: boolean
  error?: null
}

interface Dictionary<T> {
  [_id: string]: T
}

type ApiError = any
