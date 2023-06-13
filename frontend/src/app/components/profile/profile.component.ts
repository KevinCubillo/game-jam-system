import { Component, OnInit } from '@angular/core';
import { AuthService } from '../../services/auth.service';
import { User } from 'src/app/models/user.interface';
import { ActivatedRoute } from '@angular/router';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { trigger, state, style, animate, transition } from '@angular/animations';

@Component({
  selector: 'app-profile',
  templateUrl: './profile.component.html',
  styleUrls: ['./profile.component.css'],
  animations: [
    trigger('slideUp', [
      state('in', style({ transform: 'translateY(0)', opacity: 1 })),
      state('out', style({ transform: 'translateY(-100%)', opacity: 0 })),
      transition('in => out', animate('300ms ease-in')),
      transition('void => *', animate(0)),
    ]),
  ]
})
export class ProfileComponent implements OnInit {
  userForm: FormGroup;
  showUpdateMessage = false;
  constructor(
    private authService: AuthService,
    private route: ActivatedRoute,
    private fb: FormBuilder
  ) {
    this.userForm = this.fb.group({
      email: [{value: '', disabled: true}],
      role: [null],
      nombre: ['', Validators.required],
      lastname: ['', Validators.required],
      gender: ['', Validators.required],
      timezone: ['', Validators.required],
      phoneNumber: ['', Validators.required],
      birthdate: ['', Validators.required]
    });
  }

  ngOnInit(): void {
    const userId = localStorage.getItem('userId');
    if (userId !== null) {
      this.authService.getUserDetails(userId)
        .subscribe(
          user => {
            const formattedUser = {
              ...user,
              birthdate: user.birthdate ? new Date(user.birthdate).toISOString().split('T')[0] : null,
            };
            this.userForm.patchValue(formattedUser);
            this.userForm.get('role')?.setValue(user.role);
          },
          error => console.error(error)
        );
    } else {
      console.error('No user id');
    }
  }
  
  
  saveProfile(): void {
    const user: User = this.userForm.value;
    user.role = user.role.flat(); 
    this.authService.updateUser(user)
      .subscribe(
        () => {
          console.log('User updated successfully');
          this.showUpdateMessage = true; 
          setTimeout(() => this.showUpdateMessage = false, 3000); 
        },
        error => console.error('Error updating user', error)
      );
  }
  
}