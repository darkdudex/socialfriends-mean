export class FormValidate {

  private validForm: any;

  constructor() { }

  GetFormValidate() {
    this.validForm;
  }

  InitialValidationForm() {
    this.validForm = {
      account: false,
      password: false
    }
  }

  Change(event, value, type) {
    this.validForm[type] = value.length == 0 ? true : false;
  }

  InvalidValidation(json) {

    let flag = true;

    for (let key in json) {
      if (json[key] === "") {
        this.validForm[key] = true;
        flag = false;
      }
    }

    return flag;

  }

}