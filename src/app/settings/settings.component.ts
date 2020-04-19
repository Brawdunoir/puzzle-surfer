import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-settings',
  templateUrl: './settings.component.html',
  styleUrls: ['./settings.component.scss']
})
export class SettingsComponent implements OnInit {

  min = 8;
  max = 30;
  value = 10;

  constructor() { }

  ngOnInit(): void {
  }

}
