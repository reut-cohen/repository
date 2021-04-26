import { Component, ViewChild } from '@angular/core';
import { NgForm } from '@angular/forms';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent {
  subscriptions = [ 'Basic', 'Advanced', 'Pro']
  selectedSubscription = "Advanced"
  submitted = false;

  @ViewChild('signupForm', {static: false}) sgnForm: NgForm;
  data = {
    email: '',
    subscription: '',
    password: ''
  }

  onSubmit() {
    console.log(this.sgnForm.value)
    this.submitted = true;
    this.data.email = this.sgnForm.value.email;
    this.data.subscription = this.sgnForm.value.subscription;
    this.data.password = this.sgnForm.value.password;

    this.sgnForm.reset();

  }

}
