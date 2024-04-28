import { CommonModule } from '@angular/common';
import { Component, OnInit } from '@angular/core';
import { NavigationExtras, Router } from '@angular/router';
import { Product, ProductKeys } from '../../interfaces/product';
import { NotificationService } from '../../services/notification.service';
import { ProductService } from '../../services/product.service';
import { PfButtonComponent } from "../../shared/pf-button/pf-button.component";
import { PfInputComponent } from "../../shared/pf-input/pf-input.component";
import { PfNotificationComponent } from '../../shared/pf-notification/pf-notification.component';
import { PfTableComponent } from '../../shared/pf-table/pf-table.component';

@Component({
    selector: 'app-home',
    standalone: true,
    templateUrl: './home.component.html',
    styleUrl: './home.component.css',
    imports: [PfButtonComponent, PfInputComponent, PfTableComponent, PfNotificationComponent, CommonModule]
})
export class HomeComponent implements OnInit{
  fields = [
    {key: ProductKeys.LOGO, type: 'img',label: 'Logo', align: 'center'},
    {key: ProductKeys.NAME, type: 'string',label: 'Nombre del Producto'},
    {key: ProductKeys.DESCRIPTION, type: 'string',label: 'Descripcion', tooltip:"Descripcion del producto"},
    {key: ProductKeys.DATE_RELEASE, type: 'date', label: 'Fecha de Liberación', tooltip:"Fecha de lanzamiento del producto para clientes en general."},
    {key: ProductKeys.DATE_REVISION, type: 'date', label: 'Fecha de Reestructuración', tooltip:"Fecha de revisión del producto para cambiar términos y condiciones."}];

  products: Product[] = [];
  productsFiltered: Product[] = [];

  currentProduct: Product = {
    id: '',
    name: '',
    description: '',
    logo: '',
    date_release: '',
    date_revision: ''
  };
  loading: boolean = true;

  constructor(private router: Router, private productService: ProductService, private notificationService: NotificationService){}

  ngOnInit(): void{
    this.productService.getProducts().subscribe((productsResponse:Product[]) => {
      this.products = productsResponse;
      this.productsFiltered = productsResponse;
      this.loading = false;
      },(error) => {
        this.products = [];
        this.productsFiltered = [];
        this.notificationService.showNotification(error, 'error');
        this.loading = false;
      });

  }

  addProduct(): void {
    this.router.navigate(['newProduct'])
  }

  filterProducts(event: any): void{
    this.productsFiltered = this.products.filter(product => product.name.toLowerCase().includes(event.target.value))
  }

  editProduct(product: Product): void{
    const navigationExtras: NavigationExtras = {state: product};
    this.router.navigate(['updateProduct'], navigationExtras);
  }

}
