import { Component } from '@angular/core';
import { AdminLookupTablesService } from '../../../../shared/services/admin-lookup-tables.service';
import { HelperService } from '../../../../shared/services/helper.service';

@Component({
  selector: 'app-colors-dashboard',
  templateUrl: './colors-dashboard.component.html',
  styleUrl: './colors-dashboard.component.css'
})
export class ColorsDashboardComponent {
  colors_arr:any
  total_pages_arr:number[]=[];
  currentPage:any
  constructor(
    private admin_lookup:AdminLookupTablesService,
    private helper:HelperService
  ){}
  ngOnInit(): void {
    //Called after the constructor, initializing input properties, and the first call to ngOnChanges.
    //Add 'implements OnInit' to the class.
    this.helper.getColors().subscribe({
      next:(data)=>{
        console.log(data);
        this.colors_arr=data.items
        this.currentPage=data.currentPage;
        this.total_pages_arr=this.helper.fillInPagination(data.totalPages)
      },
      error:(err)=>{
        console.log(err);
      }
    })
    
  }
  insertColor(){
    this.admin_lookup.$isDisabled.next(false);
    this.admin_lookup.$table_name.next("colors");
  }
  changePagination(page:number){
    
    this.helper.getColors().subscribe({
      next:(data)=>{
        console.log(data);
        this.colors_arr=data.items
        this.currentPage=data.currentPage;
        this.total_pages_arr=this.helper.fillInPagination(data.totalPages)
      },
      error:(errors)=>{console.log(errors)}
    })
}
}
