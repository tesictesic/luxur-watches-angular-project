import { Component, OnInit } from '@angular/core';
import { AdminLookupTablesService } from '../../../shared/services/admin-lookup-tables.service';
import { HelperService } from '../../../shared/services/helper.service';

@Component({
  selector: 'app-delete-modal',
  templateUrl: './delete-modal.component.html',
  styleUrl: './delete-modal.component.css'
})
export class DeleteModalComponent implements OnInit {
  isDisabled:boolean=true;
  constructor(
    private helper:HelperService
  ){}
  ngOnInit(): void {
    //Called after the constructor, initializing input properties, and the first call to ngOnChanges.
    //Add 'implements OnInit' to the class.
    this.helper.$isDisabledDeleteModal.subscribe(item=>{
      this.isDisabled=item;
    })
    
  }
  closeModal(){
    this.helper.$isDisabledDeleteModal.next(true);
  }
  save(){
    this.helper.$delete_confirmation.next(true);
    this.closeModal();
  }
}
