import { HttpErrorResponse } from '@angular/common/http';
import { HttpClientTestingModule, HttpTestingController } from '@angular/common/http/testing';
import { TestBed } from '@angular/core/testing';
import { API_URL } from '../constants/constants';
import { Product } from '../interfaces/product';
import { ProductService } from './product.service';

describe('ProductService', () => {
  let service: ProductService;
  let httpMock: HttpTestingController;
  const mockApiUrl = 'https://mock-api-url.com';

  beforeEach(() => {
      TestBed.configureTestingModule({
          imports: [HttpClientTestingModule],
          providers: [
              ProductService,
              { provide: API_URL, useValue: mockApiUrl },
          ],
      });

      service = TestBed.inject(ProductService);
      httpMock = TestBed.inject(HttpTestingController);
  });

  afterEach(() => {
      httpMock.verify();
  });

  it('Should return an Observable with an error message when handling an HttpErrorResponse', () => {
    const httpErrorResponse = new HttpErrorResponse({
      error: 'Test error message',
      status: 500,
      statusText: 'Internal Server Error'
    });

    const errorObservable = service['handleError'](httpErrorResponse);

    errorObservable.subscribe({
      next: () => {
        fail('Se esperaba un error, pero el Observable emitió un valor.');
      },
      error: (error: Error) => {
        expect(error.message).toEqual(`Hubo un error en la petición: ${httpErrorResponse.message}`);
      }
    });
  });

  it('Should get all products', () => {
      const mockProducts: Product[] = [
          {
              id: '1',
              name: 'Producto 1',
              description: 'Descripcion 1',
              logo: 'logo1.png',
              date_release: '2024-01-01',
              date_revision: '2024-06-01',
          },
          {
              id: '2',
              name: 'Producto 2',
              description: 'Descripcion 2',
              logo: 'logo2.png',
              date_release: '2024-02-01',
              date_revision: '2024-07-01',
          },
      ];

      service.getProducts().subscribe((products) => {
          expect(products).toEqual(mockProducts);
      });

      const req = httpMock.expectOne(`${mockApiUrl}`);
      expect(req.request.method).toBe('GET');

      req.flush(mockProducts);
  });

  it('Should add a product', () => {
      const newProduct: Product = {
          id: '3',
          name: 'Producto 3',
          description: 'Descripcion 3',
          logo: 'logo3.png',
          date_release: '2024-03-01',
          date_revision: '2024-08-01',
      };

      service.addProduct(newProduct).subscribe((response) => {
          expect(response).toEqual(newProduct);
      });

      const req = httpMock.expectOne(`${mockApiUrl}`);
      expect(req.request.method).toBe('POST');
      expect(req.request.body).toEqual(newProduct);
      req.flush(newProduct);
  });

  it('Should update a product', () => {
      const product: Product = {
          id: '1',
          name: 'Producto actualizado',
          description: 'Descripcion actualizada',
          logo: 'logo1.png',
          date_release: '2024-01-01',
          date_revision: '2024-06-01',
      };

      service.updateProduct(product).subscribe((response) => {
          expect(response).toEqual(product);
      });

      const req = httpMock.expectOne(`${mockApiUrl}`);
      expect(req.request.method).toBe('PUT');
      expect(req.request.body).toEqual(product);

      req.flush(product);
  });

  it('Should check if a product ID already exist', () => {
      const productId = '1';

      service.checkProduct(productId).subscribe((response) => {
          expect(response).toEqual('Producto verificado');
      });

      const req = httpMock.expectOne(`${mockApiUrl}/verification?id=${productId}`);
      expect(req.request.method).toBe('GET');

      req.flush('Producto verificado');
  });
});


