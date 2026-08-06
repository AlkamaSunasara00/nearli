export const mockMessages = [
  {
    id: 'c1',
    garageId: 'g1',
    name: 'Shreeji Auto Garage',
    photo: 'https://images.unsplash.com/photo-1635832798606-f6cccebe5143?q=80&w=200&auto=format&fit=crop',
    lastMessage: 'Yes, we can fix the AC today.',
    time: '10:45 AM',
    unread: 2,
    availability: 'available',
    messages: [
      { id: 'm1', text: 'Hi, my car AC is not cooling properly.', isOwn: true, time: '10:30 AM' },
      { id: 'm2', text: 'Hello! What car do you drive?', isOwn: false, time: '10:35 AM' },
      { id: 'm3', text: 'Hyundai i20.', isOwn: true, time: '10:38 AM' },
      { id: 'm4', text: 'Yes, we can fix the AC today. You can bring it by 2 PM.', isOwn: false, time: '10:45 AM' },
      { id: 'm5', text: 'Approximate cost would be around ₹1500 to ₹2500 depending on gas levels.', isOwn: false, time: '10:45 AM' },
    ]
  },
  {
    id: 'c2',
    garageId: 'g3',
    name: 'Jay Bhavani Two Wheeler Auto',
    photo: 'https://images.unsplash.com/photo-1558296726-d3b259160a2b?q=80&w=200&auto=format&fit=crop',
    lastMessage: 'Ok, see you.',
    time: 'Yesterday',
    unread: 0,
    availability: 'available',
    messages: [
      { id: 'm1', text: 'Do you have battery for Activa 6G?', isOwn: true, time: '04:00 PM' },
      { id: 'm2', text: 'Yes, Exide battery is available. ₹1200 with exchange.', isOwn: false, time: '04:15 PM' },
      { id: 'm3', text: 'Great, I will come tomorrow morning.', isOwn: true, time: '04:30 PM' },
      { id: 'm4', text: 'Ok, see you.', isOwn: false, time: '04:45 PM' },
    ]
  },
  {
    id: 'c3',
    garageId: 'g2',
    name: 'Sardar Motors & Servicing',
    photo: 'https://images.unsplash.com/photo-1625626248982-f542a1fc8a3b?q=80&w=200&auto=format&fit=crop',
    lastMessage: 'Please call when you reach.',
    time: 'Mon',
    unread: 0,
    availability: 'busy',
    messages: [
      { id: 'm1', text: 'Is your garage open on Sunday?', isOwn: true, time: '11:00 AM' },
      { id: 'm2', text: 'Yes, we are open till 7:30 PM.', isOwn: false, time: '11:15 AM' },
      { id: 'm3', text: 'Please call when you reach.', isOwn: false, time: '11:16 AM' },
    ]
  }
];

export const mockProviderMessages = [
  {
    id: 'pc1',
    customerId: 'u1',
    name: 'Aarav Patel',
    photo: 'https://images.unsplash.com/photo-1599566150163-29194dcaad36?q=80&w=200&auto=format&fit=crop',
    lastMessage: 'I am coming right now.',
    time: '12:30 PM',
    unread: 1,
    serviceContext: 'Tyre Puncture (Bike)',
    messages: [
      { id: 'm1', text: 'Hi, are you available? I have a flat tyre nearby.', isOwn: false, time: '12:20 PM' },
      { id: 'm2', text: 'Yes, we are available. Where are you exactly?', isOwn: true, time: '12:22 PM' },
      { id: 'm3', text: 'Near the Vastrapur lake.', isOwn: false, time: '12:25 PM' },
      { id: 'm4', text: 'Ok, come to our shop, it is just 2 mins from there.', isOwn: true, time: '12:28 PM' },
      { id: 'm5', text: 'I am coming right now.', isOwn: false, time: '12:30 PM' },
    ]
  },
  {
    id: 'pc2',
    customerId: 'u2',
    name: 'Sneha Shah',
    photo: 'https://images.unsplash.com/photo-1494790108377-be9c29b29330?q=80&w=200&auto=format&fit=crop',
    lastMessage: 'Thank you for the quick service!',
    time: 'Yesterday',
    unread: 0,
    serviceContext: 'General Service (Car)',
    messages: [
      { id: 'm1', text: 'Can I book a service for tomorrow?', isOwn: false, time: '09:00 AM' },
      { id: 'm2', text: 'Yes, what time works for you?', isOwn: true, time: '09:15 AM' },
      { id: 'm3', text: 'Is 10 AM fine?', isOwn: false, time: '09:20 AM' },
      { id: 'm4', text: 'Yes, 10 AM is booked.', isOwn: true, time: '09:30 AM' },
      { id: 'm5', text: 'Thank you for the quick service!', isOwn: false, time: '04:00 PM' },
    ]
  }
];
