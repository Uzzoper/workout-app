export interface Exercise {
  id: number;
  name: string;
  sets: number;
  reps: number;
  weight?: number;
  position?: number;
  rest_time?: number;
  notes?: string;
  workout_id: number;
  created_at?: string;
  updated_at?: string;
}

export interface CreateExerciseRequest {
  name: string;
  sets: number;
  reps: number;
  weight?: number;
  position?: number;
  rest_time?: number;
  notes?: string;
}

export interface UpdateExerciseRequest {
  name?: string;
  sets?: number;
  reps?: number;
  weight?: number;
  position?: number;
  rest_time?: number;
  notes?: string;
}