export const titleRegex = RegExp(/^[a-zA-Z0-9\sÀ-ú]{6,}\s*$/);

export const dateRegex = RegExp(/^(202[3-9]|20[3-9]\d)-(0[1-9]|1[0-2])-(0[1-9]|[12]\d|3[01])$/);

export const emailRegex = RegExp(/^[a-z0-9.]+@[a-z0-9]+\.[a-z]+(\.[a-z]+)?$/i);

export const passwordRegex = RegExp(/^(?=.*[a-zA-Z])(?=.*[0-9])(?=.{6,})/);

export const cpfRegex = RegExp(/^[0-9]{11}$/);

export const rgRegex = RegExp(/^[0-9]{7}$/);

export const birthRegex = RegExp(/^(19|20)[0-9]{2}-(0[1-9]|1[0-2])-(0[1-9]|[12]\d|3[01])$/);

export const sexRegex = RegExp(/^[MF]$/i);

export const telRegex = RegExp(/^[0-9]{11}$/);

export const cepRegex = RegExp(/^[0-9]{8}$/);

export const addressRegex = RegExp(/^[a-zA-ZÀ-ú0-9\s]{5,50}$/);
