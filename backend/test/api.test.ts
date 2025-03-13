import axios from "axios";

axios.defaults.validateStatus = () => true;

describe('API', () => {
  test('Deve criar uma conta de passageiro', async () => {
    const input = {
      name: 'John Doe',
      email: `john.doe${Math.random()}@gmail.com`,
      cpf: '97456321558',
      password: '123456',
      isPassenger: true
    }
    const responseSignup = await axios.post('http://localhost:3000/signup', input)
    const outputSignup = responseSignup.data
    const responseGetAccount = await axios.get(`http://localhost:3000/accounts/${outputSignup.accountId}`)
    const outputGetAccount = responseGetAccount.data
    expect(outputSignup.accountId).toBeDefined()
    expect(outputSignup.accountId).toEqual(expect.any(String))
    expect(outputGetAccount.name).toBe(input.name)
    expect(outputGetAccount.email).toBe(input.email)
    expect(outputGetAccount.cpf).toBe(input.cpf)
    expect(outputGetAccount.password).toBe(input.password)
    expect(outputGetAccount.is_passenger).toBe(input.isPassenger)
  });

  test('Deve criar uma conta de passageiro', async () => {
    const input = {
      name: 'John Doe',
      email: `john.doe${Math.random()}@gmail.com`,
      cpf: '97456321558',
      password: '123456',
      isDriver: true,
      carPlate: 'AAA9999'
    }
    const responseSignup = await axios.post('http://localhost:3000/signup', input)
    const outputSignup = responseSignup.data
    const responseGetAccount = await axios.get(`http://localhost:3000/accounts/${outputSignup.accountId}`)
    const outputGetAccount = responseGetAccount.data
    expect(outputSignup.accountId).toBeDefined()
    expect(outputSignup.accountId).toEqual(expect.any(String))
    expect(outputGetAccount.name).toBe(input.name)
    expect(outputGetAccount.email).toBe(input.email)
    expect(outputGetAccount.cpf).toBe(input.cpf)
    expect(outputGetAccount.password).toBe(input.password)
    expect(outputGetAccount.car_plate).toBe(input.carPlate)
    expect(outputGetAccount.is_driver).toBe(input.isDriver)
  })

  test('Não deve criar uma conta de passageiro com o nome inválido', async () => {
    const input = {
      name: 'John',
      email: `john.doe${Math.random()}@gmail.com`,
      cpf: '97456321558',
      password: '123456',
      isPassenger: true
    }
    const responseSignup = await axios.post('http://localhost:3000/signup', input)
    const outputSignup = responseSignup.data
    expect(outputSignup.message).toBe('Invalid name')
  })

  test('Não deve criar uma conta de passageiro com o email inválido', async () => {
    const input = {
      name: 'John Doe',
      email: `john.doe${Math.random()}`,
      cpf: '97456321558',
      password: '123456',
      isPassenger: true
    }
    const responseSignup = await axios.post('http://localhost:3000/signup', input)
    const outputSignup = responseSignup.data
    expect(outputSignup.message).toBe('Invalid email')
  })

  test('Não deve criar uma conta de passageiro com o cpf inválido', async () => {
    const input = {
      name: 'John Doe',
      email: `john.doe${Math.random()}@gmail.com`,
      cpf: '11111111111',
      password: '123456',
      isPassenger: true
    }
    const responseSignup = await axios.post('http://localhost:3000/signup', input)
    const outputSignup = responseSignup.data
    expect(outputSignup.message).toBe('Invalid CPF')
  })

  test('Não deve criar uma conta de motorista com placa do carro inválida', async () => {
    const input = {
      name: 'John Doe',
      email: `john.doe${Math.random()}@gmail.com`,
      cpf: '97456321558',
      password: '123456',
      carPlate: 'AAA999',
      isDriver: true
    }
    const responseSignup = await axios.post('http://localhost:3000/signup', input)
    const outputSignup = responseSignup.data
    expect(outputSignup.message).toBe('Invalid car plate')
  })
  test('Não deve criar uma conta de pasageiro com conta duplicada', async () => {
    const input = {
      name: 'John Doe',
      email: `john.doe@gmail.com`,
      cpf: '97456321558',
      password: '123456',
      carPlate: 'AAA9999',
      isDriver: true
    }
    await axios.post('http://localhost:3000/signup', input)
    const responseSignup = await axios.post('http://localhost:3000/signup', input)
    const outputSignup = responseSignup.data
    expect(outputSignup.message).toBe('Duplicated account')
  })
})
