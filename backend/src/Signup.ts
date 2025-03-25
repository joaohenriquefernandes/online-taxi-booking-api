import { validateCpf } from "./validateCpf";
import crypto from "node:crypto";

export class Signup {
  constructor(readonly signupData: SignupData) {}

  isValidName(name: string) {
    return name.match(/[a-zA-Z] [a-zA-Z]+/);
  }

  isValidEmail(email: string) {
    return email.match(/^(.+)@(.+)$/);
  }

  isValidCarPlate(carPlate: string) {
    return carPlate.match(/[A-Z]{3}[0-9]{4}/);
  }

  async signup(input: any) {
    const account = {
      id: crypto.randomUUID(),
      name: input.name,
      email: input.email,
      cpf: input.cpf,
      password: input.password,
      isPassenger: input.isPassenger,
      isDriver: input.isDriver,
      carPlate: input.carPlate,
    };
    const existingAccount = await this.signupData.getAccountByEmail(
      account.email
    );
    if (existingAccount) throw new Error("Duplicated account");
    if (!this.isValidName(account.name)) throw new Error("Invalid name");
    if (!this.isValidEmail(account.email)) throw new Error("Invalid email");
    if (!validateCpf(account.cpf)) throw new Error("Invalid CPF");
    if (account.isDriver && !this.isValidCarPlate(account.carPlate))
      throw new Error("Invalid car plate");
    await this.signupData.saveAccount(account);
    return { accountId: account.id };
  }
}

export interface SignupData {
  saveAccount(account: any): Promise<void>;
  getAccountByEmail(email: string): Promise<any>;
}
