import 'dotenv/config';

export const PORT = Number(process.env.PORT);
export const PRIVATE_TOKEN = process.env.PRIVATE_TOKEN as string;
export const EXP_TOKEN = process.env.EXP_TOKEN as string;