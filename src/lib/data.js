export const CAMPAIGNS = [
  { id: '1', title: 'Downtown LA Food', organization: 'LA Food Rescue', raised: 4500, goal: 5000, daysLeft: 3 },
  { id: '2', title: 'SF School Breakfast Initiative', organization: 'Bay Area Meals', raised: 1200, goal: 3000, daysLeft: 12 },
  { id: '3', title: 'Central Valley Farm Rescue', organization: 'AgriShare CA', raised: 8900, goal: 10000, daysLeft: 5 },
];

export const VOLUNTEER_SHIFTS = [
  { id: '1', title: 'Morning Bakery Rescue', location: 'Downtown LA', time: 'Tomorrow, 6:00 AM - 8:00 AM', role: 'Driver Needed', spotsLeft: 1, urgent: true },
  { id: '2', title: 'Community Meal Prep', location: 'SF Central Kitchen', time: 'Saturday, 10:00 AM - 1:00 PM', role: 'Prep & Pack', spotsLeft: 8, urgent: false },
];

export const MOCK_USER = {
  name: 'Jerin Babu',
  email: 'jerin.babujb@gmail.com',
  avatar: 'https://i.pravatar.cc/150?img=11',
  impact: { mealsRescued: 124, donations: 450, campaigns: 3 }
};