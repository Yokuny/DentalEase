import { ObjectIdRegex } from "./regex.helper";

export const validObjectID = (value: string) => ObjectIdRegex.test(value);
