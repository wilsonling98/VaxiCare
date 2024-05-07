import { Routes } from '@angular/router';

export const routes: Routes = [
    {path:'login',loadComponent: () => import('./pages/login/login.component')},
    {path:'register',loadComponent: () => import('./pages/register/register.component')},
    {path:'ha-home',loadComponent: () => import('./pages/ha-home/ha-home.component')},
    {path:'pt-home',loadComponent: () => import('./pages/patient-home/patient-home.component')},
    {path:'contact-us',loadComponent: () => import('./pages/contact-us/contact-us.component')},
    {path:'register-vaccination',loadComponent:()=> import ('./pages/vaccine-applicant-form/vaccine-applicant-form.component')},
    {path:'after-register-vaccination',loadComponent:()=> import ('./pages/after-register-vaccination/after-register-vaccination.component')},
    {path:'view-vaccine-application',loadComponent:()=> import ('./pages/view-latest-vaccine-applicant-info/view-latest-vaccine-applicant-info.component')},
    {path:'view-vaccine-applicant-info/:id',loadComponent:()=> import ('./pages/view-vaccine-applicant-info/view-vaccine-applicant-info.component')},
    {path:'view-vaccine-applicant-list',loadComponent:()=> import ('./pages/vaccine-applicant-list/vaccine-applicant-list.component')},
    {path:'record-new-vaccine-batch',loadComponent:()=> import ('./pages/vaccine-batch-form/vaccine-batch-form.component')},
    {path:'after-register-new-vaccine-batch',loadComponent:()=> import ('./pages/after-record-new-vaccine-batch/after-record-new-vaccine-batch.component')},
    {path:'view-recorded-batch',loadComponent:()=> import ('./pages/view-recorded-batch/view-recorded-batch.component')},
    {path:'view-vaccine-batch-list',loadComponent:()=> import ('./pages/vaccine-batch-list/vaccine-batch-list.component')},
    {path:'view-vaccine-batch-info/:id',loadComponent:()=> import ('./pages/view-vaccine-batch-info/view-vaccine-batch-info.component')},
    
];
