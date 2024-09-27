import { Component } from '@angular/core';
import { SaleService } from '../../service/sale.service';
import ViewSale from '../../interface/ViewSale';
import { CommonModule, NgFor, NgIf } from '@angular/common';
import { LoadingSpinnerComponent } from "../../shared/loading-spinner/loading-spinner.component";

@Component({
  selector: 'app-sales-list',
  standalone: true,
  imports: [NgIf, CommonModule, LoadingSpinnerComponent],
  providers: [SaleService],
  templateUrl: './sales-list.component.html',
  styleUrl: './sales-list.component.css'
})
export class SalesListComponent {
  sales: ViewSale[] = [];
  totalToday = 0;
  isLoading: boolean = true;


  constructor(private saleService: SaleService) { this.loadSales() }

  loadSales() {
    this.saleService.getAllSales().subscribe(
      {
        next: (sales: ViewSale[]) => {
          this.sales = sales;
          this.totalToday = this.getTotal(this.sales);
          this.isLoading = false;
        },
        error: (err) => {
          this.isLoading = false;
        }
      }
    );
  }

  getTotal(sale: ViewSale[]): number {
    let total = 0;

    sale.forEach(s => {
      total += s.total;
    })

    return total;
  }

  formatPaymentMethod(paymentMethod: string): string {
    const paymentMethodsMap: { [key: string]: string } = {
      CREDIT: 'Cartão de Crédito',
      DEBIT: 'Cartão de Débito',
      PIX: 'Pix',
      MONEY: 'Dinheiro'
    };

    return paymentMethodsMap[paymentMethod] || paymentMethod;
  }
}
