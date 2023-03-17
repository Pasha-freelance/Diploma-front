import { Component, Input, OnInit } from '@angular/core';

@Component({
  selector: 'app-logo',
  templateUrl: './logo.component.html',
  styleUrls: ['./logo.component.scss']
})
export class LogoComponent implements OnInit {

  @Input() color1 = 'black';
  @Input() color2 = 'black';

  constructor() { }

  ngOnInit(): void {
  }

}
