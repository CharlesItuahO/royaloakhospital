'use client';

import { useState, useEffect } from 'react';
import { useRouter } from 'next/navigation';
import { LogOut, Calendar, MessageSquare, CheckCircle, XCircle, Clock, AlertTriangle } from 'lucide-react';
import { format } from 'date-fns';
import { Appointment, ContactMessage, getAppointments, getMessages, updateAppointmentStatus, markMessageRead } from '@/lib/store';
import { getAppointmentsDb, getMessagesDb, updateAppointmentStatusDb, markMessageReadDb, checkDb, initDb } from '@/lib/actions';
import { toast } from 'sonner';

export default function AdminDashboard() {
  const [activeTab, setActiveTab] = useState<'appointments' | 'messages'>('appointments');
  const [appointments, setAppointments] = useState<Appointment[]>([]);
  const [messages, setMessages] = useState<ContactMessage[]>([]);
  const [isClient, setIsClient] = useState(false);
  const [usingDb, setUsingDb] = useState(false);
  const router = useRouter();

  useEffect(() => {
    setIsClient(true);
    const isAuth = localStorage.getItem('royal_oak_admin_auth');
    if (!isAuth) {
      router.push('/admin/login');
      return;
    }

    async function loadData() {
      const hasDb = await checkDb();
      setUsingDb(hasDb);
      if (hasDb) {
        await initDb();
        const dbApps = await getAppointmentsDb();
        const dbMsgs = await getMessagesDb();
        setAppointments(dbApps.map((a: any) => ({...a, createdAt: a.created_at})));
        setMessages(dbMsgs.map((m: any) => ({...m, createdAt: m.created_at})));
      } else {
        setAppointments(getAppointments().sort((a, b) => new Date(b.createdAt).getTime() - new Date(a.createdAt).getTime()));
        setMessages(getMessages().sort((a, b) => new Date(b.createdAt).getTime() - new Date(a.createdAt).getTime()));
      }
    }
    loadData();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  const handleLogout = () => {
    localStorage.removeItem('royal_oak_admin_auth');
    router.push('/admin/login');
  };

  const handleUpdateStatus = async (id: string | number, status: Appointment['status']) => {
    if (usingDb) {
      await updateAppointmentStatusDb(id as number, status);
      const dbApps = await getAppointmentsDb();
      setAppointments(dbApps.map((a: any) => ({...a, createdAt: a.created_at})));
    } else {
      updateAppointmentStatus(id, status);
      setAppointments(getAppointments().sort((a, b) => new Date(b.createdAt).getTime() - new Date(a.createdAt).getTime()));
    }
    toast.success(`Appointment marked as ${status}`);
  };

  const handleMarkRead = async (id: string | number) => {
    if (usingDb) {
      await markMessageReadDb(id as number);
      const dbMsgs = await getMessagesDb();
      setMessages(dbMsgs.map((m: any) => ({...m, createdAt: m.created_at})));
    } else {
      markMessageRead(id);
      setMessages(getMessages().sort((a, b) => new Date(b.createdAt).getTime() - new Date(a.createdAt).getTime()));
    }
    toast.success('Message marked as read');
  };

  if (!isClient) return null;

  return (
    <div className="min-h-screen bg-gray-50">
      {/* Admin Header */}
      <header className="bg-white shadow-sm border-b border-gray-200">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex justify-between items-center h-16">
            <div className="flex items-center">
              <h1 className="text-2xl font-bold text-gray-900">Admin Dashboard</h1>
            </div>
            <button
              onClick={handleLogout}
              className="flex items-center text-gray-600 hover:text-red-600 transition-colors"
            >
              <LogOut className="h-5 w-5 mr-2" />
              Logout
            </button>
          </div>
        </div>
      </header>

      <main className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        {!usingDb && (
          <div className="mb-8 bg-yellow-50 border-l-4 border-yellow-400 p-4 rounded-md">
            <div className="flex">
              <div className="flex-shrink-0">
                <AlertTriangle className="h-5 w-5 text-yellow-400" />
              </div>
              <div className="ml-3">
                <p className="text-sm text-yellow-700">
                  <strong>Database not connected.</strong> Currently using local browser storage. To use Vercel Postgres, add <code className="bg-yellow-100 px-1 rounded">POSTGRES_URL</code> to your environment variables.
                </p>
              </div>
            </div>
          </div>
        )}

        {/* Tabs */}
        <div className="flex space-x-4 mb-8">
          <button
            onClick={() => setActiveTab('appointments')}
            className={`flex items-center px-6 py-3 rounded-lg font-medium transition-colors ${
              activeTab === 'appointments'
                ? 'bg-blue-600 text-white shadow-md'
                : 'bg-white text-gray-600 hover:bg-gray-50 border border-gray-200'
            }`}
          >
            <Calendar className="h-5 w-5 mr-2" />
            Appointments
            <span className="ml-2 bg-blue-100 text-blue-800 py-0.5 px-2.5 rounded-full text-xs">
              {appointments.length}
            </span>
          </button>
          <button
            onClick={() => setActiveTab('messages')}
            className={`flex items-center px-6 py-3 rounded-lg font-medium transition-colors ${
              activeTab === 'messages'
                ? 'bg-blue-600 text-white shadow-md'
                : 'bg-white text-gray-600 hover:bg-gray-50 border border-gray-200'
            }`}
          >
            <MessageSquare className="h-5 w-5 mr-2" />
            Messages
            <span className="ml-2 bg-blue-100 text-blue-800 py-0.5 px-2.5 rounded-full text-xs">
              {messages.filter(m => !m.read).length} New
            </span>
          </button>
        </div>

        {/* Content */}
        <div className="bg-white rounded-xl shadow-sm border border-gray-200 overflow-hidden">
          {activeTab === 'appointments' && (
            <div className="overflow-x-auto">
              <table className="min-w-full divide-y divide-gray-200">
                <thead className="bg-gray-50">
                  <tr>
                    <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Patient Details</th>
                    <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Service & Date</th>
                    <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Status</th>
                    <th className="px-6 py-3 text-right text-xs font-medium text-gray-500 uppercase tracking-wider">Actions</th>
                  </tr>
                </thead>
                <tbody className="bg-white divide-y divide-gray-200">
                  {appointments.length === 0 ? (
                    <tr>
                      <td colSpan={4} className="px-6 py-8 text-center text-gray-500">
                        No appointments found.
                      </td>
                    </tr>
                  ) : (
                    appointments.map((apt) => (
                      <tr key={apt.id} className="hover:bg-gray-50 transition-colors">
                        <td className="px-6 py-4">
                          <div className="text-sm font-medium text-gray-900">{apt.name}</div>
                          <div className="text-sm text-gray-500">{apt.phone}</div>
                          {apt.email && <div className="text-sm text-gray-500">{apt.email}</div>}
                        </td>
                        <td className="px-6 py-4">
                          <div className="text-sm text-gray-900">{apt.service}</div>
                          <div className="text-sm text-gray-500">{format(new Date(apt.date), 'MMM dd, yyyy')}</div>
                          {apt.message && <div className="text-xs text-gray-400 mt-1 truncate max-w-xs">{apt.message}</div>}
                        </td>
                        <td className="px-6 py-4">
                          <span className={`inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium ${
                            apt.status === 'pending' ? 'bg-yellow-100 text-yellow-800' :
                            apt.status === 'confirmed' ? 'bg-green-100 text-green-800' :
                            'bg-red-100 text-red-800'
                          }`}>
                            {apt.status === 'pending' && <Clock className="w-3 h-3 mr-1" />}
                            {apt.status === 'confirmed' && <CheckCircle className="w-3 h-3 mr-1" />}
                            {apt.status === 'cancelled' && <XCircle className="w-3 h-3 mr-1" />}
                            {apt.status.charAt(0).toUpperCase() + apt.status.slice(1)}
                          </span>
                        </td>
                        <td className="px-6 py-4 text-right text-sm font-medium">
                          {apt.status === 'pending' && (
                            <div className="flex justify-end space-x-2">
                              <button
                                onClick={() => handleUpdateStatus(apt.id, 'confirmed')}
                                className="text-green-600 hover:text-green-900 bg-green-50 px-3 py-1 rounded-md"
                              >
                                Confirm
                              </button>
                              <button
                                onClick={() => handleUpdateStatus(apt.id, 'cancelled')}
                                className="text-red-600 hover:text-red-900 bg-red-50 px-3 py-1 rounded-md"
                              >
                                Cancel
                              </button>
                            </div>
                          )}
                        </td>
                      </tr>
                    ))
                  )}
                </tbody>
              </table>
            </div>
          )}

          {activeTab === 'messages' && (
            <div className="divide-y divide-gray-200">
              {messages.length === 0 ? (
                <div className="p-8 text-center text-gray-500">
                  No messages found.
                </div>
              ) : (
                messages.map((msg) => (
                  <div key={msg.id} className={`p-6 ${msg.read ? 'bg-white' : 'bg-blue-50'}`}>
                    <div className="flex justify-between items-start">
                      <div>
                        <h4 className="text-lg font-semibold text-gray-900">{msg.name}</h4>
                        <div className="text-sm text-gray-500 mt-1 flex items-center space-x-4">
                          <span>{msg.phone}</span>
                          <span>{format(new Date(msg.createdAt), 'MMM dd, yyyy HH:mm')}</span>
                        </div>
                        <p className="mt-4 text-gray-700 whitespace-pre-wrap">{msg.message}</p>
                      </div>
                      {!msg.read && (
                        <button
                          onClick={() => handleMarkRead(msg.id)}
                          className="flex items-center text-sm text-blue-600 hover:text-blue-800 font-medium"
                        >
                          <CheckCircle className="w-4 h-4 mr-1" />
                          Mark as Read
                        </button>
                      )}
                    </div>
                  </div>
                ))
              )}
            </div>
          )}
        </div>
      </main>
    </div>
  );
}
