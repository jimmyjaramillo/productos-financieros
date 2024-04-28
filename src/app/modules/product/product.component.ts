import { CommonModule } from '@angular/common';
import { Component } from '@angular/core';
import { AbstractControl, FormBuilder, FormGroup, FormsModule, ReactiveFormsModule, ValidationErrors, ValidatorFn, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { Product, ProductKeys } from '../../interfaces/product';
import { NotificationService } from '../../services/notification.service';
import { ProductService } from '../../services/product.service';
import { PfButtonComponent } from '../../shared/pf-button/pf-button.component';
import { PfInputComponent } from '../../shared/pf-input/pf-input.component';
import { PfNotificationComponent } from '../../shared/pf-notification/pf-notification.component';

@Component({
  selector: 'app-product',
  standalone: true,
  imports: [PfInputComponent, PfButtonComponent, FormsModule, ReactiveFormsModule, CommonModule, PfNotificationComponent],
  templateUrl: './product.component.html',
  styleUrl: './product.component.css'
})
export class ProductComponent {
  productForm: FormGroup;
  productFormSubmitted: boolean = false;
  product: Product;
  isUpdateProduct: boolean = false;

  constructor(private router: Router, private productService: ProductService, private notificationService: NotificationService, private fb: FormBuilder){
    this.product = this.router.getCurrentNavigation()?.extras.state as Product;
    this.isUpdateProduct = !!this.product;
    const {id , name, description, logo, date_release, date_revision}= this.product ?? {};
    const formatDateRelease = date_release? new Date(date_release).toISOString().split('T')[0]: null;
    const formatDateRevision = date_revision? new Date(date_revision).toISOString().split('T')[0]: null;

    this.productForm = this.fb.group({
      id:[id, [Validators.required, Validators.minLength(3), Validators.maxLength(10)]],
      name:[name, [Validators.required, Validators.minLength(5), Validators.maxLength(100)]],
      description:[description, [Validators.required, Validators.minLength(10), Validators.maxLength(200)]],
      logo:[logo, [Validators.required]],
      date_release:[formatDateRelease, [Validators.required, this.dateValidator()]],
      date_revision:[formatDateRevision, [Validators.required]]
    });
  }

  onChangeDateRelease(event: any):void{
    const dateRelease = new Date(event.target.value)
    const nextDate = new Date(dateRelease);
    nextDate.setFullYear(dateRelease.getFullYear()+1);
    this.productForm.get(ProductKeys.DATE_REVISION)?.setValue(nextDate.toISOString().split('T')[0]);
  }

  onSubmit():void{
    this.productFormSubmitted = true;
    if(this.productForm?.valid){
      if(this.isUpdateProduct){
        this.updateProduct();
        return;
      }
      this.addProduct();
    }
  }

  clearForm():void{
    this.productForm?.reset();
  }

  back():void{
    this.router.navigate([''])
  }

  addProduct(): void{
    const newProduct:Product = this.productForm.value;
    this.productService.checkProduct(newProduct.id).subscribe(response => {
      if(response==='true'){
        this.notificationService.showNotification('Producto ID existe actualmente', 'error');
      } else {
        this.productService.addProduct(newProduct).subscribe(() => {
          this.notificationService.showNotification('Producto creado satisfactoriamente', 'success')
          this.router.navigate([''])
        }, (error) => {
          this.notificationService.showNotification(error, 'error');
        });
      }
    }, (error) => {
      this.notificationService.showNotification(error, 'error');
    });
  }

  updateProduct(): void{
    const currentProduct:Product = this.productForm.value;
    this.productService.updateProduct(currentProduct).subscribe(() => {
      this.notificationService.showNotification('Producto actualizado satisfactoriamente', 'success')
      this.router.navigate([''])
    });
  }

  dateValidator(): ValidatorFn {
    return (control: AbstractControl): ValidationErrors | null => {
      const now = new Date().toLocaleDateString();
      const currentDate =  new Date(now).toISOString().slice(0,10);
      const dateSelected = new Date(control.value).toISOString().slice(0,10);
      if(control.value && dateSelected < currentDate){
        return {dateInvalid: true}
      }
      return null
    };

  }
}
