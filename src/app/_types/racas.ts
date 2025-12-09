
export type Breed = {
  id: string
  attributes: {
    name: string
    male_weight: { min: number; max: number }
    female_weight: { min: number; max: number }
    life: { min: number; max: number }
  }
}

export type ApiResponse = {
  data: Breed[]
}

export type BreedResult = {
  racas: Breed[]
  totalPages: number
  error?: string
}