export type ContactValues = {
  name: string;
  email: string;
  role: string;
  message: string;
};

export type ApplicationValues = {
  name: string;
  email: string;
  role: string;
  portfolio: string;
  summary: string;
};

export type FormErrors<T extends string> = Partial<Record<T, string>>;

const emailRegex = /\S+@\S+\.\S+/;

export const validateContact = (values: ContactValues): FormErrors<keyof ContactValues> => {
  const errors: FormErrors<keyof ContactValues> = {};
  if (!values.name.trim()) errors.name = 'Name is required.';
  if (!emailRegex.test(values.email)) errors.email = 'Enter a valid email.';
  if (!values.role.trim()) errors.role = 'Role is required.';
  if (values.message.trim().length < 10) errors.message = 'Message should be at least 10 characters.';
  return errors;
};

export const validateApplication = (
  values: ApplicationValues
): FormErrors<keyof ApplicationValues> => {
  const errors: FormErrors<keyof ApplicationValues> = {};
  if (!values.name.trim()) errors.name = 'Name is required.';
  if (!emailRegex.test(values.email)) errors.email = 'Enter a valid email.';
  if (!values.role.trim()) errors.role = 'Select a role.';
  if (!values.portfolio.trim()) errors.portfolio = 'Portfolio or LinkedIn is required.';
  if (values.summary.trim().length < 20) errors.summary = 'Add a short summary (20+ characters).';
  return errors;
};

