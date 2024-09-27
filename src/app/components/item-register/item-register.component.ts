import { Component, NgModule } from '@angular/core';
import { ItemService } from '../../service/item.service';
import { CommonModule } from '@angular/common';
import { FormsModule, NgModel } from '@angular/forms';
import CreateItem from '../../interface/CreateItem';
import Item from '../../interface/Item';
import { LoadingSpinnerComponent } from "../../shared/loading-spinner/loading-spinner.component";

@Component({
  selector: 'app-item-register',
  standalone: true,
  providers:[],
  imports: [CommonModule, FormsModule, LoadingSpinnerComponent],
  templateUrl: './item-register.component.html',
  styleUrl: './item-register.component.css'
})
export class ItemRegisterComponent {
  constructor(private itemService:ItemService){}
  description!:string;
  price!:number;
  isLoading = false;

  item:CreateItem = {
    description:"",
    price:0
  };
  
  onSubmit(){
    this.item.description = this.description;
    this.item.price = this.price
    
    if(!this.price || !this.description || this.price <= 0 || this.description == ""){
      return;
    }
    
    this.isLoading = true;
    this.itemService.save(this.item).subscribe({
      next:(item)=>{
        this.isLoading = false;
        window.location.reload();
      },
      error:()=>{
        this.isLoading = false;
      }
    });
    
  }
}
