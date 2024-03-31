import { ObjectIdRegex } from "./regex.helper";

export const validObjectID = (value: string) => ObjectIdRegex.test(value);

export const stringToBoolean = (value: string) => value === "true";
