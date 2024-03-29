import { Component, OnInit } from '@angular/core';
import { StorageService } from '../storage.service';
import { SettingsService } from '../settings.service';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.scss'],
})
export class HomeComponent implements OnInit {

  welcomeState = this.storage.getSync(this.storage.welcomeStateStorageName) !== 'false';

  constructor(private storage: StorageService, private settings: SettingsService) { }


  ngOnInit(): void {
    this.storage.init();
    this.settings.setAppareance();
  }

  hideWelcome(event: boolean): void {
    this.welcomeState = event;
  }
}
