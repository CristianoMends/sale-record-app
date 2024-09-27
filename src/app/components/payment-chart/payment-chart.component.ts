import { Component, Inject, PLATFORM_ID } from '@angular/core';
import { NgxEchartsDirective, provideEcharts } from 'ngx-echarts';
import { SaleService } from '../../service/sale.service';
import { CommonModule, isPlatformBrowser } from '@angular/common';
import { EChartsOption } from 'echarts';

@Component({
  selector: 'app-payment-chart',
  standalone: true,
  providers: [provideEcharts(), SaleService],
  imports: [CommonModule, NgxEchartsDirective],
  templateUrl: './payment-chart.component.html',
  styleUrls: ['./payment-chart.component.css'] // Corrigido de styleUrl para styleUrls
})
export class PaymentChartComponent {
  chartOption: EChartsOption | null = null;
  isBrowser: boolean;

  constructor(
    @Inject(PLATFORM_ID) private platformId: Object,
    private saleService: SaleService,
  ) {
    this.isBrowser = isPlatformBrowser(this.platformId);

    if (this.isBrowser) {
      this.loadDataFromAPI(); 
    }
  }

  loadDataFromAPI() {
    this.saleService.getAllSales().subscribe(sales => {
      // Contar a frequência de cada método de pagamento
      const paymentMethodsCount = this.countPaymentMethods(sales);

      // Configurar as opções do gráfico de pizza
      this.chartOption = {
        tooltip: {
          trigger: 'item',
          formatter: '{a} <br/>{b}: {c} ({d}%)' // Exibe a informação em português

        },
        legend: {
          orient: 'vertical',
          left: 'left'
        },
        series: [
          {
            name: 'Métodos de Pagamento',
            type: 'pie',
            radius: '50%',
            data: paymentMethodsCount,
            emphasis: {
              itemStyle: {
                shadowBlur: 10,
                shadowOffsetX: 0,
                shadowColor: 'rgba(0, 0, 0, 0.5)'
              }
            },
            label: {
              formatter: '{b}: {c} ({d}%)' // Formatação dos rótulos
            }
          }
        ]
      };
    });
  }

  countPaymentMethods(sales: any[]): { name: string; value: number }[] {
    const paymentMethodsMap: { [key: string]: number } = {};

    sales.forEach(sale => {
      const method = sale.paymentMethod;
      if (paymentMethodsMap[method]) {
        paymentMethodsMap[method]++;
      } else {
        paymentMethodsMap[method] = 1;
      }
    });

    // Converter o mapa em um array para o gráfico
    return Object.entries(paymentMethodsMap).map(([name, value]) => ({ name, value }));
  }
}
