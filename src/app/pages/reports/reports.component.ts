import { Component } from '@angular/core';
import { SalesListComponent } from "../../components/sales-list/sales-list.component";
import { HeaderComponent } from "../../components/header/header.component";
import { SideMenuComponent } from "../../components/side-menu/side-menu.component";

@Component({
  selector: 'app-reports',
  standalone: true,
  imports: [SalesListComponent, HeaderComponent, SideMenuComponent],
  templateUrl: './reports.component.html',
  styleUrl: './reports.component.css'
})
export class ReportsComponent {

}
