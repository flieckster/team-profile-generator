const Employee = require("./employee.js")

class Manager extends Employee{
  constructor(name, id, email, officenumber){
    super(name, id, email,);
    this.officenumber = this.officenumber;
  }
  getGithub(){
    return this.officenumber
  }
  getRole(){
    return "Manager"
  }


}

module.exports = Manager