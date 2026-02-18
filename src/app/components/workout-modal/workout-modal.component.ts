import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import {
    IonContent, IonHeader, IonToolbar, IonTitle, IonButton,
    IonItem, IonLabel, IonInput, IonTextarea, IonDatetime, IonButtons,
    ModalController
} from '@ionic/angular/standalone';

@Component({
    selector: 'app-workout-modal',
    templateUrl: './workout-modal.component.html',
    styleUrls: ['./workout-modal.component.scss'],
    standalone: true,
    imports: [
        CommonModule, FormsModule,
        IonContent, IonHeader, IonToolbar, IonTitle, IonButton,
        IonItem, IonLabel, IonInput, IonTextarea, IonDatetime, IonButtons
    ]
})

export class WorkoutModalComponent {
    name: string = '';
    description: string = '';
    scheduledDate: string = '';
    constructor(private modalController: ModalController) { }
    dismiss(data?: any) {
        this.modalController.dismiss(data);
    }
    save() {
        if (!this.name) {
            return;
        }
        this.dismiss({
            name: this.name,
            description: this.description,
            scheduled_date: this.scheduledDate
        });
    }
}