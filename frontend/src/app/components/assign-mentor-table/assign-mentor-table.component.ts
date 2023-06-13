import { Component } from '@angular/core';

@Component({
  selector: 'app-assign-mentor-table',
  templateUrl: './assign-mentor-table.component.html',
  styleUrls: ['./assign-mentor-table.component.css']
})
export class AssignMentorTableComponent {

  constructor() { }
  public mentors = [
    {
      _id: '1',
      name: 'Mentor 1',
      email: 'tesr@gmail.com',
      phone: '1234567890',
      skills: 'skill1, skill2, skill3'
    }
  ]

}
