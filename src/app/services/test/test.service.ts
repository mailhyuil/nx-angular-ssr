import { HttpClient } from '@angular/common/http';
import { Injectable, TransferState, inject, makeStateKey } from '@angular/core';
import { tap } from 'rxjs';

const key = makeStateKey<any>('test');

@Injectable({
  providedIn: 'root',
})
export class TestService {
  httpClient = inject(HttpClient);
  transferState: TransferState = inject(TransferState);
  constructor() {}
  setState(id: string) {
    return this.httpClient
      .get(`https://jsonplaceholder.typicode.com/posts/${id}`)
      .pipe(
        tap((data) => {
          this.transferState.set(key, data);
        })
      );
  }

  getState() {
    return this.transferState.get(key, null);
  }
}
