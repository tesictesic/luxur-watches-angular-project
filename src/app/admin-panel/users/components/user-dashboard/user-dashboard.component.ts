import { Component } from '@angular/core';
import { HelperService } from '../../../../shared/services/helper.service';
import { UserService } from '../../../../shared/services/user.service';
import { AuthService } from '../../../../shared/services/auth.service';
import { RegisterService } from '../../../../shared/services/register.service';
import { User } from '../../../../shared/interfaces/user';
import { UserAdmin } from '../../../../shared/interfaces/user-admin';

@Component({
  selector: 'app-user-dashboard',
  templateUrl: './user-dashboard.component.html',
  styleUrl: './user-dashboard.component.css'
})
export class UserDashboardComponent {
  users_arr:UserAdmin[]=[];
  total_pages_arr:number[]=[];
  currentPage:any
  token:string=''
  id:any

  constructor(
    private helper_service:HelperService,
    private user_service:UserService,
    private auth_service:AuthService,
    private register_service:RegisterService,
  ){}
  ngOnInit(): void {
     this.token=this.auth_service.getJwtToken()
    console.log(this.token)
    //Called after the constructor, initializing input properties, and the first call to ngOnChanges.
    //Add 'implements OnInit' to the class.
    this.getUsers();
    this.user_service.$obj_insert_form.subscribe(item=>{
      if(item!=''){
        console.log(item);
        console.log(item.Image);
        this.register_service.getData(item,item.Image);
        this.register_service.sendData().subscribe({
          next:(response)=>{
            console.log(response);
            this.getUsers();
          },
          error:(response)=>{
            console.log(response);
            this.helper_service.$errors.next(response.error)
            this.helper_service.$isDisabled.next(false);
          }
        })
      }
      
    })
    this.helper_service.$delete_confirmation.subscribe(item=>{
      if(item){
        this.user_service.deleteUser(this.id,this.token).subscribe({
          next:(response)=>{
            console.log(response);
            this.getUsers();
          },
          error:(err)=>{
            console.log(err.error.error);
            if(err.error.error) this.helper_service.$delete_error.next(err.error.error);
             
          }
        })
      }
    })
    this.user_service.$obj_update_form.subscribe(item=>{
      if(item!=''){
        let obj_update=item;
        this.user_service.putBrand(obj_update,this.token).subscribe({
          next:(response)=>{
            this.getUsers();
          },
          error:(response)=>{
            console.log(response);
            this.helper_service.$errors.next(response.error)
            this.helper_service.$isDisabled.next(false);
          }
        })
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
updateUser(id:number){
  let obj_brand=this.users_arr.filter(y=>y.id==id)[0];
  console.log(obj_brand);
  this.helper_service.$obj_update.next(obj_brand);
  this.helper_service.$isDisabled.next(false);}
insertUser(){
 this.helper_service.$isDisabled.next(false);
}
deleteUser(id:number){
  this.helper_service.$isDisabledDeleteModal.next(false);
  this.id=id;
}
getUsers():void{
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
  });
}
}
