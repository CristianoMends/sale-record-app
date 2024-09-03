import { Routes } from '@angular/router';
import { MainComponent } from './pages/main/main.component';
import { SaleRegisterComponent } from './pages/sale-register/sale-register.component';
import { ReportsComponent } from './pages/reports/reports.component';

export const routes: Routes = [
    {
        path: '',
        component: MainComponent
    },
    {
        path: 'sales',
        component: SaleRegisterComponent
    },
    {
        path: 'reports',
        component: ReportsComponent
    },
];
