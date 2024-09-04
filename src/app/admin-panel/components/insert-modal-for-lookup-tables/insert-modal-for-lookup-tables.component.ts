import { Component } from '@angular/core';
import { AdminLookupTablesService } from '../../../shared/services/admin-lookup-tables.service';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { HelperService } from '../../../shared/services/helper.service';
import { Brand } from '../../../shared/interfaces/brand';

@Component({
  selector: 'app-insert-modal-for-lookup-tables',
  templateUrl: './insert-modal-for-lookup-tables.component.html',
  styleUrl: './insert-modal-for-lookup-tables.component.css'
})
export class InsertModalForLookupTablesComponent {
  isDisabled:boolean=true;
  isUpdate:boolean=false;
  table_text:string='';
  input_value:string=''
  form = new FormGroup({});
  
  errors_array:any
  brand:Brand|null=null;
  obj_update:any={}

 constructor(
  private admin_lookup:AdminLookupTablesService,
  private helper:HelperService
 ){}
 ngOnInit(): void {
  
  //Called after the constructor, initializing input properties, and the first call to ngOnChanges.
  //Add 'implements OnInit' to the class.
  this.helper.$isDisabled.subscribe(item=>{
    this.isDisabled=item
    console.log(item);
  })
  this.admin_lookup.$table_name.subscribe(item=>{
    this.table_text=item;
    this.obj_update={};
    console.log(this.table_text);
    this.form.addControl('Name', new FormControl('', [Validators.required, Validators.minLength(3)]));
    this.form.addControl('Id',new FormControl(''));
    console.log(this.table_text);
    if (this.table_text === 'brand') {
      // Ako je 'brand', dodajte Description polje u formu
      this.form.addControl('Description', new FormControl('', [Validators.required, Validators.minLength(20)]));
      
    } else {
      // Ako nije 'brand', uklonite Description polje iz forme
      this.form.removeControl('Description');
    }
    console.log(this.form);
  });
  this.helper.$errors.subscribe(item=>{
    this.errors_array=item
  })
  this.helper.$obj_update.subscribe(item=>{
    setTimeout(()=>{
      this.obj_update=item;
    },100)
    
    
    this.isUpdate=true
    console.log(this.obj_update.description);
  })
 }
 closeModal():void{
  this.helper.$isDisabled.next(true);
  
 }
 save(type:string):void{
 if(type=='update'){
  this.form.patchValue({
    "Id": this.obj_update.id
  })
 console.log(this.form.value);
  this.admin_lookup.$form_obj_update.next(this.form.value);
 } 
 else  {
  this.form.removeControl("Id");
  this.admin_lookup.$form_obj_insert.next(this.form.value);
 }
 
  
  if(this.table_text=='brand'){
    this.form.reset({
      Name:'',
      Description:''
    });
  }
  else{
    this.form.reset({Name:''});
  }
  this.closeModal();
 }
}
