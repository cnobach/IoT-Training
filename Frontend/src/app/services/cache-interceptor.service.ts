import { Injectable } from '@angular/core';
import { HttpEvent, HttpHandler, HttpInterceptor, HttpRequest, HttpResponse } from '@angular/common/http';
import { map, Observable, of, share, pipe} from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class CacheInterceptorService implements HttpInterceptor{

  constructor() { }

  private cache: Map<HttpRequest<any>, HttpResponse<any>> = new Map();

  intercept(req: HttpRequest<any>, next: HttpHandler): Observable<HttpEvent<any>> {
    // If the method is NOT a get request, continue
    if(req.method !== "GET"){
      return next.handle(req)
    }

    // Set the cached response
    const cachedResponse: HttpResponse<any> = this.cache.get(req);

    // if the chached response exists return the response
    if(cachedResponse) {
      return of(cachedResponse.clone())
    // Else, get the response then cache it
    } else {
      return next.handle(req).pipe(
        do(stateEvent => {
          if(stateEvent instanceof HttpResponse) {
            this.cache.set(req, stateEvent.clone());
          }
        })
      ).share()
    }
  }
}
