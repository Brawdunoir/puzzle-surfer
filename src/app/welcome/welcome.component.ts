import { Component, OnInit, Output, EventEmitter } from '@angular/core';
import { StorageService } from '../storage.service';

@Component({
  selector: 'app-welcome',
  templateUrl: './welcome.component.html',
  styleUrls: ['./welcome.component.scss'],
})
export class WelcomeComponent implements OnInit {
  @Output() welcomeShow = new EventEmitter<boolean>();

  constructor(private storage: StorageService) {}

  ngOnInit(): void { }

  hide(): void {
    this.welcomeShow.emit(false);
    this.storage.setSync(this.storage.welcomeStateStorageName, 'false');
  }
}
