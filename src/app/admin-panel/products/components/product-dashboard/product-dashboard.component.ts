import { Component } from '@angular/core';
import { ProductServiceService } from '../../../../shared/services/product-service.service';
import { HelperService } from '../../../../shared/services/helper.service';
import { TruncatePipe } from '../../../../shared/pipes/truncate.pipe';

@Component({
  selector: 'app-product-dashboard',
  templateUrl: './product-dashboard.component.html',
  styleUrl: './product-dashboard.component.css'
})
export class ProductDashboardComponent {
  product_items:any
  total_pages_arr:number[]=[];
  params_obj:any={};
  currentPage:any
  constructor(
   private product_service:ProductServiceService,
   private helper_service:HelperService
    
  ){}
  ngOnInit(): void {
    //Called after the constructor, initializing input properties, and the first call to ngOnChanges.
    //Add 'implements OnInit' to the class.
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
}
