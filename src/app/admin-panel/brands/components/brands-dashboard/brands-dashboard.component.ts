import { Component } from '@angular/core';
import { AdminLookupTablesService } from '../../../../shared/services/admin-lookup-tables.service';
import { BrandServiceService } from '../../../../shared/services/brand-service.service';
import { HelperService } from '../../../../shared/services/helper.service';

@Component({
  selector: 'app-brands-dashboard',
  templateUrl: './brands-dashboard.component.html',
  styleUrl: './brands-dashboard.component.css'
})
export class BrandsDashboardComponent {
  obj_form:any
  brands_arr:any
  total_pages_arr:number[]=[];
  currentPage:any
  constructor(
    private admin_lookup:AdminLookupTablesService,
    private brands_service:BrandServiceService,
    private helper:HelperService
  ){}
  ngOnInit(): void {
    //Called after the constructor, initializing input properties, and the first call to ngOnChanges.
    //Add 'implements OnInit' to the class.
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
    this.admin_lookup.$form_obj.subscribe(item=>{
      this.obj_form=item;
      console.log(item);
    })
    
  }
  insertBrand(){
    this.admin_lookup.$isDisabled.next(false);
    this.admin_lookup.$table_name.next("brand");
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
}
