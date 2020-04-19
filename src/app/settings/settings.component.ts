import { Component, OnInit } from '@angular/core';
import { VariableService } from '../variable.service';

@Component({
  selector: 'app-settings',
  templateUrl: './settings.component.html',
  styleUrls: ['./settings.component.scss'],
})
export class SettingsComponent implements OnInit {
  min = 8;
  max = 30;
  value = 10;
  color = 'primary';

  constructor(private variables: VariableService) {}

  ngOnInit(): void {}
}
