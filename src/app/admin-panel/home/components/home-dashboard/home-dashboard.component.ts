import { Component } from '@angular/core';
import { HelperService } from '../../../../shared/services/helper.service';
import { Contact } from '../../../../shared/interfaces/contact';
import { AuthService } from '../../../../shared/services/auth.service';

@Component({
  selector: 'app-home-dashboard',
  templateUrl: './home-dashboard.component.html',
  styleUrl: './home-dashboard.component.css'
})
export class HomeDashboardComponent {
  contact_arr:any;
  total_pages_arr:number[]=[];
  currentPage:any
  token:string='';
 constructor(
  private helper_service:HelperService,
  private auth_service:AuthService
 ){}
 ngOnInit(): void {
   this.token=this.auth_service.getJwtToken();
  //Called after the constructor, initializing input properties, and the first call to ngOnChanges.
  //Add 'implements OnInit' to the class.
  this.helper_service.getContacts(this.token).subscribe({
    next:(data)=>{
      console.log(data);
      this.contact_arr=data.items;
      console.log(this.contact_arr);
      this.currentPage=data.currentPage;
      this.total_pages_arr=this.helper_service.fillInPagination(data.totalPages)
    },
    error:(err)=>{
      console.log(err);
    }
  })
 }
 changePagination(page:number){
    
  this.helper_service.getContacts(this.token,page).subscribe({
    next:(data)=>{
      console.log(data);
      this.contact_arr=data.items
      this.currentPage=data.currentPage;
      this.total_pages_arr=this.helper_service.fillInPagination(data.totalPages)
    },
    error:(errors)=>{console.log(errors)}
  })
}

}
