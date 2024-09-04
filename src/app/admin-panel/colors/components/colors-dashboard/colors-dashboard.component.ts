import { Component } from '@angular/core';
import { AdminLookupTablesService } from '../../../../shared/services/admin-lookup-tables.service';
import { HelperService } from '../../../../shared/services/helper.service';
import { AuthService } from '../../../../shared/services/auth.service';
import { TableWithNameColumn } from '../../../../shared/interfaces/table-with-name-column';

@Component({
  selector: 'app-colors-dashboard',
  templateUrl: './colors-dashboard.component.html',
  styleUrl: './colors-dashboard.component.css'
})
export class ColorsDashboardComponent {
  colors_arr:TableWithNameColumn[]=[];
  total_pages_arr:number[]=[];
  currentPage:any
  obj_form:any
  id:any
  constructor(
    private admin_lookup:AdminLookupTablesService,
    private helper:HelperService,
    private auth:AuthService
  ){}
  ngOnInit(): void {
    //Called after the constructor, initializing input properties, and the first call to ngOnChanges.
    //Add 'implements OnInit' to the class.
    this.getColors();
    let token=this.auth.getJwtToken();
    console.log(token);
    this.admin_lookup.$form_obj_insert.subscribe(item=>{
      this.obj_form=item;
      console.log(this.obj_form);
       if(item!=""){
         this.helper.postColor(this.obj_form,token).subscribe({
           next:(response)=>{
             console.log(response);
             this.getColors();
            this.helper.$isDisabled.next(true);
           },
           error:(response)=>{
             console.log(response);
             if(response.status==422) this.helper.$errors.next(response.error);
            
           }
         })
       }
      
    })
    this.helper.$delete_confirmation.subscribe(item=>{
    
      if(item){
        this.helper.deleteColor(this.id,token).subscribe({
          next:(response)=>{
            console.log(response);
            this.getColors();
          },
          error:(err)=>{
            console.log(err.error.error);
            if(err.error.error) this.helper.$delete_error.next(err.error.error);
             
          }
        })
      }
    })
    this.admin_lookup.$form_obj_update.subscribe(item=>{
      console.log(item);
      if(item!=''){
        let obj_update_brand=item
      this.helper.putColor(obj_update_brand,token).subscribe({
        next:(response)=>{
          console.log(response);
          this.getColors();
        },
        error:(response)=>{
          console.log(response);
          this.helper.$errors.next(response.error);
        }
      })
      }
    })
    
  }
  insertColor(){
    this.helper.$isDisabled.next(false);
    this.admin_lookup.$table_name.next("colors");
  }
  changePagination(page:number){
    
    this.helper.getColors(page).subscribe({
      next:(data)=>{
        console.log(data);
        this.colors_arr=data.items
        this.currentPage=data.currentPage;
        this.total_pages_arr=this.helper.fillInPagination(data.totalPages)
      },
      error:(errors)=>{console.log(errors)}
    })
}
getColors():void{
  this.helper.getColors().subscribe({
    next:(data)=>{
      console.log(data);
      this.colors_arr=data.items
      this.currentPage=data.currentPage;
      this.total_pages_arr=this.helper.fillInPagination(data.totalPages-1)
    },
    error:(err)=>{
      console.log(err);
    }
  })
}
deleteColor(id:number){
  
  this.helper.$isDisabledDeleteModal.next(false);
  this.id=id;
}
updateColor(id:number){
  let obj_color=this.colors_arr.filter(y=>y.id==id)[0];
  this.helper.$obj_update.next(obj_color);
  this.helper.$isDisabled.next(false);
  this.admin_lookup.$table_name.next("colors");
}

}
