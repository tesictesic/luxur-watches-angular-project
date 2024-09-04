import { Component } from '@angular/core';
import { AdminLookupTablesService } from '../../../../shared/services/admin-lookup-tables.service';
import { BrandServiceService } from '../../../../shared/services/brand-service.service';
import { HelperService } from '../../../../shared/services/helper.service';
import { AuthService } from '../../../../shared/services/auth.service';
import { Brand } from '../../../../shared/interfaces/brand';

@Component({
  selector: 'app-brands-dashboard',
  templateUrl: './brands-dashboard.component.html',
  styleUrl: './brands-dashboard.component.css'
})
export class BrandsDashboardComponent {
  obj_form:any
  brands_arr:Brand[]=[];
  total_pages_arr:number[]=[];
  currentPage:any
  id:any;
  token:string=''
  constructor(
    private admin_lookup:AdminLookupTablesService,
    private brands_service:BrandServiceService,
    private helper:HelperService,
    private auth:AuthService
  ){}
  ngOnInit(): void {
    this.token=this.auth.getJwtToken();
    //Called after the constructor, initializing input properties, and the first call to ngOnChanges.
    //Add 'implements OnInit' to the class.
      this.GetBrands();
    this.admin_lookup.$form_obj_insert.subscribe(item=>{
      this.obj_form=item;
      console.log(item);
      if(item!=""){
        this.brands_service.postBrand(this.obj_form).subscribe({
          next:(response)=>{
            console.log(response);
            this.GetBrands();
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
        this.brands_service.deleteBrand(this.id,this.token).subscribe({
          next:(response)=>{
            console.log(response);
            this.GetBrands();
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
      let obj_update_brand=item
      this.brands_service.putBrand(obj_update_brand,this.token).subscribe({
        next:(response)=>{
          console.log(response);
          this.GetBrands();
        },
        error:(response)=>{
          console.log(response);
          this.helper.$errors.next(response.error);
        }
      })
    })
    
  }
  
  changePagination(page:number){
    
    this.brands_service.getBrands(page).subscribe({
      next:(data)=>{
        console.log(data);
        this.brands_arr=data.items
        this.currentPage=data.currentPage;
        this.total_pages_arr=this.helper.fillInPagination(data.totalPages)
      },
      error:(errors)=>{console.log(errors)}
    })
}
GetBrands(){
  this.brands_service.getBrands().subscribe({
    next:(data)=>{
      console.log(data);
      this.brands_arr=data.items
      this.currentPage=data.currentPage;
      this.total_pages_arr=this.helper.fillInPagination(data.totalPages)
    },
    error:(err)=>{
      console.log(err);
    }
  })
}
insertBrand(){
  this.helper.$isDisabled.next(false);
  this.admin_lookup.$table_name.next("brand");
  
}
deleteBrand(id:number){
  this.helper.$isDisabledDeleteModal.next(false);
  this.id=id;
}
updateBrand(id:number){
  let obj_brand=this.brands_arr.filter(y=>y.id==id)[0];
  this.admin_lookup.$table_name.next("brand");
  this.helper.$obj_update.next(obj_brand);
  this.helper.$isDisabled.next(false);
  

}
}
