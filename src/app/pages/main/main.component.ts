import { Component } from '@angular/core';
import { SalesRegisterBoxComponent } from "../../components/sales-register-box/sales-register-box.component";
import { SalesListComponent } from "../../components/sales-list/sales-list.component";
import { HeaderComponent } from "../../components/header/header.component";
import { SideMenuComponent } from "../../components/side-menu/side-menu.component";
import { SalesChartComponent } from "../../components/sales-chart/sales-chart.component";
import { PaymentChartComponent } from "../../components/payment-chart/payment-chart.component";

@Component({
  selector: 'app-main',
  standalone: true,
  imports: [SalesRegisterBoxComponent, SalesListComponent, HeaderComponent, SideMenuComponent, SalesChartComponent, PaymentChartComponent],
  templateUrl: './main.component.html',
  styleUrl: './main.component.css'
})
export class MainComponent {

}
