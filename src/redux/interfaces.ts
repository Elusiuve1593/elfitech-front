export interface Participant {
  _id?: string; 
  fullName: string;
  email: string;
  dateOfBirth: string;
  eventSource: string;
}

export interface DocsInterface {
  _id: string;
  participants: Participant[];
  title: string;
  description: string;
  date: string;
  organization: string;
}

export interface EventsSlice {
  docs: DocsInterface[];
  page: number;
  limit: number;
  totalPages: number;
}

export interface RegistrationFormType {
  fullName: string;
  email: string;
  dateOfBirth: string;
  eventSource: string;
  participantId?: string;
}
