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
import { TestService } from 'src/app/services/test/test.service';

@Component({
  selector: 'ssr-test',
  templateUrl: './test.component.html',
  styleUrls: ['./test.component.scss'],
  standalone: true,
  imports: [CommonModule],
})
export default class TestComponent implements OnInit, OnDestroy {
  httpClient = inject(HttpClient);
  platformId: object = inject(PLATFORM_ID);
  isServer: boolean = isPlatformServer(this.platformId);
  transferState = inject(TransferState);
  key = makeStateKey<string>('test');
  data: any;
  testService = inject(TestService);
  constructor() {}
  ngOnInit(): void {
    this.data = this.testService.getState();
  }
  ngOnDestroy(): void {}
}
