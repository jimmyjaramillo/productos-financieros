import { ComponentFixture, TestBed } from '@angular/core/testing';

import { Router } from '@angular/router';
import { of, throwError } from 'rxjs';
import { Product } from '../../interfaces/product';
import { NotificationService } from '../../services/notification.service';
import { ProductService } from '../../services/product.service';
import { HomeComponent } from './home.component';
describe('HomeComponent', () => {
  let component: HomeComponent;
  let fixture: ComponentFixture<HomeComponent>;
  const mockProductService = {
    getProducts: jest.fn().mockReturnValue(of<Product[]>([])),
    addProduct: jest.fn().mockReturnValue(of(null)),
    updateProduct: jest.fn().mockReturnValue(of(null)),
    checkProduct: jest.fn().mockReturnValue(of("true")),
  };

  const mockRouter = {
    navigate: jest.fn(),
    getCurrentNavigation: jest.fn(),
  }

  const mockNotificationService = {
    showNotification: jest.fn(),
    clearNotification: jest.fn(),
    notification$: of(null)
  }

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [HomeComponent],
      providers: [
        { provide: Router, useValue: mockRouter },
        { provide: ProductService, useValue: mockProductService },
        { provide: NotificationService, useValue: mockNotificationService },
      ],
    })
    .compileComponents();

    fixture = TestBed.createComponent(HomeComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  it('should navigate to add new product when addProduct is called', () => {
    component.addProduct();

    expect(mockRouter.navigate).toHaveBeenCalledWith(['newProduct']);
  });

  it('Should filter products based on search input', () => {
    const products: Product[] = [
      { id: '1', name: 'Product 1', description: 'Description 1', logo: 'logo1.png', date_release: '2023-01-01', date_revision: '2024-01-01' },
      { id: '2', name: 'Product 2', description: 'Description 2', logo: 'logo2.png', date_release: '2023-01-02', date_revision: '2024-01-02' },
    ];
    component.products = products;

    component.filterProducts({ target: { value: 'Product 1' } });
    setTimeout(() => {
      expect(component.productsFiltered).toEqual([products[0]]);
    }, 1);
  });

  it('should handle error during product retrieval', () => {
    const mockError = 'Test error message';
    mockProductService.getProducts.mockReturnValue(throwError(mockError))
    component.ngOnInit();
    expect(component.products).toEqual([]);
    expect(component.productsFiltered).toEqual([]);
    expect(mockNotificationService.showNotification).toHaveBeenCalledWith(mockError, 'error');
  });

});
