import { Component } from '@angular/core';
import { LoadingSpinnerComponent } from "../../shared/loading-spinner/loading-spinner.component";
import Item from '../../interface/Item';
import { ItemService } from '../../service/item.service';
import { NgFor, NgIf } from '@angular/common';
import { ItemTableComponent } from "../../components/item-table/item-table.component";
import { SideMenuComponent } from "../../components/side-menu/side-menu.component";
import { HeaderComponent } from "../../components/header/header.component";
import { ItemRegisterComponent } from "../../components/item-register/item-register.component";
import { ItemDeleteComponent } from "../../components/item-delete/item-delete.component";

@Component({
  selector: 'app-items-manager',
  standalone: true,
  providers: [ItemService],
  imports: [LoadingSpinnerComponent, NgFor, NgIf, ItemTableComponent, SideMenuComponent, HeaderComponent, ItemRegisterComponent, ItemDeleteComponent],
  templateUrl: './items-manager.component.html',
  styleUrl: './items-manager.component.css'
})
export class ItemsManagerComponent {
  constructor(private itemService:ItemService){}

  items:Item[] = [];
  isLoading = false;


  ngOnInit(): void {
    this.loadItems();    
  }

  loadItems(): void {
    this.isLoading = true;
    this.itemService.getAll().subscribe({
      next: (items: Item[]) => {
        this.items = items;
        this.isLoading = false;
      },
      error: (error) => {
        console.error('Erro ao carregar os itens:', error);
        this.isLoading = false;
      }
    });
  }

}
