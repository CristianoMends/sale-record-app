import { Routes } from '@angular/router';
import { MainComponent } from './pages/main/main.component';
import { SaleRegisterComponent } from './pages/sale-register/sale-register.component';
import { ReportsComponent } from './pages/reports/reports.component';
import { ItemsManagerComponent } from './pages/items-manager/items-manager.component';

export const routes: Routes = [
    {
        path: '',
        component: MainComponent
    },
    {
        path: 'sales',
        component: SaleRegisterComponent
    },{
        path: 'products',
        component: ItemsManagerComponent
    },
    {
        path: 'reports',
        component: ReportsComponent
    },
];
