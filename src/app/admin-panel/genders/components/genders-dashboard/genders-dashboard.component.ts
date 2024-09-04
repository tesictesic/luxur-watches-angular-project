import { Component } from '@angular/core';
import { AdminLookupTablesService } from '../../../../shared/services/admin-lookup-tables.service';
import { HelperService } from '../../../../shared/services/helper.service';
import { GenderServiceService } from '../../../../shared/services/gender-service.service';
import { AuthService } from '../../../../shared/services/auth.service';
import { TableWithNameColumn } from '../../../../shared/interfaces/table-with-name-column';

@Component({
  selector: 'app-genders-dashboard',
  templateUrl: './genders-dashboard.component.html',
  styleUrl: './genders-dashboard.component.css'
})
export class GendersDashboardComponent {
  gender_arr:TableWithNameColumn[]=[]
  total_pages_arr:number[]=[];
  currentPage:any
  obj_form:any
  id:any
  constructor(
    private admin_lookup:AdminLookupTablesService,
    private helper:HelperService,
    private gender_service:GenderServiceService,
    private auth:AuthService
    
  ){}
  ngOnInit(): void {
    let token=this.auth.getJwtToken();
    //Called after the constructor, initializing input properties, and the first call to ngOnChanges.
    //Add 'implements OnInit' to the class.
   this.getGenders();
    this.admin_lookup.$form_obj_insert.subscribe(item=>{
      this.obj_form=item;
      console.log(this.obj_form);
       if(item!=""){
         this.gender_service.postGender(this.obj_form,token).subscribe({
           next:(response)=>{
             console.log(response);
             this.getGenders();
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
        this.gender_service.deleteGender(this.id,token).subscribe({
          next:(response)=>{
            console.log(response);
            this.getGenders();
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
      this.gender_service.putGender(obj_update_brand,token).subscribe({
        next:(response)=>{
          console.log(response);
          this.getGenders();
        },
        error:(response)=>{
          console.log(response);
          this.helper.$errors.next(response.error);
        }
      })
      }
      
    })
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
getGenders():void{
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
  this.helper.$isDisabled.next(false);
  this.admin_lookup.$table_name.next("genders");
}
deleteGender(id:number){
  
  this.helper.$isDisabledDeleteModal.next(false);
  this.id=id;
}
updateGender(id:number){
  let obj_gender=this.gender_arr.filter(y=>y.id==id)[0];
  this.admin_lookup.$table_name.next("genders");
  this.helper.$obj_update.next(obj_gender);
  this.helper.$isDisabled.next(false);
  
}
}
