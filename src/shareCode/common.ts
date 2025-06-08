import { env } from "process";

export interface IBDSettings {
  host: string;
  port: number;
  user: string;
  password: string;
  database: string;
}

export const GetDBSettings = (): IBDSettings => {
  const env = process.env.NODE_ENV;

  if (env === "development")
    return {
      host: "localhost",
      port: 3306,
      user: "root",
      password: "Admin@123",
      database: "todolist",
    };
};
