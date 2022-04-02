import { Component, OnDestroy, OnInit } from "@angular/core";
import { Observable, Subscription } from "rxjs";
import { IProduct } from "./product";
import { ProductService } from "./product.service";

@Component({
  selector: "pm-products",
  templateUrl: "./product-list.component.html",
  styleUrls: ["./product-list.component.css"]
})
export class ProductListComponent implements OnInit, OnDestroy {
  pagetTitle: string = "Product List";
  imageWidth: number = 50;
  imageMargin: number = 2;
  showImage: boolean = false;
  errorMessage = "";

  private _listFilter: string = "";
  private sub: Subscription = Subscription.EMPTY;

  filteredProducts: IProduct[] = [];
  products: IProduct[] = [];

  constructor(private productService: ProductService) {
    this.productService = productService;
  }

  ngOnInit(): void {
    this.sub = this.productService.getProducts().subscribe({
      next: products => {
        this.products = products;
        this.filteredProducts = products;
      },
      error: err => this.errorMessage = err
    });
  }
  
  ngOnDestroy(): void {
    this.sub.unsubscribe();
  }

  toggleImage(): void {
    this.showImage = !this.showImage;
  }

  get listFilter(): string {
    return this._listFilter;
  }

  set listFilter(value: string) {
    this._listFilter = value;
    console.log("In setter: ", value);
    this.filteredProducts = this.performFilter(value);
  }

  performFilter(filterBy: string): IProduct[] {
    filterBy = filterBy.toLowerCase();
    return this.products.filter(product => product.productName.toLowerCase().includes(filterBy));
  }

  onRatingClicked(message: string): void {
    this.pagetTitle = "Product List: " + message;
  }
}