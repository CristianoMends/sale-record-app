import { CommonModule } from '@angular/common';
import { Component, Input, ViewChild } from '@angular/core';
import { FormsModule } from '@angular/forms';
import CreateSale from '../../interface/CreateSale';
import { SaleService } from '../../service/sale.service';
import Item from '../../interface/Item';
import SaleItem from '../../interface/SaleItem';
import { ItemService } from '../../service/item.service';
import { LoadingSpinnerComponent } from "../../shared/loading-spinner/loading-spinner.component";
import { MessageComponent } from "../message/message.component";

@Component({
  selector: 'app-sales-register-box',
  standalone: true,
  providers: [SaleService, ItemService],
  imports: [CommonModule, FormsModule, LoadingSpinnerComponent, MessageComponent],
  templateUrl: './sales-register-box.component.html',
  styleUrl: './sales-register-box.component.css'
})
export class SalesRegisterBoxComponent {
  constructor(
    private saleService: SaleService,
    private itemService: ItemService) {

  }
  @ViewChild('message') message!: MessageComponent;
  currentQuantity: number | undefined;
  total: number = 0.0;
  items: Item[] = [];
  selectedItem: Item | undefined;
  saleItems: SaleItem[] = []
  isLoading: boolean = false;
  cod!: string | undefined;

  sale: CreateSale = {
    itens: [
      {
        item: {
          id: 0
        },
        quantity: 2
      }
    ],
    paymentMethod: "PIX"
  };


  ngOnInit(): void {
    this.loadItems();
  }

  incrementQuantity() {
    this.currentQuantity = (this.currentQuantity! + 1) % 100;
  }

  decrementQuantity() {
    this.currentQuantity = (this.currentQuantity! - 1 + 100) % 100;
  }

  addByCod() {
    for (const item of this.items) {
      if (item.id == this.cod) {
        this.selectedItem = item;
        this.addItem();
        this.cod = undefined;
        if (!this.currentQuantity || this.currentQuantity < 1) { this.currentQuantity = 1 }
        break;
      }
    }
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
    if (!this.currentQuantity || this.currentQuantity < 1) { this.currentQuantity = 1 }

    if (this.selectedItem && this.currentQuantity) {
      this.saleItems.unshift({ item: this.selectedItem, quantity: this.currentQuantity });
    }
    this.getTotal();
    this.currentQuantity = undefined;
    this.selectedItem = undefined;
  }

  finalizeSale() {
    if (this.saleItems.length < 1) {
      this.message.title = 'Nenhum produto adicionado!';
      this.message.message = 'Para salvar uma venda, primeiro adicione itens!';
      this.message.showContainer();
      return;
    }
    this.isLoading = true;
    this.sale.itens = this.saleItems.map(saleItem => ({
      item: {
        id: Number(saleItem.item.id)  // Converte 'id' de string para number
      },
      quantity: saleItem.quantity
    }));
    this.saleService.saveSale(this.sale).subscribe({
      next: () => {
        this.isLoading = false;
        window.location.reload();
      },
      error: () => {
        this.isLoading = false;
        this.message.title = 'Erro ao registrar venda!';
        this.message.showContainer();
      }
    });
  }




}
