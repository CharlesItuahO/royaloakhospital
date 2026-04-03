'use server';

import { sql } from '@vercel/postgres';
import { revalidatePath } from 'next/cache';

export async function checkDb() {
  return !!process.env.POSTGRES_URL;
}

export async function initDb() {
  if (!process.env.POSTGRES_URL) return { success: false, message: 'POSTGRES_URL not set' };
  try {
    await sql`
      CREATE TABLE IF NOT EXISTS appointments (
        id SERIAL PRIMARY KEY,
        name VARCHAR(255) NOT NULL,
        phone VARCHAR(50) NOT NULL,
        email VARCHAR(255),
        date VARCHAR(50) NOT NULL,
        service VARCHAR(255) NOT NULL,
        message TEXT,
        status VARCHAR(50) DEFAULT 'pending',
        created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
      );
    `;
    await sql`
      CREATE TABLE IF NOT EXISTS messages (
        id SERIAL PRIMARY KEY,
        name VARCHAR(255) NOT NULL,
        phone VARCHAR(50) NOT NULL,
        message TEXT NOT NULL,
        read BOOLEAN DEFAULT FALSE,
        created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
      );
    `;
    return { success: true };
  } catch (error) {
    console.error('Failed to initialize database:', error);
    return { success: false, error };
  }
}

export async function saveAppointmentDb(data: any) {
  if (!process.env.POSTGRES_URL) return { success: false, error: 'No DB' };
  try {
    await sql`
      INSERT INTO appointments (name, phone, email, date, service, message)
      VALUES (${data.name}, ${data.phone}, ${data.email || ''}, ${data.date}, ${data.service}, ${data.message || ''})
    `;
    revalidatePath('/admin/dashboard');
    return { success: true };
  } catch (error) {
    console.error(error);
    return { success: false, error };
  }
}

export async function getAppointmentsDb() {
  if (!process.env.POSTGRES_URL) return [];
  try {
    const { rows } = await sql`SELECT * FROM appointments ORDER BY created_at DESC`;
    return rows;
  } catch (error) {
    console.error(error);
    return [];
  }
}

export async function updateAppointmentStatusDb(id: number, status: string) {
  if (!process.env.POSTGRES_URL) return { success: false };
  try {
    await sql`UPDATE appointments SET status = ${status} WHERE id = ${id}`;
    revalidatePath('/admin/dashboard');
    return { success: true };
  } catch (error) {
    console.error(error);
    return { success: false };
  }
}

export async function saveMessageDb(data: any) {
  if (!process.env.POSTGRES_URL) return { success: false, error: 'No DB' };
  try {
    await sql`
      INSERT INTO messages (name, phone, message)
      VALUES (${data.name}, ${data.phone}, ${data.message})
    `;
    revalidatePath('/admin/dashboard');
    return { success: true };
  } catch (error) {
    console.error(error);
    return { success: false, error };
  }
}

export async function getMessagesDb() {
  if (!process.env.POSTGRES_URL) return [];
  try {
    const { rows } = await sql`SELECT * FROM messages ORDER BY created_at DESC`;
    return rows;
  } catch (error) {
    console.error(error);
    return [];
  }
}

export async function markMessageReadDb(id: number) {
  if (!process.env.POSTGRES_URL) return { success: false };
  try {
    await sql`UPDATE messages SET read = TRUE WHERE id = ${id}`;
    revalidatePath('/admin/dashboard');
    return { success: true };
  } catch (error) {
    console.error(error);
    return { success: false };
  }
}
