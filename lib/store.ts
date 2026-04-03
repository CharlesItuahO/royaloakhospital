export interface Appointment {
  id: string | number;
  name: string;
  phone: string;
  email?: string;
  date: string;
  service: string;
  message?: string;
  status: 'pending' | 'confirmed' | 'cancelled';
  createdAt: string;
}

export interface ContactMessage {
  id: string | number;
  name: string;
  phone: string;
  message: string;
  createdAt: string;
  read: boolean;
}

export const saveAppointment = (appointment: Omit<Appointment, 'id' | 'status' | 'createdAt'>) => {
  if (typeof window === 'undefined') return;
  const appointments = getAppointments();
  const newAppointment: Appointment = {
    ...appointment,
    id: Math.random().toString(36).substring(2, 9),
    status: 'pending',
    createdAt: new Date().toISOString(),
  };
  appointments.push(newAppointment);
  localStorage.setItem('royal_oak_appointments', JSON.stringify(appointments));
  return newAppointment;
};

export const getAppointments = (): Appointment[] => {
  if (typeof window === 'undefined') return [];
  const data = localStorage.getItem('royal_oak_appointments');
  return data ? JSON.parse(data) : [];
};

export const updateAppointmentStatus = (id: string | number, status: Appointment['status']) => {
  if (typeof window === 'undefined') return;
  const appointments = getAppointments();
  const index = appointments.findIndex((a) => a.id === id);
  if (index !== -1) {
    appointments[index].status = status;
    localStorage.setItem('royal_oak_appointments', JSON.stringify(appointments));
  }
};

export const saveMessage = (message: Omit<ContactMessage, 'id' | 'createdAt' | 'read'>) => {
  if (typeof window === 'undefined') return;
  const messages = getMessages();
  const newMessage: ContactMessage = {
    ...message,
    id: Math.random().toString(36).substring(2, 9),
    createdAt: new Date().toISOString(),
    read: false,
  };
  messages.push(newMessage);
  localStorage.setItem('royal_oak_messages', JSON.stringify(messages));
  return newMessage;
};

export const getMessages = (): ContactMessage[] => {
  if (typeof window === 'undefined') return [];
  const data = localStorage.getItem('royal_oak_messages');
  return data ? JSON.parse(data) : [];
};

export const markMessageRead = (id: string | number) => {
  if (typeof window === 'undefined') return;
  const messages = getMessages();
  const index = messages.findIndex((m) => m.id === id);
  if (index !== -1) {
    messages[index].read = true;
    localStorage.setItem('royal_oak_messages', JSON.stringify(messages));
  }
};
