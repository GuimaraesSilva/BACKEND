import { readFileSync } from "fs";
import { IUser } from "../data/interfaces/interfaces.js";

export let users: IUser[] = JSON.parse(
    readFileSync("./src/data/users.json", "utf-8")
); //importar o ficheiro JSON dos users
