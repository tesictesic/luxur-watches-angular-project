import { ChangeDetectorRef, Component, NgZone } from '@angular/core';
import { HelperService } from '../../../shared/services/helper.service';
import { GenderServiceService } from '../../../shared/services/gender-service.service';
import { BrandServiceService } from '../../../shared/services/brand-service.service';
import { TableWithNameColumn } from '../../../shared/interfaces/table-with-name-column';
import { FormArray, FormControl, FormGroup, Validators } from '@angular/forms';
import { ProductServiceService } from '../../../shared/services/product-service.service';
import { Product } from '../../../shared/interfaces/product';
import { setTimeout } from 'timers/promises';

@Component({
  selector: 'app-insert-update-product-modal',
  templateUrl: './insert-update-product-modal.component.html',
  styleUrl: './insert-update-product-modal.component.css'
})
export class InsertUpdateProductModalComponent {
   isDisabled:boolean=true;
   Image:File|null=null;
   gender_arr:TableWithNameColumn[]=[];
   brand_arr:TableWithNameColumn[]=[];
   color_arr:TableWithNameColumn[]=[];
   product:Product|null=null;
   form:any=new FormGroup({
    ProductName:new FormControl('',[Validators.required,Validators.minLength(5)]),
    ProductPrice:new FormControl('',[Validators.required]),
    ProductDescription:new FormControl('',[Validators.required,Validators.minLength(30)]),
    BrandId:new FormControl('',[Validators.required]),
    GenderId:new FormControl('',[Validators.required],),
    Product_Colors: new FormArray([], [Validators.required]),
    Image:new FormControl('',[Validators.pattern(/\.(jpg|jpeg|png)$/i)])
    
   });
   constructor(
    private helper:HelperService,
    private gender_service:GenderServiceService,
    private brand_service:BrandServiceService,
    private product_service:ProductServiceService,
    private zone:NgZone
   ){}
   ngOnInit(): void {
    this.helper.getColors().subscribe({
      next:(data)=>{
        this.color_arr=data.items;
        console.log(this.color_arr)
        this.zone.run(() => {
          window.setTimeout(() => {
            this.color_arr.forEach(() => {
              this.Product_Colors.push(new FormControl(false));
            });
      
            // Sada možete otvoriti modal
            // yourModalOpenMethod();
          }, 400); // Ili mala vrednost ako želite odlaganje
        });
      },
      error:(err)=>{console.log(err)}
    })
    
    //Called after the constructor, initializing input properties, and the first call to ngOnChanges.
    //Add 'implements OnInit' to the class.
    this.helper.$isDisabled.subscribe(item=>{
      this.product=null;
      
        this.isDisabled =item;
     
      
    })
    this.helper.$obj_update.subscribe(item=>{
      window.setTimeout(()=>{
        this.product=item;
      })
      console.log(this.product);
     
    })
    this.gender_service.getGender().subscribe({
      next:(data)=>{
        console.log(data.items)
       this.gender_arr=data.items; 
      },
      error:(err)=>{console.log(err);}
    })
    this.brand_service.getBrands().subscribe({
      next:(data)=>{
        this.brand_arr=data.items;
      },
      error:(err)=>{
        console.log(err);
      }
    })
   
   }
   closeModal(){
    this.helper.$isDisabled.next(true);
    
   }
   save(type_of_action:string):void{
    if(type_of_action=='insert'){

      const selectedColors = this.form.value.Product_Colors
      .map((checked: boolean, index: number) => checked ? this.color_arr[index].id : null)
      .filter((id: number | null) => id !== null);
  
    const formData = {
      ProductName: this.form.value.ProductName,
      ProductPrice: this.form.value.ProductPrice,
      ProductDescription: this.form.value.ProductDescription,
      BrandId: this.form.value.BrandId,
      GenderId: this.form.value.GenderId,
      Image: this.Image,
      Product_Colors: "["+selectedColors+"]",  
    };
      console.log(formData);
      this.product=null;
      this.product_service.$product_obj_insert.next(formData);
    }
    else{
      const formData = {
        Id:this.product?.id,
        ProductName: this.form.value.ProductName,
        ProductPrice: this.form.value.ProductPrice,
        ProductDescription: this.form.value.ProductDescription,
        BrandId: this.form.value.BrandId,
        GenderId: this.form.value.GenderId,
        Image: this.Image,
          
      };
        console.log(formData);
        this.product_service.$product_obj_update.next(formData);
    }
   
    this.form.reset({
      ProductName:'',
      ProductPrice:'',
      ProductDescription:'',
      BrandId:'',
      GenderId:'',
      Product_Colors: false,
      Image:''
    })
    this.closeModal();
   }
   getPicture(event:any){
    console.log(event);
    const file=event.target.files[0];
    console.log(file);
    this.Image=file;
   }
   get Product_Colors() {
    return this.form.get('Product_Colors') as FormArray;
  }
}
