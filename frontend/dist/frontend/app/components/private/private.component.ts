import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { trigger, state, transition, style, animate } from '@angular/animations';

@Component({
  selector: 'app-private',
  templateUrl: './private.component.html',
  styleUrls: ['./private.component.css'],
  animations: [
    trigger('slideUp', [
      state('in', style({ transform: 'translateY(0)', opacity: 1 })),
      state('out', style({ transform: 'translateY(-100%)', opacity: 0 })),
      transition('in => out', animate('300ms ease-in')),
      transition('void => *', animate(0)),
    ]),
  ]
})

export class PrivateComponent implements OnInit {
  welcomeMessage: string = '';
  showWelcomeMessage = false;

  constructor() { }

  ngOnInit() {
    this.welcomeMessage = localStorage.getItem('successMessage') || '';

    if (this.welcomeMessage) {
      this.showWelcomeMessage = true;
      setTimeout(() => this.hideWelcomeMessage(), 3000);
    }
  }

  hideWelcomeMessage() {
    this.showWelcomeMessage = false;
  }
}

