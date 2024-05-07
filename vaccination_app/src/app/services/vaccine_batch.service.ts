import { HttpClient, HttpParams } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { apiUrls } from '../validators/api.urls';
import { Observable } from 'rxjs';

@Injectable({
    providedIn: 'root'
})

export class vaccineBatchService {
    constructor(private http: HttpClient) {}

    registerVaccineBatch(registerObj: any): Observable<any> {
        return this.http.post<any>(`${apiUrls.vaccineBatchServiceApi}createNewVaccineBatch`, registerObj);
    }

    getAllVaccineBatches(): Observable<any[]> {
        return this.http.get<any[]>(`${apiUrls.vaccineBatchServiceApi}/getAllVaccineBatch`);
    }

    getVaccineBatchById(id: string): Observable<any> {
        return this.http.get<any>(`${apiUrls.vaccineBatchServiceApi}/getVaccineBatch/${id}`);
    }

    getLatestRecordedVaccineBatch(): Observable<any> {
        return this.http.get<any>(`${apiUrls.vaccineBatchServiceApi}/latestVaccineBatch`);
      }
}