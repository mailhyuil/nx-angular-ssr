import { CommonModule, isPlatformServer } from '@angular/common';
import { HttpClient } from '@angular/common/http';
import {
  Component,
  OnDestroy,
  OnInit,
  PLATFORM_ID,
  TransferState,
  inject,
  makeStateKey,
} from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { TestService } from 'src/app/services/test/test.service';
const key = makeStateKey<string>('home');
@Component({
  selector: 'ssr-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.scss'],
  standalone: true,
  imports: [CommonModule],
})
export default class HomeComponent implements OnInit, OnDestroy {
  httpClient = inject(HttpClient);
  platformId: object = inject(PLATFORM_ID);
  isServer: boolean = isPlatformServer(this.platformId);
  transferState: TransferState = inject(TransferState);
  data: any;
  route = inject(ActivatedRoute);
  testService = inject(TestService);
  constructor() {
    if (this.isServer) {
      this.testService
        .setState(this.route.snapshot.params['id'])
        .subscribe((data) => {
          this.data = data;
        });
    }
  }

  ngOnInit(): void {
    this.data = this.testService.getState();
  }

  ngOnDestroy(): void {}
}
