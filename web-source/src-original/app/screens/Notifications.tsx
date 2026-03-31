import { ArrowLeft, Bell } from "lucide-react";
import { useNavigate } from "react-router";
import { motion } from "motion/react";
import { useState } from "react";

interface Notification {
  id: number;
  title: string;
  description: string;
  time: string;
  unread: boolean;
  type: "appointment" | "cancellation" | "reminder" | "promotion";
}

const mockNotifications: Notification[] = [
  {
    id: 1,
    title: "Your appointment is on schedule",
    description: "Your 4:00 PM appointment at Jawed Habib Hair Studio is on schedule",
    time: "18h ago",
    unread: true,
    type: "appointment",
  },
  {
    id: 2,
    title: "Your appointment is on schedule",
    description: "Your 9:00 AM appointment at Jawed Habib Hair Studio is on schedule",
    time: "1d ago",
    unread: true,
    type: "appointment",
  },
  {
    id: 3,
    title: "Your appointment is on schedule",
    description: "Your 11:00 AM appointment at Jawed Habib Hair Studio is on schedule",
    time: "10 Feb",
    unread: true,
    type: "appointment",
  },
  {
    id: 4,
    title: "Services Cancelled",
    description: "1 service(s) have been cancelled from your booking at Radiance Spa",
    time: "21 Jan",
    unread: true,
    type: "cancellation",
  },
  {
    id: 5,
    title: "Appointment Reminder",
    description: "Don't forget your appointment tomorrow at 2:00 PM at Luxe Beauty Studio",
    time: "15 Jan",
    unread: false,
    type: "reminder",
  },
  {
    id: 6,
    title: "Special Offer!",
    description: "Get 20% off on your next booking at Alchemic Beauty Studio",
    time: "10 Jan",
    unread: false,
    type: "promotion",
  },
];

export function Notifications() {
  const navigate = useNavigate();
  const [notifications, setNotifications] = useState<Notification[]>(mockNotifications);

  const markAllRead = () => {
    setNotifications((prev) => prev.map((notif) => ({ ...notif, unread: false })));
  };

  const markAsRead = (id: number) => {
    setNotifications((prev) =>
      prev.map((notif) => (notif.id === id ? { ...notif, unread: false } : notif))
    );
  };

  return (
    <div className="min-h-screen bg-gray-50">
      {/* Header */}
      <div 
        className="border-b border-white/40 sticky top-0 z-10 backdrop-blur-md"
        style={{ background: "var(--gradient-background-pastel)" }}
      >
        <div className="px-5 pt-12 pb-4 flex items-center justify-between">
          <div className="flex items-center gap-4">
            <button
              onClick={() => navigate(-1)}
              className="w-10 h-10 rounded-full bg-white/80 backdrop-blur-sm flex items-center justify-center hover:bg-white transition-colors shadow-sm"
            >
              <ArrowLeft className="w-5 h-5 text-gray-900" />
            </button>
            <h1 className="text-2xl font-black text-gray-900">Notifications</h1>
          </div>

          <button
            onClick={markAllRead}
            className="text-sm font-bold text-rose-500 hover:text-rose-600 transition-colors"
          >
            Mark all read
          </button>
        </div>
      </div>

      {/* Notifications List */}
      <div className="px-5 py-6 space-y-3">
        {notifications.map((notification, index) => (
          <motion.div
            key={notification.id}
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: index * 0.05 }}
            onClick={() => markAsRead(notification.id)}
            className="bg-white/60 backdrop-blur-md rounded-3xl p-4 flex gap-4 cursor-pointer hover:shadow-lg hover:bg-white/80 transition-all border border-white/60 shadow-sm"
          >
            {/* Bell Icon */}
            <div className="flex-shrink-0">
              <div 
                className="w-12 h-12 rounded-2xl flex items-center justify-center shadow-md"
                style={{ background: 'var(--gradient-primary)' }}
              >
                <Bell className="w-6 h-6 text-white" />
              </div>
            </div>

            {/* Content */}
            <div className="flex-1 min-w-0">
              <div className="flex items-start justify-between gap-2 mb-1">
                <h3 className="font-bold text-gray-900 text-base">{notification.title}</h3>
                <div className="flex items-center gap-2 flex-shrink-0">
                  <span className="text-xs text-gray-500">{notification.time}</span>
                  {notification.unread && (
                    <div className="w-2.5 h-2.5 rounded-full shadow-sm" style={{ backgroundColor: 'var(--primary)' }} />
                  )}
                </div>
              </div>
              <p className="text-sm text-gray-600 leading-relaxed">{notification.description}</p>
            </div>
          </motion.div>
        ))}
      </div>

      {/* Empty State */}
      {notifications.length === 0 && (
        <div className="flex flex-col items-center justify-center py-20 px-5">
          <div 
            className="w-20 h-20 rounded-full flex items-center justify-center mb-4"
            style={{ backgroundColor: 'var(--primary-subtle)' }}
          >
            <Bell className="w-10 h-10" style={{ color: 'var(--primary)' }} />
          </div>
          <h3 className="text-xl font-black text-gray-900 mb-2">No notifications</h3>
          <p className="text-sm text-gray-500 text-center">
            You're all caught up! Check back later for updates.
          </p>
        </div>
      )}
    </div>
  );
}