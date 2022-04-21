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
    return this.http.get(`${this.backend_url}:${this.backend_port}/cart/` + id, {withCredentials: true});
  }

  fetchItems(id:any): Observable<any>{
    return this.http.get(`${this.backend_url}:${this.backend_port}/items/` + id, {withCredentials: true});
  }

  removeFromCart(itemId: any, cartId: any): Observable<any>{
    let body = {
      itemId: itemId,
      cartId: cartId
    }
    return this.http.put(`${this.backend_url}:${this.backend_port}/cart/remove`, body, {withCredentials: true});
  }


  checkout(cart: any, custId:any, cb: any): void {

    let itemCount = 0; 
    let flag = true;

    

    for(let i = 0; i<cart.length; i++) {

      console.log('CART ITEM: ', cart[i])

      // Gets quantity of the first item
      this.http.get(`${this.backend_url}:${this.backend_port}/inventory/` + cart[i], {withCredentials: true}).subscribe(count => {

        itemCount = count[0].quantity;

        console.log('\nCount for ITEM: ', cart[i], 'IS: ', itemCount)

        //  If there's enough inventory
        if(itemCount > 0 && flag){
          itemCount -= 1;
          let body = {
            amount: itemCount
          }

          this.http.put(`${this.backend_url}:${this.backend_port}/inventory/` + cart[i], body, {withCredentials: true}).subscribe(res => {
            
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
    return this.http.delete(`${this.backend_url}:${this.backend_port}/cart/` + cartId, {withCredentials: true});
  }

  createTransaction(cart:any, userId:any): Observable<any> {
    let body = {
      items: cart,
      id: userId
    }
    return this.http.put(`${this.backend_url}:${this.backend_port}/trans/new`, body, {withCredentials: true});
  }
}
