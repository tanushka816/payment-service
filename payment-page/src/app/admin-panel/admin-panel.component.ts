import { Component, OnInit } from '@angular/core';
import { NgForm, FormGroup, FormControl, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { ServerService } from '../server.service';

@Component({
  selector: 'app-admin-panel',
  templateUrl: './admin-panel.component.html',
  styleUrls: ['./admin-panel.component.css']
})
export class AdminPanelComponent implements OnInit {

  authForm: FormGroup;
  constructor(private serverService: ServerService, private router: Router) {
    this.authForm = new FormGroup({
      "email": new FormControl(""),
      "password": new FormControl("")
    });
  }

  onSubmit() {
    this.serverService.auth(this.authForm.value)
      .subscribe(
        (response) => {
          console.log(response);
          const isCorrect = response['isCorrect']
          if (isCorrect) {
            this.router.navigate(["admin/admin-ok-auth"]);
          }
        },
        (error) => console.log(error)
      );
  }

  ngOnInit() {
  }
}
