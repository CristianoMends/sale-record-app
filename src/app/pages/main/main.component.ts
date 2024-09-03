import { Component } from '@angular/core';
import { SalesRegisterBoxComponent } from "../../components/sales-register-box/sales-register-box.component";
import { SalesListComponent } from "../../components/sales-list/sales-list.component";
import { HeaderComponent } from "../../components/header/header.component";
import { SideMenuComponent } from "../../components/side-menu/side-menu.component";
import { SectionHomeComponent } from "../../components/section-home/section-home.component";

@Component({
  selector: 'app-main',
  standalone: true,
  imports: [SalesRegisterBoxComponent, SalesListComponent, HeaderComponent, SideMenuComponent, SectionHomeComponent],
  templateUrl: './main.component.html',
  styleUrl: './main.component.css'
})
export class MainComponent {

}
