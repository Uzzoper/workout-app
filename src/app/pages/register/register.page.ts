import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { Router } from '@angular/router';
import { AuthService } from '../../services/auth.service';
import { IonContent, IonItem, IonLabel, IonInput, IonButton, IonSpinner, IonText, ToastController } from '@ionic/angular/standalone';
import { firstValueFrom } from 'rxjs';

@Component({
    selector: 'app-register',
    templateUrl: './register.page.html',
    styleUrls: ['./register.page.scss'],
    standalone: true,
    imports: [CommonModule, FormsModule, IonContent, IonItem, IonLabel, IonInput, IonButton, IonSpinner, IonText],
})

export class RegisterPage {

    name: string = '';
    email: string = '';
    password: string = '';
    passwordConfirmation: string = '';
    isLoading: boolean = false;
    errorMessage: string = '';

    constructor(
        private authService: AuthService,
        private router: Router,
        private toastController: ToastController
    ) { }

    async register() {
        if (!this.name || !this.email || !this.password) {
            this.errorMessage = 'Preencha todos os campos obrigatórios';
            return;
        }
        if (this.password !== this.passwordConfirmation) {
            this.errorMessage = 'As senhas não coincidem';
            return;
        }
        if (this.password.length < 6) {
            this.errorMessage = 'A senha deve ter pelo menos 6 caracteres';
            return;
        }
        this.isLoading = true;
        this.errorMessage = '';
        try {
            await firstValueFrom(this.authService.register({
                name: this.name,
                email: this.email,
                password: this.password,
                password_confirmation: this.passwordConfirmation
            }));

            const toast = await this.toastController.create({
                message: 'Conta criada com sucesso!',
                duration: 1500,
                position: 'bottom',
                color: 'success'
            });
            await toast.present();

            setTimeout(() => {
                this.router.navigate(['/login']);
            }, 1500);
        } catch (error: any) {
            this.errorMessage = error.error?.message || 'Erro ao criar conta';
        } finally {
            this.isLoading = false;
        }
    }

    goToLogin() {
        this.router.navigate(['/login']);
    }
}