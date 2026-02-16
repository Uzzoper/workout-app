import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Observable } from 'rxjs';
import { environment } from '../../environments/environment';
import { AuthService } from './auth.service';
import { CreateWorkoutRequest, UpdateWorkoutRequest, Workout } from '../models/workout.model';
import { ApiResponse } from '../models/api-response.model';

@Injectable({
  providedIn: 'root'
})
export class WorkoutService {
  
  private apiUrl = environment.apiUrl;
  
  constructor(
    private http: HttpClient,
    private authService: AuthService
  ) {}
  private getHeaders() {
    const token = this.authService.getToken();
    return new HttpHeaders({
      'Content-Type': 'application/json',
      'Authorization': `Bearer ${token}`
    });
  }

  getWorkouts(): Observable<ApiResponse<Workout[]>> {
    return this.http.get<ApiResponse<Workout[]>>(`${this.apiUrl}/workouts`, {
      headers: this.getHeaders()
    });
  }

  createWorkout(workout: CreateWorkoutRequest): Observable<ApiResponse<Workout>> {
    return this.http.post<ApiResponse<Workout>>(`${this.apiUrl}/workouts`, workout, {
      headers: this.getHeaders()
    });
  }

  updateWorkout(id: number, workout: UpdateWorkoutRequest): Observable<ApiResponse<Workout>> {
    return this.http.put<ApiResponse<Workout>>(`${this.apiUrl}/workouts/${id}`, workout, {
      headers: this.getHeaders()
    });
  }

  deleteWorkout(id: number): Observable<ApiResponse<Workout>> {
    return this.http.delete<ApiResponse<Workout>>(`${this.apiUrl}/workouts/${id}`, {
      headers: this.getHeaders()
    });
  }
}