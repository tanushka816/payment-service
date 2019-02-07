import { Component, OnInit } from '@angular/core';
import { NgForm, FormGroup, FormControl, Validators } from '@angular/forms';
import { ServerService } from '../server.service';

@Component({
  selector: 'app-get-payment',
  templateUrl: './get-payment.component.html',
  styleUrls: ['./get-payment.component.css']
})
export class GetPaymentComponent implements OnInit {

  myForm: FormGroup;

  constructor(private serverService: ServerService) {
    this.myForm = new FormGroup({
      "inn": new FormControl("", Validators.pattern("[0-9]{9}([0-9]{3})?")),
      "bik": new FormControl("", Validators.pattern("[0-9]{9}")),
      "card_number": new FormControl("", Validators.pattern("[0-9]{4} [0-9]{4} [0-9]{4} [0-9]{4}")),
      "summ": new FormControl("", this.summValidator),
      "tlf_number": new FormControl("", Validators.pattern("[0-9]{10}")),
      "email": new FormControl("", Validators.email),
      "nds": new FormControl(),
    });
    this.myForm.controls['nds'].setValue('0')
  }

  ngOnInit() {
  }

  onSelect(nds_c: string) {
    this.myForm.controls['nds'].setValue(nds_c)
  }

  onSubmit() {
    if (this.myForm.invalid) return;
    const value = this.myForm.value;
    this.serverService.storeRequestPayment(value)
      .subscribe(
        (response) => console.log(response),
        (error) => console.log(error)
      );
    this.myForm.reset();
    this.myForm.controls['nds'].setValue('0')
  }

  onSubmitClear() {
    this.myForm.reset();
    this.myForm.controls['nds'].setValue('0')
  }

  summValidator(control: FormControl): { [s: string]: boolean } {
    if (control.value < 1000 || control.value > 75000) {
      return { "summ": true };
    }
    return null;
  }
}
