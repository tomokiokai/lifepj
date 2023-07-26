export type Reservation = {
  id: number;
  date: Date;
  time_slot: number; // 1 for 10:00-10:30, 2 for 10:30-11:00, etc.
  adults: number;
  children: number;
  user_id: number;
  shop_id: number;
  service_type_adult: number;
  service_type_children: number;
  created_at: Date;
  updated_at: Date;
};
