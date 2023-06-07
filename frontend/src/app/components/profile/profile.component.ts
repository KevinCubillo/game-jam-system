import { Component, OnInit } from '@angular/core';
import { AuthService } from '../../services/auth.service';
import { User } from 'src/app/models/user.interface';
import { ActivatedRoute } from '@angular/router';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';

@Component({
  selector: 'app-profile',
  templateUrl: './profile.component.html',
  styleUrls: ['./profile.component.css']
})
export class ProfileComponent implements OnInit {
  userForm: FormGroup;

  constructor(
    private authService: AuthService,
    private route: ActivatedRoute,
    private fb: FormBuilder
  ) {
    this.userForm = this.fb.group({
      email: [{value: '', disabled: true}], // Hacerlo ineditable
      role: [{value: '', disabled: true}], // Hacerlo ineditable
      nombre: ['', Validators.required],
      lastname: ['', Validators.required],
      gender: ['', Validators.required],
      timezone: ['', Validators.required],
      phoneNumber: ['', Validators.required],
      birthdate: ['', Validators.required]
    });
  }

  ngOnInit(): void {
    const userId = localStorage.getItem('userId')
    if (userId !== null) {
      this.authService.getUserDetails(userId)
        .subscribe(
          user => this.userForm.patchValue(user),
          error => console.error(error)
        );
    } else {
      // Manejar el caso en que 'userId' es null, quizás redirigir al usuario o mostrar un mensaje de error
    }
  }

  saveProfile(): void {
    this.authService.updateUser(this.userForm.value)
      .subscribe(
        () => console.log('User updated successfully'),
        error => console.error('Error updating user', error)
      );
  }
}


