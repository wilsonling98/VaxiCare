import { HttpClient, HttpParams } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { apiUrls } from '../validators/api.urls';
import { BehaviorSubject, Observable } from 'rxjs';
import { User } from '../model/user.model';

@Injectable({
  providedIn: 'root'
})
export class AuthService {
  private currentUserSubject: BehaviorSubject<User | null>;
  public currentUser: Observable<User | null>;

  constructor(private http: HttpClient) {
    this.currentUserSubject = new BehaviorSubject<User | null>(null);
    this.currentUser = this.currentUserSubject.asObservable();
  }

  registerService(registerObj: any): Observable<any> {
    return this.http.post<any>(`${apiUrls.authServiceApi}register`, registerObj);
  }

  checkEmailAvailability(email: string): Observable<{ available: boolean }> {
    return this.http.get<{ available: boolean }>(`${apiUrls.authServiceApi}check-email/${email}`);
  } 

  login(loginObj: any): Observable<User> {
    return this.http.post<User>(`${apiUrls.authServiceApi}login`, loginObj);
  }

  isLoggedIn(): boolean {
    // Check if currentUser exists
    return !!this.currentUserSubject.value;
  }

  getCategory(userIDPrefix: string): string {
    let category = ''; // Default category if no mapping is found
    
    // Mapping between userID prefixes and categories
    const categoryMap: { [key: string]: string } = {
      'HA': 'HA',
      'PT': 'PT',
      // Add more mappings as needed
    };

    // Look up the category based on the userID prefix
    if (categoryMap.hasOwnProperty(userIDPrefix)) {
      category = categoryMap[userIDPrefix];
    }

    return category;
  }

  getCurrentUser(): User | null {
    // Method to get the current user information
    return this.currentUserSubject.value;
  }

  setCurrentUser(user: User): void {
    // Set the current user
    this.currentUserSubject.next(user);
  }

  logout(): void {
    // Clear currentUser on logout
    this.currentUserSubject.next(null);
  }

  fetchUserCategory(userID: string): Observable<{ category: string }> {
    const params = new HttpParams().set('userID', userID);
    return this.http.get<{ category: string }>(`${apiUrls.authServiceApi}getUserCategory`, { params });
  }
}




