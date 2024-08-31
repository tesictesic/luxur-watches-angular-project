import { Component, OnInit,ViewChild,ElementRef } from '@angular/core';
import { ProductServiceService } from '../../../shared/services/product-service.service';
import { Router } from '@angular/router';
import { BrandServiceService } from '../../../shared/services/brand-service.service';
import { GenderServiceService } from '../../../shared/services/gender-service.service';
import { CartServiceService } from '../../../shared/services/cart-service.service';
import { CartItem } from '../../../shared/interfaces/cart-item';
import { CartModalService } from '../../../shared/services/cart-modal.service';


@Component({
  selector: 'app-product',
  templateUrl: './product.component.html',
  styleUrl: './product.component.css'
})
export class ProductComponent implements OnInit {
  @ViewChild('.dj-t') myElement!: ElementRef;
  currentPage:number=0;
  params_obj:any={};
  total_pages:number[]=[];
  product_items:any=[];
  brand_items:any=[];
  gender_items:any=[];
  selected_price:string|null=null;
   x:any
  constructor(
    private router:Router,
    private products:ProductServiceService,
    private brands:BrandServiceService,
    private gender:GenderServiceService,
    private cart:CartServiceService,
    private cart_modal:CartModalService
 ){}
  ngOnInit(): void {
     this.products.getProducts().subscribe({
      next:(data)=>{
        console.log(data);
        this.product_items=data.items;
        console.log(this.product_items);  
        this.currentPage=data.currentPage;
        this.fillInPagination(this.total_pages,data.totalPages)
        console.log(this.total_pages);
        console.log(this.currentPage);


      },
      error:(error)=>{
        console.log(error);
      }
     });
     this.gender.getGender().subscribe({
      next:(data)=>{
        console.log(data);
        this.gender_items=data.items;
      },
      error:(error)=>{console.log(error);}
     });
     this.brands.getBrands().subscribe({
      next:(data)=>{
        console.log(data);
        this.brand_items=data.items
      },
      error:(error)=>{console.log(error);}
     })
     
   }
   redirectToSinglePage(id:number):void{
     this.router.navigate(["/products",id]);
   }
   fillInPagination(total_pages_arr:number[],totalPages:number){
    total_pages_arr.length=0;
    for(let i=0;i<totalPages;i++){
      total_pages_arr.push(i);
    }
   }
   changePagination(page:number){
      this.params_obj.page=page;
      console.log(this.params_obj);
      this.products.getProductsWithParams(this.params_obj).subscribe({
        next:(data)=>{
          console.log(data);
          this.product_items=data.items;
          this.currentPage=data.currentPage;
          this.fillInPagination(this.total_pages,data.totalPages);
        },
        error:(errors)=>{console.log(errors)}
      })
   }
   getParams(keyword: string | null = null, brand_event: any|null=null, gender_event: any|null=null, priceFromTo: string | null = null,orderBy:string|null){
    this.selected_price=null;
    if(keyword){
      if(keyword.length>3){
        this.params_obj.Name=keyword;
      }
      else{
        delete this.params_obj.Name
      }
      
    }
    if(brand_event){
      if(brand_event.target.checked){
     
        this.params_obj.Brand_Id=parseInt(brand_event.target.value);
      }
      
      else{
        
        delete this.params_obj.Brand_Id;
      }
    }
    
    if(gender_event){
      if(gender_event.target.checked){
      
        this.params_obj.Gender_Id=parseInt(gender_event.target.value);
      }
      else{
        
        delete this.params_obj.Gender_Id;
      }
    }
    let localStoragePriceFromTo=localStorage.getItem('priceFromTo');
    console.log(localStoragePriceFromTo);
    if(localStoragePriceFromTo!=null){
      console.log(typeof(localStoragePriceFromTo))
        this.CheckPrice(localStoragePriceFromTo);
        localStorage.removeItem('priceFromTo');
    }
    else{
      if(priceFromTo) this.CheckPrice(priceFromTo)
        else{
          delete this.params_obj.PriceFrom
          delete this.params_obj.PriceTo
        }
    }
    if(orderBy){
      if(orderBy!="0"){
        this.params_obj.OrderBy=orderBy;
      }
      else{
        delete this.params_obj.OrderBy;
      }
    }
    console.log(this.params_obj);
    this.products.getProductsWithParams(this.params_obj).subscribe({
      next:(data)=>{
        console.log(data);
        this.product_items=data.items;
        this.currentPage=data.currentPage;
        this.fillInPagination(this.total_pages,data.totalPages);
      },
      error:(errors)=>{console.log(errors)}
    })
    
    
    console.log(this.params_obj);
   }
   CheckPrice(priceFromTo:string|null=null){
    console.log("usao");
    if(priceFromTo){
      localStorage.setItem('priceFromTo',priceFromTo);
      this.selected_price=priceFromTo;
      let splitted_price=priceFromTo.split("-")
      let price_from=splitted_price[0];
      let price_to=splitted_price[1]
      if(price_from=="500"){
        delete this.params_obj.PriceFrom
        delete this.params_obj.PriceTo
        this.params_obj.PriceFrom=Number(price_from);
      }
      else{
        this.params_obj.PriceFrom=Number(price_from);
        this.params_obj.PriceTo=Number(price_to);
      }
    }
    
   }
   addToCart(item:CartItem){
    let cart_text="";
    this.cart.addToCart(item);
    console.log(this.myElement);
    this.cart.cartText$.subscribe(item=>{
      cart_text=item;
    });
    this.cart_modal.ChangeTextToCart(cart_text);
    this.cart_modal.ChangeModalStatus(false);
    setTimeout(()=>{
      this.cart_modal.ChangeModalStatus(true);
    },2000)
    
   }
   
}
