import { CommonModule } from '@angular/common';
import { Component, Input } from '@angular/core';
import Item from '../../interface/Item';

@Component({
  selector: 'app-item-table',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './item-table.component.html',
  styleUrl: './item-table.component.css'
})
export class ItemTableComponent {
  @Input() items!: Item[];
}
