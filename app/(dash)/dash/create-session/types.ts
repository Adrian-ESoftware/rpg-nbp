export interface SessionData {
  name: string
  description: string
  maxPlayers: number
  duration: string
  sessionType: string
  difficulty: string
  systemType: string
  isPrivate: boolean
  allowSpectators: boolean
  tags: string[]
}

export interface ValidationErrors {
  name?: string
  description?: string
  maxPlayers?: string
}

export interface SystemOptions {
  [key: string]: string
}

export interface FormOptions {
  systemOptions: SystemOptions
  difficultyOptions: SystemOptions
  sessionTypeOptions: SystemOptions
}
