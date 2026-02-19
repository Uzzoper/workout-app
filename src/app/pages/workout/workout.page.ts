import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ActivatedRoute, Router } from '@angular/router';
import {
    IonContent, IonHeader, IonToolbar, IonTitle, IonButton,
    IonCard, IonCardHeader, IonCardTitle, IonCardSubtitle,
    IonCardContent, IonBadge, IonIcon, IonButtons, IonBackButton,
    IonFab, IonFabButton, IonRefresher, IonRefresherContent, IonSpinner,
} from '@ionic/angular/standalone';
import { addIcons } from 'ionicons';
import { add, fitness, create, trash, arrowBack, chevronUp, chevronDown, timeOutline, documentTextOutline } from 'ionicons/icons';
import { firstValueFrom } from 'rxjs';
import { WorkoutService } from '../../services/workout.service';
import { ExerciseService } from '../../services/exercise.service';
import { Workout } from '../../models/workout.model';
import { Exercise } from '../../models/exercise.model';

@Component({
    selector: 'app-workout',
    templateUrl: './workout.page.html',
    styleUrls: ['./workout.page.scss'],
    standalone: true,
    imports: [
        CommonModule,
        IonContent, IonHeader, IonToolbar, IonTitle, IonButton,
        IonCard, IonCardHeader, IonCardTitle,
        IonCardSubtitle, IonCardContent, IonBadge, IonIcon, IonButtons, IonBackButton,
        IonFab, IonFabButton, IonRefresher, IonRefresherContent, IonSpinner,
    ]
})

export class WorkoutPage implements OnInit {
    workout: Workout | null = null;
    exercises: Exercise[] = [];
    isLoading: boolean = true;
    workoutId: number = 0;
    expandedExerciseId: number | null = null;

    constructor(
        private route: ActivatedRoute,
        private router: Router,
        private workoutService: WorkoutService,
        private exerciseService: ExerciseService
    ) {
        addIcons({ add, fitness, create, trash, arrowBack, chevronUp, chevronDown, timeOutline, documentTextOutline });
    }

    ngOnInit() {
        this.route.params.subscribe(params => {
            this.workoutId = +params['id'];
            this.loadWorkout();
        });
    }

    async loadWorkout(event?: any) {
        this.isLoading = true;
        try {
            const response = await firstValueFrom(
                this.workoutService.getWorkoutById(this.workoutId)
            );
            this.workout = response.data;
            this.exercises = response.data.exercises || [];
        } catch (error) {
            console.error('Erro ao carregar treino:', error);
        } finally {
            this.isLoading = false;
            if (event) {
                event.target.complete();
            }
        }
    }

    toggleExercise(exerciseId: number) {
        this.expandedExerciseId = this.expandedExerciseId === exerciseId ? null : exerciseId;
    }
    isExpanded(exerciseId: number): boolean {
        return this.expandedExerciseId === exerciseId;
    }

    addExercise() {
        this.router.navigate([`/workout/${this.workoutId}/exercises/new`]);
    }

    goBack() {
        this.router.navigate(['/dashboard']);
    }

    editWorkout() {
        console.log('Editar treino - em desenvolvimento');
    }

    async deleteWorkout() {
        console.log('Deletar treino - em desenvolvimento');
    }

    editExercise(exercise: Exercise) {
        console.log('Editar exercício:', exercise);
    }

    async deleteExercise(exercise: Exercise) {
        console.log('Deletar exercício:', exercise);
    }
}