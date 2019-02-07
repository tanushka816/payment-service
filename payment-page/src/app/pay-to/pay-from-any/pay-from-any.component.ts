import { Component, OnInit } from '@angular/core';
import { NgForm, FormGroup, FormControl, Validators } from '@angular/forms';
import { ServerService } from 'src/app/server.service';

@Component({
  selector: 'app-pay-from-any',
  templateUrl: './pay-from-any.component.html',
  styleUrls: ['./pay-from-any.component.css']
})
export class PayFromAnyComponent implements OnInit {
  myForm: FormGroup;
  constructor(private serverService: ServerService) {
    this.myForm = new FormGroup({
      "card_number": new FormControl("", Validators.pattern("[0-9]{4} [0-9]{4} [0-9]{4} [0-9]{4}")),
      "mounth": new FormControl("", Validators.pattern("(0[1-9])|(1[0-2])")),
      "year": new FormControl("", Validators.pattern("(1[8-9])|(2[0-9])|(3[0-5])")),
      "cvc": new FormControl("", Validators.pattern("[0-9]{3}")),
      "summ": new FormControl("", this.summValidator),
      "comment": new FormControl(),
      "email": new FormControl("", Validators.email)
    });

  }

  ngOnInit() {
  }

  onSubmit() {
    if (this.myForm.invalid) return;
    const value = this.myForm.value;
    value['secure'] = true;
    this.serverService.storeCardPayment(value)
      .subscribe(
        (response) => console.log(response),
        (error) => console.log(error)
      );
    this.myForm.reset();
  }

  summValidator(control: FormControl): { [s: string]: boolean } {
    if (control.value < 1000 || control.value > 75000) {
      return { "summ": true };
    }
    return null;
  }
}