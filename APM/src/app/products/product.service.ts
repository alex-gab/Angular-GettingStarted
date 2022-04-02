import { HttpClient, HttpErrorResponse } from "@angular/common/http";
import { Injectable } from "@angular/core";
import { Observable, throwError } from "rxjs";
import { tap, catchError } from "rxjs/operators";
import { IProduct } from "./product";

@Injectable({
    providedIn: "root"
})
export class ProductService {
    private productUrl = "api/products/products.json";

    constructor(private httpClient: HttpClient) {
    }

    getProducts(): Observable<IProduct[]> {
        return this.httpClient.get<IProduct[]>(this.productUrl).pipe(
            tap(data => console.log("All", JSON.stringify(data))),
            catchError(this.handleError)
        );
    }

    handleError(err: HttpErrorResponse): Observable<never> {
        let errorMessage = "";
        if (err.error instanceof ErrorEvent) {
            // client side errors
            errorMessage = `An error occurred ${err.error.message}`;
        } else {
            errorMessage = `Server returned code ${err.status}, error message is: ${err.message}`;
        }
        console.error(errorMessage);
        return throwError(errorMessage);
    }
}