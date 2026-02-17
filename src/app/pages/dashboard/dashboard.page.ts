import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { Router } from '@angular/router';
import { firstValueFrom } from 'rxjs';
import { WorkoutService } from '../../services/workout.service';
import { Workout } from '../../models/workout.model';
import { AuthService } from '../../services/auth.service';
import { addIcons } from 'ionicons';
import { logOutOutline, add, barbellOutline } from 'ionicons/icons';
import {
    IonContent, IonHeader, IonToolbar, IonTitle, IonButtons, IonButton, IonIcon,
    IonRefresher, IonRefresherContent, IonSpinner, IonCard, IonCardHeader,
    IonCardTitle, IonCardSubtitle, IonCardContent, IonBadge, IonFab, IonFabButton
} from '@ionic/angular/standalone';


@Component({
    selector: 'app-dashboard',
    templateUrl: './dashboard.page.html',
    styleUrls: ['./dashboard.page.scss'],
    standalone: true,
    imports: [
        CommonModule,
        IonContent,
        IonHeader,
        IonToolbar,
        IonTitle,
        IonButtons,
        IonButton,
        IonIcon,
        IonRefresher,
        IonRefresherContent,
        IonSpinner,
        IonCard,
        IonCardHeader,
        IonCardTitle,
        IonCardSubtitle,
        IonCardContent,
        IonBadge,
        IonFab,
        IonFabButton
    ]
})

export class DashboardPage implements OnInit {

    workouts: Workout[] = [];
    isLoading: boolean = true;

    constructor(
        private workoutService: WorkoutService,
        private authService: AuthService,
        private router: Router
    ) {
        addIcons({ logOutOutline, add, barbellOutline });
    }

    ngOnInit() {
        this.loadWorkouts();
    }

    async loadWorkouts(event?: any) {
        this.isLoading = true;
        try {
            await this.authService.init();
            const response = await firstValueFrom(
                this.workoutService.getWorkouts()
            );
            this.workouts = response.data;
        } catch (error) {
            console.error('Erro ao carregar treinos:', error);
        } finally {
            this.isLoading = false;
            if (event) {
                event.target.complete();
            }
        }
    }

    createWorkout() {
        this.router.navigate(['/workout/new']);
    }

    openWorkout(workout: Workout) {
        this.router.navigate(['/workout', workout.id]);
    }

    async logout() {
        await this.authService.logout();
        this.router.navigate(['/login']);
    }
}