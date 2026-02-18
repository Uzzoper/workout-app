import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Observable } from 'rxjs';
import { environment } from '../../environments/environment';
import { AuthService } from './auth.service';
import { CreateExerciseRequest, Exercise, UpdateExerciseRequest } from '../models/exercise.model';
import { ApiResponse } from '../models/api-response.model';

@Injectable({
    providedIn: 'root'
})
export class ExerciseService {

    private apiUrl = environment.apiUrl;

    constructor(
        private http: HttpClient,
        private authService: AuthService
    ) { }

    private getHeaders() {
        const token = this.authService.getToken();
        return new HttpHeaders({
            'Content-Type': 'application/json',
            'Authorization': `Bearer ${token}`
        });
    }

    getExercises(workoutId: number): Observable<ApiResponse<Exercise[]>> {
        return this.http.get<ApiResponse<Exercise[]>>(
            `${this.apiUrl}/workouts/${workoutId}/exercises`,
            { headers: this.getHeaders() }
        );
    }

    createExercise(workoutId: number, data: CreateExerciseRequest): Observable<ApiResponse<Exercise>> {
        return this.http.post<ApiResponse<Exercise>>(
            `${this.apiUrl}/workouts/${workoutId}/exercises`,
            data,
            { headers: this.getHeaders() }
        );
    }

    updateExercise(id: number, data: UpdateExerciseRequest): Observable<ApiResponse<Exercise>> {
        return this.http.put<ApiResponse<Exercise>>(
            `${this.apiUrl}/exercises/${id}`,
            data,
            { headers: this.getHeaders() }
        );
    }

    deleteExercise(id: number): Observable<ApiResponse<Exercise>> {
        return this.http.delete<ApiResponse<Exercise>>(
            `${this.apiUrl}/exercises/${id}`,
            { headers: this.getHeaders() }
        );
    }
}