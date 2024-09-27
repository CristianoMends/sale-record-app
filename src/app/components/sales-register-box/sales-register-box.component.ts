import { CommonModule } from '@angular/common';
import { Component, Input } from '@angular/core';
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
  currentQuantity: number = 1;
  total: number = 0.0;
  items: Item[] = [];
  selectedItem: Item | undefined;
  saleItems: SaleItem[] = []
  isLoading: boolean = false;

  sale: CreateSale = {
    itens: [
      {
        item: {
          id: 0
        },
        quantity: 2
      }
    ],
    paymentMethod: "CREDIT"
  };
  

  ngOnInit(): void {
    this.loadItems();
  }

  incrementQuantity() {
    this.currentQuantity = (this.currentQuantity + 1) % 100;
  }

  decrementQuantity() {
    this.currentQuantity = (this.currentQuantity - 1 + 100) % 100;
  }


  loadItems(): void {
    this.isLoading = true;
    this.itemService.getAll().subscribe({
      next: (items: Item[]) => {
        this.items = items;
        if (this.items.length > 0) {
          this.selectedItem = undefined;
        }
        this.isLoading = false;
      },
      error: (error) => {
        console.error('Erro ao carregar os itens:', error);
        this.isLoading = false;
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
    if (this.selectedItem) {
      this.saleItems.unshift({ item: this.selectedItem, quantity: this.currentQuantity });
    }
    this.getTotal();
    this.currentQuantity = 1;
    this.selectedItem = undefined;
  }

  finalizeSale() {
    // Atualiza os itens da venda com os itens selecionados
    this.sale.itens = this.saleItems.map(saleItem => ({
      item: {
        id: Number(saleItem.item.id)  // Converte 'id' de string para number
      },
      quantity: saleItem.quantity
    }));
  
    // Chama o serviço para salvar a venda
    this.saleService.saveSale(this.sale);
  
    console.log("Venda finalizada", this.sale);
  }
  
  
  

}
