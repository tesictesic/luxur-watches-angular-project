import { Component } from '@angular/core';
import { AdminLookupTablesService } from '../../../../shared/services/admin-lookup-tables.service';
import { HelperService } from '../../../../shared/services/helper.service';
import { GenderServiceService } from '../../../../shared/services/gender-service.service';

@Component({
  selector: 'app-genders-dashboard',
  templateUrl: './genders-dashboard.component.html',
  styleUrl: './genders-dashboard.component.css'
})
export class GendersDashboardComponent {
  gender_arr:any
  total_pages_arr:number[]=[];
  currentPage:any
  constructor(
    private admin_lookup:AdminLookupTablesService,
    private helper:HelperService,
    private gender_service:GenderServiceService
    
  ){}
  ngOnInit(): void {
    //Called after the constructor, initializing input properties, and the first call to ngOnChanges.
    //Add 'implements OnInit' to the class.
    this.gender_service.getGender().subscribe({
      next:(data)=>{
        console.log(data);
        this.gender_arr=data.items
        this.currentPage=data.currentPage;
        this.total_pages_arr=this.helper.fillInPagination(data.totalPages)
      },
      error:(err)=>{
        console.log(err);
      }
    })
  }
  insertGender(){
    this.admin_lookup.$isDisabled.next(false);
    this.admin_lookup.$table_name.next("genders");
  }
  changePagination(page:number){
    
    this.gender_service.getGender(page).subscribe({
      next:(data)=>{
        console.log(data);
        this.gender_arr=data.items
        this.currentPage=data.currentPage;
        this.total_pages_arr=this.helper.fillInPagination(data.totalPages)
      },
      error:(errors)=>{console.log(errors)}
    })
}
}
