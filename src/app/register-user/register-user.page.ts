import { Component, OnInit }                from '@angular/core';
import { FormBuilder, FormControl, 
         FormGroup, Validators, 
         FormsModule }                      from '@angular/forms';
import { User } from '../interfaces/User';

@Component({
  selector: 'app-register-user',
  templateUrl: './register-user.page.html',
  styleUrls: ['./register-user.page.scss'],
})
export class RegisterUserPage implements OnInit {
  public user: User;
  public sex = '';
  userInfoForm: FormGroup;
  carInfoForm: FormGroup;
  public emailValidator = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
  public phoneValidator = /^(\(11\) (9\d{4})-\d{4})|((\(1[2-9]{1}\)|\([2-9]{1}\d{1}\)) [5-9]\d{3}-\d{4})$/;
  public birthdayValidator = /(^(((0[1-9]|1[0-9]|2[0-8])[\/](0[1-9]|1[012]))|((29|30|31)[\/](0[13578]|1[02]))|((29|30)[\/](0[4,6,9]|11)))[\/](19|[2-9][0-9])\d\d$)|(^29[\/]02[\/](19|[2-9][0-9])(00|04|08|12|16|20|24|28|32|36|40|44|48|52|56|60|64|68|72|76|80|84|88|92|96)$)/;
 
  constructor(private _formBuilder: FormBuilder) { }

  ngOnInit() {
    this.initializeUser();
    this.initializeForms();
  }

  initializeUser() {
    this.user = <User>{};
    this.user.name = '';
    this.user.address = '';
    this.user.sex = '';
    this.user.cpf = ''; 
    this.user.birthday = '';
    this.user.email = '';
    this.user.car = {
      model: '',
      brand: '',
      color: '',
      chassi: '',
      renavam: 0,
      plaque: '',
    }
  }

  initializeForms() {
    this.userInfoForm = this._formBuilder.group({
      name: [this.user.name,[ Validators.required, Validators.minLength(3), Validators.maxLength(30)]],
      cpf: [this.user.cpf, [ Validators.required, Validators.minLength(11)]],
      email: [this.user.email, Validators.pattern(this.emailValidator)],
      endereco: [this.user.address, Validators.required],
      phone: [this.user.phone, Validators.required],
      birthday: [this.user.birthday, Validators.required],
      sex: [this.user.sex, Validators.required]
    });

    this.carInfoForm = this._formBuilder.group({
      brand: [this.user.car.brand, Validators.required],
      model: [this.user.car.model, Validators.required],
      plaque: [this.user.car.plaque, Validators.required],
      color: [this.user.car.color, [Validators.required, Validators.minLength(4)]],
    });
  }
}
