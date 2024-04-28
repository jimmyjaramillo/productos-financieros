import { ComponentFixture, TestBed } from '@angular/core/testing';

import { Router } from '@angular/router';
import { of } from 'rxjs';
import { Product } from '../../interfaces/product';
import { NotificationService } from '../../services/notification.service';
import { ProductService } from '../../services/product.service';
import { ProductComponent } from './product.component';

describe('ProductComponent', () => {
  let component: ProductComponent;
  let fixture: ComponentFixture<ProductComponent>;
  const mockProductService = {
    getProducts: jest.fn().mockReturnValue(of<Product[]>([])),
    addProduct: jest.fn().mockReturnValue(of(null)),
    updateProduct: jest.fn().mockReturnValue(of(null)),
    deleteProduct: jest.fn().mockReturnValue(of(null)),
    checkProduct: jest.fn().mockReturnValue(of("false")),
  };

  const mockRouter = {
    navigate: jest.fn(),
    getCurrentNavigation: jest.fn().mockReturnValue({
      extras: { state: null }
    })
  }

  const mockNotificationService = {
    showNotification: jest.fn(),
    clearNotification: jest.fn(),
    notification$: of(null)
  }

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [ProductComponent],
      providers: [
        { provide: Router, useValue: mockRouter },
        { provide: ProductService, useValue: mockProductService },
        { provide: NotificationService, useValue: mockNotificationService },
      ],
    })
    .compileComponents();

    fixture = TestBed.createComponent(ProductComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  it('Should call to addProduct when form is valid', () => {
    component.isUpdateProduct = false;
    component.productForm.setValue({
        id: '123',
        name: 'Producto 1',
        description: 'Description ProductO',
        logo: 'https://example.com/logo.png',
        date_release: new Date(),
        date_revision: new Date().setFullYear(new Date().getFullYear() +1),
    });
    component.onSubmit();
    expect(mockProductService.checkProduct).toHaveBeenCalled();
    expect(mockProductService.addProduct).toHaveBeenCalled();
    expect(mockRouter.navigate).toHaveBeenCalledWith(['']);
    expect(mockNotificationService.showNotification).toHaveBeenCalledWith('Producto creado satisfactoriamente', 'success');
  });

  it('Should call to updateProduct when form is valid', () => {
    component.isUpdateProduct = true;
    component.productForm.setValue({
        id: '123',
        name: 'Producto test',
        description: 'Descripcion Producto ',
        logo: 'https://example.com/logo.png',
        date_release: new Date(),
        date_revision: new Date().setFullYear(new Date().getFullYear() +1),
    });
    component.onSubmit();
    expect(mockProductService.updateProduct).toHaveBeenCalled();
    expect(mockRouter.navigate).toHaveBeenCalledWith(['']);
    expect(mockNotificationService.showNotification).toHaveBeenCalledWith('Producto actualizado satisfactoriamente', 'success');
  });

});
