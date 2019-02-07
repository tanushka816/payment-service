import { Component, OnInit } from '@angular/core';
import { NgForm, FormGroup, FormControl, Validators } from '@angular/forms';
import { ServerService } from 'src/app/server.service';
import { saveAs } from 'file-saver';

@Component({
  selector: 'app-pay-from-my',
  templateUrl: './pay-from-my.component.html',
  styleUrls: ['./pay-from-my.component.css']
})
export class PayFromMyComponent implements OnInit {
  myForm: FormGroup;
  constructor(private serverService: ServerService) {
    this.myForm = new FormGroup({
      "inn": new FormControl("", Validators.pattern("[0-9]{9}([0-9]{3})?")),
      "bik": new FormControl("", Validators.pattern("[0-9]{9}")),
      "card_number": new FormControl("", Validators.pattern("[0-9]{4} [0-9]{4} [0-9]{4} [0-9]{4}")),
      "nds": new FormControl(),
      "summ": new FormControl("", this.summValidator),
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
    this.serverService.storeAndDownloadFromMy(value)
      .subscribe(
        (response) => this.downloadPayments(response),
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

  private downloadPayments(response) {
    console.log(response);
    const blob = new Blob([response.body], { type: 'text/plain' });
    saveAs(blob, 'payments.txt');
  }

}
