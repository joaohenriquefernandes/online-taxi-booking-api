import cors from "cors";
import express from "express";
import { Signup } from "./Signup";
import { AccountDAODatabase } from "./data";
import { GetAccount } from "./GetAccount";

const app = express();
app.use(express.json());
app.use(cors());

app.post("/signup", async (request, response) => {
  const input = request.body;
  try {
    const accountDAO = new AccountDAODatabase();
    const signup = new Signup(accountDAO);
    const output = await signup.signup(input);
    response.json(output);
  } catch (e: any) {
    response.status(422).json({ message: e.message });
  }
});

app.get("/accounts/:accountId", async (request, response) => {
  const { accountId } = request.params;
  const accountDAO = new AccountDAODatabase();
  const getAccount = new GetAccount(accountDAO);
  const output = await getAccount.getAccount(accountId);
  response.json(output);
});

app.listen(3000);
