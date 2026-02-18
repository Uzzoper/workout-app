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
    IonCardTitle, IonCardSubtitle, IonCardContent, IonBadge, IonFab, IonFabButton,
    ModalController, ToastController
} from '@ionic/angular/standalone';
import { WorkoutModalComponent } from 'src/app/components/workout-modal/workout-modal.component';


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
        private router: Router,
        private modalController: ModalController,
        private toastController: ToastController
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

    openWorkout(workout: Workout) {
        this.router.navigate(['/workout', workout.id]);
    }

    async createWorkout() {
        const modal = await this.modalController.create({
            component: WorkoutModalComponent,
            breakpoints: [0, 0.5, 0.75, 1],
            initialBreakpoint: 0.75,
        });
        await modal.present();
        const { data } = await modal.onWillDismiss();

        if (data) {
            try {
                await firstValueFrom(
                    this.workoutService.createWorkout(data)
                );

                const toast = await this.toastController.create({
                    message: 'Treino criado com sucesso!',
                    duration: 1500,
                    color: 'success'
                });
                await toast.present();

                this.loadWorkouts();

            } catch (error) {
                console.error('Erro:', error);
            }
        }
    }

    async logout() {
        await this.authService.logout();
        this.router.navigate(['/login']);
    }
}