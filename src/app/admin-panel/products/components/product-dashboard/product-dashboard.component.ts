import { Component } from '@angular/core';
import { ProductServiceService } from '../../../../shared/services/product-service.service';
import { HelperService } from '../../../../shared/services/helper.service';
import { AuthService } from '../../../../shared/services/auth.service';
import { Product } from '../../../../shared/interfaces/product';
@Component({
  selector: 'app-product-dashboard',
  templateUrl: './product-dashboard.component.html',
  styleUrl: './product-dashboard.component.css'
})
export class ProductDashboardComponent {
  product_items:Product[]=[];
  total_pages_arr:number[]=[];
  params_obj:any={};
  currentPage:any
  id:any;
  constructor(
   private product_service:ProductServiceService,
   private helper_service:HelperService,
   private auth_service:AuthService
   
    
  ){}
  ngOnInit(): void {
    let token=this.auth_service.getJwtToken();
    //Called after the constructor, initializing input properties, and the first call to ngOnChanges.
    //Add 'implements OnInit' to the class.
    this.getProducts()
    this.product_service.$product_obj_insert.subscribe(item=>{
      if(item!=''){
       console.log(item);
       let obj_items=item;
       this.product_service.insertProduct(obj_items,token).subscribe({
        next:(response)=>{
          console.log(response);
            this.getProducts();
        },
        error:(err)=>{console.log(err)}
      })
      }
    })
    this.helper_service.$delete_confirmation.subscribe(item=>{
      if(item){
        this.product_service.deleteProduct(this.id,token).subscribe({
          next:(response)=>{
            console.log(response);
            this.getProducts();
          },
          error:(err)=>{
            console.log(err);
            if(err.error.error) this.helper_service.$delete_error.next(err.error.error);
             
          }
        })
      }
    })
    this.product_service.$product_obj_update.subscribe(item=>{
      if(item!=''){
        let obj_items=item;
        this.product_service.updateProduct(obj_items,token).subscribe({
          next:(response)=>{
            console.log(response);
              this.getProducts();
          },
          error:(err)=>{console.log(err)}
        })
      }
    })

  }
  changePagination(page:number){
    this.params_obj.page=page;
    console.log(this.params_obj);
    this.product_service.getProductsWithParams(this.params_obj).subscribe({
      next:(data)=>{
        console.log(data);
        this.product_items=data.items;
        this.currentPage=data.currentPage;
        this.total_pages_arr=this.helper_service.fillInPagination(data.totalPages)
      },
      error:(errors)=>{console.log(errors)}
    })
 }
 insertProduct():void{
  setTimeout(()=>{
    this.helper_service.$isDisabled.next(false);
  },400)
  
 }
 updateProduct(id:number){
  let obj_brand=this.product_items.filter(y=>y.id==id)[0];
  console.log(obj_brand);
  this.helper_service.$obj_update.next(obj_brand);
  this.helper_service.$isDisabled.next(false);
 }
 deleteProduct(id:number){
  this.helper_service.$isDisabledDeleteModal.next(false);
  this.id=id;
 }
 getProducts():void{
  this.product_service.getProducts().subscribe({
    next:(data)=>{
      console.log(data);
      this.product_items=data.items;
      console.log(this.product_items);  
      this.currentPage=data.currentPage;
      this.total_pages_arr=this.helper_service.fillInPagination(data.totalPages)
     
      console.log(this.currentPage);


    },
    error:(err)=>{
      console.log(err);
    }
  })
 }
}
