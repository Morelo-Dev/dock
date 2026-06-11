export type Subject = {
  id: string
  name: string
  shortName: string
}

export type Student = {
  id: string
  name: string
  grades: Record<string, number | null>
}
