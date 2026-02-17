import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Storage } from '@ionic/storage-angular';
import { Observable, BehaviorSubject } from 'rxjs';
import { tap } from 'rxjs/operators';
import { environment } from '../../environments/environment';
import { LoginRequest, RegisterRequest, AuthResponse } from '../models/user.model';

@Injectable({
  providedIn: 'root'
})
export class AuthService {

  private apiUrl = environment.apiUrl;
  private token: string | null = null;
  private isAuthenticated = new BehaviorSubject<boolean>(false);
  private initPromise: Promise<void> | null = null;

  constructor(
    private http: HttpClient,
    private storage: Storage
  ) {
    this.init();
  }

  async init() {
    if (!this.initPromise) {
      this.initPromise = this._doInit();
    }
    return this.initPromise;
  }

  private async _doInit() {
    await this.storage.create();
    this.token = await this.storage.get('token');
    this.isAuthenticated.next(!!this.token);
  }

  login(credentials: LoginRequest): Observable<AuthResponse> {
    return this.http.post<AuthResponse>(`${this.apiUrl}/login`, credentials)
      .pipe(
        tap(async (response) => {
          this.token = response.token;
          await this.storage.set('token', this.token);
          this.isAuthenticated.next(true);
        })
      );
  }

  register(data: RegisterRequest): Observable<AuthResponse> {
    return this.http.post<AuthResponse>(`${this.apiUrl}/register`, data);
  }

  async logout() {
    await this.storage.remove('token');
    this.token = null;
    this.isAuthenticated.next(false);
  }

  getToken(): string | null {
    return this.token;
  }

  isLoggedIn() {
    return this.isAuthenticated.asObservable();
  }
}