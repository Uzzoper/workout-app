import { Exercise } from './exercise.model';

export interface Workout {
  id: number;
  name: string;
  description?: string;
  scheduled_date?: string;
  user_id: number;
  created_at?: string;
  updated_at?: string;
  exercises?: Exercise[];
}

export interface CreateWorkoutRequest {
  name: string;
  description?: string;
  scheduled_date?: string;
}

export interface UpdateWorkoutRequest {
  name?: string;
  description?: string;
  scheduled_date?: string;
}