import { Component, ViewChild } from '@angular/core';
import { ItemService } from '../../service/item.service';
import { MessageComponent } from "../message/message.component";
import { FormsModule } from '@angular/forms';

@Component({
  selector: 'app-item-delete',
  standalone: true,
  imports: [MessageComponent, FormsModule],
  providers:[ItemService],
  templateUrl: './item-delete.component.html',
  styleUrl: './item-delete.component.css'
})
export class ItemDeleteComponent {
  constructor(private itemService:ItemService){}
  cod!:number | undefined;
  @ViewChild('message') message!:MessageComponent;

  onSubmit(){
  
    if(!this.cod){
      this.message.title = 'Digite o código do produto!';
      this.message.showContainer();
      return;
    }else if(this.cod <= 0){
      this.message.title = 'O código informado não existe!';
      this.message.showContainer();
      return;
    }
    
    this.itemService.delete(this.cod).subscribe({
      next:async (item)=>{        
        window.location.reload();
      },
      error:()=>{
        this.message.title = 'Erro ao deletar, tente novamente!';
        this.message.showContainer();
      }
    });
    
  }
}
