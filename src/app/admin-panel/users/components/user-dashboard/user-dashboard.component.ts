import { Component } from '@angular/core';
import { HelperService } from '../../../../shared/services/helper.service';
import { UserService } from '../../../../shared/services/user.service';
import { AuthService } from '../../../../shared/services/auth.service';

@Component({
  selector: 'app-user-dashboard',
  templateUrl: './user-dashboard.component.html',
  styleUrl: './user-dashboard.component.css'
})
export class UserDashboardComponent {
  users_arr:any
  total_pages_arr:number[]=[];
  currentPage:any
  token:string=''

  constructor(
    private helper_service:HelperService,
    private user_service:UserService,
    private auth_service:AuthService
  ){}
  ngOnInit(): void {
     this.token=this.auth_service.getJwtToken()
    console.log(this.token)
    //Called after the constructor, initializing input properties, and the first call to ngOnChanges.
    //Add 'implements OnInit' to the class.
    this.user_service.getUsers(null,this.token).subscribe({
      next:(data)=>{
        console.log(data);
        this.users_arr=data.items
        this.currentPage=data.currentPage;
        this.total_pages_arr=this.helper_service.fillInPagination(data.totalPages)
      },
      error:(err)=>{
        console.log(err);
      }
    })
    
  }
  changePagination(page:number){
    
    this.user_service.getUsers(page,this.token).subscribe({
      next:(data)=>{
        console.log(data);
        this.users_arr=data.items
        this.currentPage=data.currentPage;
        this.total_pages_arr=this.helper_service.fillInPagination(data.totalPages)
      },
      error:(errors)=>{console.log(errors)}
    })
}

}
