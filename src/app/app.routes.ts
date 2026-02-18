import { Routes } from '@angular/router';

export const routes: Routes = [
  {
    path: '',
    redirectTo: 'login',
    pathMatch: 'full',
  },

  {
    path: 'login',
    loadComponent: () => import('./pages/login/login.page').then(m => m.LoginPage),
  },

  {
    path: 'register',
    loadComponent: () => import('./pages/register/register.page').then(m => m.RegisterPage)
  },

  {
    path: 'dashboard',
    loadComponent: () => import('./pages/dashboard/dashboard.page').then(m => m.DashboardPage)
  },

  {
    path: 'workout/:id',
    loadComponent: () => import('./pages/workout/workout.page').then(m => m.WorkoutPage)
  },
  {
    path: 'workout/:id/exercises/new',
    loadComponent: () => import('./pages/exercise-form/exercise-form.page').then( m => m.ExerciseFormPage)
  },
];
