import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { Router } from '@angular/router';
import { AuthService } from '../../services/auth.service';
import { IonContent, IonItem, IonLabel, IonInput, IonButton, IonSpinner, IonText } from '@ionic/angular/standalone';
import { firstValueFrom } from 'rxjs';

@Component({
    selector: 'app-login',
    templateUrl: './login.page.html',
    styleUrls: ['./login.page.scss'],
    standalone: true,
    imports: [CommonModule, FormsModule, IonContent, IonItem, IonLabel, IonInput, IonButton, IonSpinner, IonText]
})
export class LoginPage {
    email: string = '';
    password: string = '';
    isLoading: boolean = false;
    errorMessage: string = '';

    constructor(
        private authService: AuthService,
        private router: Router
    ) { }

    async login() {
        if (!this.email || !this.password) {
            this.errorMessage = 'Preencha email e senha';
            return;
        }
        this.isLoading = true;
        this.errorMessage = '';
        try {
            await firstValueFrom(this.authService.login({
                email: this.email,
                password: this.password
            }));
            this.router.navigate(['/dashboard']);
        } catch (error: any) {
            this.errorMessage = error.error?.message || 'Erro ao fazer login';
        } finally {
            this.isLoading = false;
        }
    }

    goToRegister() {
        console.log('Navegar para registro');
    }
}