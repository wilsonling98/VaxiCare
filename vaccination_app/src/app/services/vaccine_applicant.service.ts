import { HttpClient, HttpParams } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { apiUrls } from '../validators/api.urls';
import { Observable } from 'rxjs';

@Injectable({
    providedIn: 'root'
})

export class vaccineApplicantService {
    constructor(private http: HttpClient) {}

    registerVaccination(registerObj: any): Observable<any> {
        return this.http.post<any>(`${apiUrls.vaccineApplicantServiceApi}registerVaccine`, registerObj);
    }

    getAllVaccineApplicants(): Observable<any[]> {
        return this.http.get<any[]>(`${apiUrls.vaccineApplicantServiceApi}/getAllVaccineApplicants`);
      }
    
    getVaccineApplicantById(id: string): Observable<any> {
        return this.http.get<any>(`${apiUrls.vaccineApplicantServiceApi}/getVaccineApplicantInfo/${id}`);
      }
    
    confirmVaccineAppointment(id: string): Observable<any> {
        return this.http.put<any>(`${apiUrls.vaccineApplicantServiceApi}/confirm/${id}`, {});
    }
    
    confirmVaccinationAdministered(id: string): Observable<any> {
        return this.http.put<any>(`${apiUrls.vaccineApplicantServiceApi}/administer/${id}`, {});
      }
    
    updateVaccineApplicantInfo(id: string, updateObj: any): Observable<any> {
        return this.http.put<any>(`${apiUrls.vaccineApplicantServiceApi}/update/${id}`, updateObj);
      }
    
    getLatestAddedApplicant(): Observable<any> {
        return this.http.get<any>(`${apiUrls.vaccineApplicantServiceApi}/latest-applicant`);
      }
}