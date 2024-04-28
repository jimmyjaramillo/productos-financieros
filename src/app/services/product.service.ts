import { HttpClient, HttpErrorResponse } from '@angular/common/http';
import { Inject, Injectable } from '@angular/core';
import { Observable, catchError, tap, throwError } from 'rxjs';
import { API_URL } from '../constants/constants';
import { formatProducts } from '../formatters/formatters';
import { Product } from '../interfaces/product';

@Injectable({
  providedIn: 'root'
})
export class ProductService {

  constructor(private http: HttpClient, @Inject(API_URL) private apiUrl:string) {}

  private handleError(error: HttpErrorResponse): Observable<never> {
    return throwError(() => new Error(`Hubo un error en la petición: ${error.message}`));
  }

  getProducts():Observable<Product[]> {
    return this.http.get<any>(`${this.apiUrl}`).pipe(tap(formatProducts),
      catchError(this.handleError));
  }

  addProduct(product: Product):Observable<any> {
    return this.http.post(`${this.apiUrl}`,product).pipe(
      tap((response) => response), catchError(this.handleError));

  }

  updateProduct(product: Product):Observable<any> {
    return this.http.put(`${this.apiUrl}`,product).pipe(
      tap((response) => response), catchError(this.handleError));

  }

  checkProduct(productId: string):Observable<string> {
    return this.http.get(`${this.apiUrl}/verification?id=${productId}`, {responseType:'text'}).pipe(
      tap((response) => response), catchError(this.handleError));

  }
}
