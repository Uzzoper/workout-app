import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { AlertController, ToastController } from '@ionic/angular';
import { firstValueFrom } from 'rxjs';
import { ExerciseService } from '../../services/exercise.service';
import {
    IonContent, IonHeader, IonToolbar, IonTitle, IonButton,
    IonItem, IonLabel, IonInput, IonBackButton, IonButtons, IonTextarea
} from '@ionic/angular/standalone';

@Component({
    selector: 'app-exercise-form',
    templateUrl: './exercise-form.page.html',
    styleUrls: ['./exercise-form.page.scss'],
    standalone: true,
    imports: [
        CommonModule, FormsModule,
        IonContent, IonHeader, IonToolbar, IonTitle, IonButton,
        IonItem, IonLabel, IonInput, IonBackButton, IonButtons, IonTextarea
    ],
})

export class ExerciseFormPage {
    workoutId: number = 0;

    name: string = '';
    sets: number = 3;
    reps: number = 12;
    weight?: number;
    restTime?: number;
    notes: string = '';
    constructor(
        private route: ActivatedRoute,
        private router: Router,
        private exerciseService: ExerciseService,
        private alertController: AlertController,
        private toastController: ToastController
    ) { }
    ngOnInit() {
        this.route.params.subscribe(params => {
            this.workoutId = +params['id'];
        });
    }
    async saveExercise() {
        if (!this.name || !this.sets || !this.reps) {
            return;
        }
        try {
            await firstValueFrom(
                this.exerciseService.createExercise(this.workoutId, {
                    name: this.name,
                    sets: this.sets,
                    reps: this.reps,
                    weight: this.weight,
                    rest_time: this.restTime,
                    notes: this.notes
                })
            );
            const toast = await this.toastController.create({
                message: 'Exercício salvo!',
                duration: 1500,
                color: 'success'
            });
            await toast.present();
            this.askAddMore();
        } catch (error) {
            console.error('Erro:', error);
        }
    }
    async askAddMore() {
        const alert = await this.alertController.create({
            header: 'Próximo passo',
            message: 'Deseja adicionar mais um exercício?',
            buttons: [
                {
                    text: 'Não, voltar',
                    handler: () => {
                        this.router.navigate([`/workout/${this.workoutId}`]);
                    }
                },
                {
                    text: 'Sim, adicionar mais',
                    handler: () => {
                        this.clearForm();
                    }
                }
            ]
        });
        await alert.present();
    }
    clearForm() {
        this.name = '';
        this.sets = 3;
        this.reps = 10;
        this.weight = undefined;
        this.restTime = undefined;
        this.notes = '';
    }
}