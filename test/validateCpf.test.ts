import { validateCpf } from "../src/validateCpf";

describe("Validate CPF", () => {
  test.each(["97456321558", "974.563.215-58", "71428793860", "87748248800"])(
    "Deve validar o cpf %s",
    (cpf: string) => {
      const isValid = validateCpf(cpf);
      expect(isValid).toBe(true);
    }
  );

  test.each([null, undefined, "", "11111111111"])(
    "Nao deve validar o cpf %s",
    (cpf: string | null | undefined) => {
      const isValid = validateCpf(cpf);
      expect(isValid).toBe(false);
    }
  );
});
