export type IUser = {
  "id": number,
  "email": string | null,

  "name": string,
  "phone": string,
  "gender": string,
  "notification": boolean,
  "isOnline": boolean,

  isGuest: boolean

  picture: { url: string, key: string } | null
  auth: {
    role: "Admin",
    status: boolean
  },
  address: string | null,
  driving_license: { url: string, key: string } | null,
  car: ICar

  role: "Driver" | "User"

  createdAt: Date,
  defaultPageId: string | null
  defaultPage: IPage | null
}

export interface IPage {
  id: string,
  key: string,
  label: string,
  path: string
}

export type ReservationPrice = {
  id: number;
  city?: string | null;
  from_zip_code: string;
  to_zip_code: string;
  airport_iata?: string | null;
  price: number;
};

export interface ICar {
  id: number
  name: string
  car_type: string
  passanger_capacity: number

  comment: string

  license_number: string
  description: string
  exterior_color: string
  vin_number: string
  tcp_number: string
  cancel_policy: string
  insurance_policy: string

  general_features: string[]
  multimedia: string[]
  policies: string[]

  photos: { key: string, url: string }[]

  driverId: number
  driver: IUser

}


export enum TripType {
  ONEWAY = "ONEWAY",
  ROUND = "ROUND",
  HOURLY = "HOURLY",
}

export enum VehicleType {
  Sub = "Sub",
  Sedan = "Sedan",
  Tesla = "Tesla",
  Private = "Private",
}

export enum DriverStatus {
  PENDING = "PENDING",
  ACCEPTED = "ACCEPTED",
  REJECTED = "REJECTED",
}

export enum ReservationStatus {
  PENDING = "PENDING",
  DRIVER_ASSIGNED = "DRIVER_ASSIGNED",
  ON_THE_WAY = "ON_THE_WAY",
  ARRIVED = "ARRIVED",
  TRIP_STARTED = "TRIP_STARTED",
  TRIP_COMPLETED = "TRIP_COMPLETED",
  CANCELLED_BY_USER = "CANCELLED_BY_USER",
  CANCELLED_BY_DRIVER = "CANCELLED_BY_DRIVER",
  CANCELLED_BY_ADMIN = "CANCELLED_BY_ADMIN",
  NO_SHOW = "NO_SHOW",
}

export interface Location {
  id: number;
  date?: Date | null;
  time?: string | null;
  address: string;
  lat: number;
  long: number;

  arrival_airport?: string | null;
  airline?: string | null;
  flight?: string | null;
  flightData: Flight | null
  flight_id: string | null,
  mode: "AIRPORT" | "ADDRESS"
}

export interface Luggage {
  id: number;
  carry_on: number;
  checked: number;
  oversize: number;
}

export interface BookingContact {
  id: number;
  first_name: string;
  last_name?: string | null;
  email?: string | null;
  phone: string;

  userId: number;
  user: IUser
}

export interface IReservation {
  id: number;

  code: string

  order_type: string;
  trip_type: TripType;
  details?: string | null;

  pick_up?: Location | null;
  drop_off?: Location | null;

  passenger_count: number;
  children_count: number,
  trip_note?: string | null;
  luggage?: Luggage | null;

  vehicle_type?: VehicleType | null;

  isQuoted: boolean;

  comment?: string | null;

  base_price: number;
  gratuity_price: number;
  airport_fee: number;
  meet_greet_fee: number;
  toll_fee: number;
  tip: number;
  parking_fee: number,
  luggage_fee: number,
  wait_min: number
  final_price: number;

  driver_status: DriverStatus;
  status: ReservationStatus;

  passengerId: number;
  passenger: IUser,

  driverId?: number | null;
  driver: IUser | null

  booking_contactId: number | null;
  booking_contact: BookingContact | null;

  distance: number;

  otherstops: Location[]

  createdAt: Date;
  updatedAt: Date;
  payment: IPayment | null,
  entryBy: IUser,

  "fieldEditors": {
    [fieldName: string]: FieldEditor;
  },

  paymentMethod: {
    stripePaymentMethodId: string
  } | null

}

export type FieldEditor = {
  name: string;
  role: "STAFF" | "Admin";
  editedAt: Date | string;
  avatar: string | null;
  oldValues: any;
};

export interface IQuote {
  id: number;

  base_price: number;
  gratuity_price: number;
  airport_fee: number;
  meet_greet_fee: number;
  toll_fee: number;
  final_price: number;

  reservationId: number;
  reservation: IReservation;
  passengerId: number;

  status: "PENDING" | "APPROVED" | "DECLINED";

  createdAt: Date;
  updatedAt: Date;
}

export interface IReservationQuotes extends IReservation {
  quotes: IQuote
}

export interface IDispatchHeader { label: string, key: string[], order: number, id: number }

export type TPayment = {
  id: number
  userId: number
  user: IUser
  amount: number
  paid_amount: number
  isPaid: boolean
  subscriptionId: number | null

  transactionId: string
  createdAt: Date
  updatedAt: Date

  type: "subscription" | "vehicle_process" | "document_download",
}

export type TCard = {
  "id": string,
  "brand": string,
  "last4": string,
  "expMonth": number,
  "expYear": number,
  "cardholderName": null | string
}


export interface IMeta {
  "page": number,
  totalPage: number,
  "limit": number,
  "total": number,
}

export interface IEarning {
  "_id": string,
  "clientName": string,
  "amount": number,
  "transactionDate": string,
  "createdAt": string,
}

export interface IAdminStats {
  "totalUsers": number,
  totalEarnings: number,
  totalDrivers: number
}

export interface INotification {
  _id: string
  title: string,
  message: string,
  "isRead": boolean,
  "createdAt": string,
  "updatedAt": string,
  "__v": 0
}

export type Airline = {
  "id": string,
  "name": string,
  logo: string
}
export type Airports = {
  "id": 1,
  "name": string,
  "city": string,
  "country": string,
  "iata": string,
  "icao": string,
  "location": {
    "lat": -6.081689834590001,
    "lng": 145.391998291
  },
  "elevation_ft": 5282,
  "timezone": string,
  "type": "airport",
  "scheduled_service": boolean,
  "source": string
}

export interface ICountryCode {
  "name": string,
  "code": string,
  "emoji": string,
  "unicode": string,
  "dial_code": string,
  "image": string
}

export interface IPayment {
  id: number
  user: IUser
  amount: number
  reservation: IReservation
  status: "PENDING" | "SUCCESSED" | "FAILED"
  failed_reason: string | null,
  last_failedAt: Date | null,
  paidAt: Date | null

  transactionId: string

  createdAt: Date
  updatedAt: Date
}

export type FlightScheduleMode =
  | "ACTUAL"
  | "SCHEDULED"
  | "ESTIMATED";

export type AirportLocation = {
  lat: number;
  lng: number;
};

export type Airport = {
  id: number;
  name: string;
  city?: string | null;
  country?: string | null;
  code: string;
  iata?: string | null;
  icao?: string | null;
  location?: AirportLocation | null;
  elevation_ft?: number | null;
  timezone?: string | null;
  type?: string | null;
  scheduledService: boolean;
  source?: string | null;
};

export type FlightAirport = {
  id: string;
  schedule: string; // ISO string for frontend
  mode: FlightScheduleMode;

  timezone?: string | null;
  terminal?: string | null;
  gate?: string | null;
  delay?: number | null;

  airport: Airport;
};

export type Flight = {
  id: string;

  airlineId: string;
  flightNumber: number;

  ident: string;
  aircraft_type: string;

  fa_flightId?: string | null;

  userId: number;

  status?: string | null;

  origin?: FlightAirport | null;
  destination?: FlightAirport | null;

  last_syncedAt: string; // ISO string
};