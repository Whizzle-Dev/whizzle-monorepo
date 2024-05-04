export type FormElements = Array<{ question: string; type: FormElementTypes }>;
export type FormElementTypes = 'short_answer' | 'long_answer' | 'rating';
export type FormValues = { formElements: FormElements };
