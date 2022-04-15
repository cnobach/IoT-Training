import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http'
import { Observable } from 'rxjs';
import { environment } from 'src/environments/environment';

@Injectable({
  providedIn: 'root'
})
export class ServerService {

  constructor(private http: HttpClient) { }

  backend_url = environment.backendServer;
  backend_port = environment.backendPort;

  getCart(id: any): Observable<any>{
    return this.http.get(`${this.backend_url}:${this.backend_port}/cart/` + id);
  }

  fetchItems(id:any): Observable<any>{
    return this.http.get(`${this.backend_url}:${this.backend_port}/items/` + id);
  }

  removeFromCart(itemId: any, cartId: any): Observable<any>{
    let body = {
      itemId: itemId,
      cartId: cartId
    }

    console.log(body);

    return this.http.put(`${this.backend_url}:${this.backend_port}/cart/remove`, body);
  }


  checkout(cart: any, custId:any, cb: any): void {

    let itemCount = 0; 
    let flag = true;

    for(let i = 0; i<cart.length; i++) {

      // Gets quantity of the first item
      this.http.get(`${this.backend_url}:${this.backend_port}/inventory/` + custId).subscribe(count => {

        itemCount = count[0].quantity;

        //  If there's enough inventory
        if(itemCount > 0 && flag){
          itemCount -= 1;
          let body = {
            amount: itemCount
          }

          this.http.put(`${this.backend_url}:${this.backend_port}/inventory/` + custId, body).subscribe(res => {
            
            if(!res){
              flag = false;
            }

          })

          // If inventory too low
        } else {
          flag = false;
        }

      });
    }
    cb(flag);
  }

  clearCart(cartId:any): Observable<any> {
    return this.http.delete(`${this.backend_url}:${this.backend_port}/cart/` + cartId);
  }
}
