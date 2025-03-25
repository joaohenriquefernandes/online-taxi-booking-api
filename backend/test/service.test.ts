import { Signup } from "../src/Signup";
import { GetAccount } from "../src/GetAccount";
import { AccountDAODatabase, AccountDAOMemory } from "../src/data";

describe("API", () => {
  let signup: Signup;
  let getAccount: GetAccount;

  beforeEach(() => {
    const accountDAO = new AccountDAOMemory();
    // const accountDAO = new AccountDAODatabase();
    signup = new Signup(accountDAO);
    getAccount = new GetAccount(accountDAO);
  });

  test("Deve criar uma conta de passageiro", async () => {
    const input = {
      name: "John Doe",
      email: `john.doe${Math.random()}@gmail.com`,
      cpf: "97456321558",
      password: "123456",
      isPassenger: true,
    };
    const outputSignup = await signup.signup(input);
    const outputGetAccount = await getAccount.getAccount(
      outputSignup.accountId
    );
    expect(outputSignup.accountId).toBeDefined();
    expect(outputGetAccount.name).toBe(input.name);
    expect(outputGetAccount.email).toBe(input.email);
    expect(outputGetAccount.cpf).toBe(input.cpf);
    expect(outputGetAccount.password).toBe(input.password);
    expect(outputGetAccount.isPassenger).toBe(input.isPassenger);
  });

  test("Deve criar uma conta de motorista", async () => {
    const input = {
      name: "John Doe",
      email: `john.doe${Math.random()}@gmail.com`,
      cpf: "97456321558",
      password: "123456",
      isDriver: true,
      carPlate: "AAA9999",
    };
    const outputSignup = await signup.signup(input);
    const outputGetAccount = await getAccount.getAccount(
      outputSignup.accountId
    );
    expect(outputSignup.accountId).toBeDefined();
    expect(outputSignup.accountId).toEqual(expect.any(String));
    expect(outputGetAccount.name).toBe(input.name);
    expect(outputGetAccount.email).toBe(input.email);
    expect(outputGetAccount.cpf).toBe(input.cpf);
    expect(outputGetAccount.password).toBe(input.password);
    expect(outputGetAccount.carPlate).toBe(input.carPlate);
    expect(outputGetAccount.isDriver).toBe(input.isDriver);
  });

  test("Não deve criar uma conta de passageiro com o nome inválido", async () => {
    const input = {
      name: "John",
      email: `john.doe${Math.random()}@gmail.com`,
      cpf: "97456321558",
      password: "123456",
      isPassenger: true,
    };
    await expect(signup.signup(input)).rejects.toThrow(
      new Error("Invalid name")
    );
  });

  test("Não deve criar uma conta de passageiro com o email inválido", async () => {
    const input = {
      name: "John Doe",
      email: `john.doe${Math.random()}`,
      cpf: "97456321558",
      password: "123456",
      isPassenger: true,
    };
    await expect(signup.signup(input)).rejects.toThrow(
      new Error("Invalid email")
    );
  });

  test("Não deve criar uma conta de passageiro com o cpf inválido", async () => {
    const input = {
      name: "John Doe",
      email: `john.doe${Math.random()}@gmail.com`,
      cpf: "11111111111",
      password: "123456",
      isPassenger: true,
    };
    await expect(signup.signup(input)).rejects.toThrow(
      new Error("Invalid CPF")
    );
  });

  test("Não deve criar uma conta de motorista com placa do carro inválida", async () => {
    const input = {
      name: "John Doe",
      email: `john.doe${Math.random()}@gmail.com`,
      cpf: "97456321558",
      password: "123456",
      carPlate: "AAA999",
      isDriver: true,
    };
    await expect(signup.signup(input)).rejects.toThrow(
      new Error("Invalid car plate")
    );
  });

  test("Não deve criar uma conta de pasageiro com conta duplicada", async () => {
    const input = {
      name: "John Doe",
      email: `john.doe${Math.random()}@gmail.com`,
      cpf: "97456321558",
      password: "123456",
      carPlate: "AAA9999",
      isDriver: true,
    };
    await signup.signup(input);
    await expect(signup.signup(input)).rejects.toThrow(
      new Error("Duplicated account")
    );
  });
});
