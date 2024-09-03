import { Component } from '@angular/core';
import { AdminLookupTablesService } from '../../../shared/services/admin-lookup-tables.service';
import { FormControl, FormGroup, Validators } from '@angular/forms';

@Component({
  selector: 'app-insert-modal-for-lookup-tables',
  templateUrl: './insert-modal-for-lookup-tables.component.html',
  styleUrl: './insert-modal-for-lookup-tables.component.css'
})
export class InsertModalForLookupTablesComponent {
  isDisabled:boolean=true;
  table_text:string='';
  input_value:string=''
  form = new FormGroup({});

 constructor(
  private admin_lookup:AdminLookupTablesService
 ){}
 ngOnInit(): void {
  //Called after the constructor, initializing input properties, and the first call to ngOnChanges.
  //Add 'implements OnInit' to the class.
  this.admin_lookup.$isDisabled.subscribe(item=>{
    this.isDisabled=item
    console.log(item);
  })
  this.admin_lookup.$table_name.subscribe(item=>{
    this.table_text=item;
    this.form.addControl('Name', new FormControl('', [Validators.required, Validators.minLength(3)]));
    console.log(this.table_text);
    if (this.table_text === 'brand') {
      // Ako je 'brand', dodajte Description polje u formu
      this.form.addControl('Description', new FormControl('', [Validators.required, Validators.minLength(10)]));
      
    } else {
      // Ako nije 'brand', uklonite Description polje iz forme
      this.form.removeControl('Description');
    }
    console.log(this.form);
  })
 }
 closeModal():void{
  this.admin_lookup.$isDisabled.next(true);
  
 }
 save():void{
  this.admin_lookup.$form_obj.next(this.form.value);
 }
}
