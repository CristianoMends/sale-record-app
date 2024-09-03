import { CommonModule } from '@angular/common';
import { Component } from '@angular/core';
import { FormsModule } from '@angular/forms';
import CreateSale from '../../interface/CreateSale';
import { SaleService } from '../../service/sale.service';
import Item from '../../interface/Item';
import SaleItem from '../../interface/SaleItem';
import { ItemService } from '../../service/item.service';
import { LoadingSpinnerComponent } from "../../shared/loading-spinner/loading-spinner.component";

@Component({
  selector: 'app-sales-register-box',
  standalone: true,
  providers: [SaleService, ItemService],
  imports: [CommonModule, FormsModule, LoadingSpinnerComponent],
  templateUrl: './sales-register-box.component.html',
  styleUrl: './sales-register-box.component.css'
})
export class SalesRegisterBoxComponent {

  constructor(
    private saleService: SaleService,
    private itemService: ItemService) {

  }
  quantity: number = 0;
  total: number = 0.0;
  items: Item[] = [];
  selectedItem: Item = this.items[0];
  saleItems: SaleItem[] = []
  isLoading: boolean = true;

  ngOnInit(): void {
    this.loadItems();
  }

  incrementQuantity() {
    this.quantity = (this.quantity + 1) % 100;
  }

  decrementQuantity() {
    this.quantity = (this.quantity - 1 + 100) % 100;
  }


  sale: CreateSale = {
    saleItems: [
      this.saleItems[0]
    ],
    paymentMethod: "PIX"
  }

  loadItems(): void {
    this.itemService.getAll().subscribe({
      next: (items: Item[]) => {
        this.items = items;
        if (this.items.length > 0) {
          this.selectedItem = this.items[0];
        }
        this.isLoading = false; // Carregamento concluído
      },
      error: (error) => {
        console.error('Erro ao carregar os itens:', error);
        this.isLoading = false; // Mesmo em caso de erro, finalize o carregamento
      }
    });
  }

  getTotal() {
    let total: number = 0.0;
    this.saleItems.forEach(p => {
      total += p.item.price * p.quantity
    })
    this.total = total;
  }

  addItem() {
    let item: any;
    this.items.forEach(i => {
      if (i === this.selectedItem) {
        item = i;
      }
    });
    if (item != null) {
      this.saleItems.splice(0, 0, { item: item, quantity: this.quantity });
    }
    this.getTotal();
  }
  onSubmit() {
    //this.saleService.saveSale(this.sale);
    //window.location.reload();
  }

}
