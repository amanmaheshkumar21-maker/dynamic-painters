import type { Principal } from "@icp-sdk/core/principal";
export interface Some<T> {
    __kind__: "Some";
    value: T;
}
export interface None {
    __kind__: "None";
}
export type Option<T> = Some<T> | None;
export interface Message {
    name: string;
    email: string;
    message: string;
    phone: string;
}
export interface Booking {
    status: BookingStatus;
    serviceType: string;
    name: string;
    message: string;
    preferredDate: bigint;
    address: string;
    phone: string;
}
export interface UserProfile {
    name: string;
    email: string;
    phone: string;
}
export enum BookingStatus {
    cancelled = "cancelled",
    pending = "pending",
    completed = "completed",
    confirmed = "confirmed"
}
export enum UserRole {
    admin = "admin",
    user = "user",
    guest = "guest"
}
export interface backendInterface {
    assignCallerUserRole(user: Principal, role: UserRole): Promise<void>;
    deleteContactMessage(messageId: string): Promise<void>;
    getAllBookings(): Promise<Array<Booking>>;
    getAllContactMessages(): Promise<Array<Message>>;
    getCallerUserProfile(): Promise<UserProfile | null>;
    getCallerUserRole(): Promise<UserRole>;
    getUserProfile(user: Principal): Promise<UserProfile | null>;
    isCallerAdmin(): Promise<boolean>;
    saveCallerUserProfile(profile: UserProfile): Promise<void>;
    submitBooking(name: string, phone: string, address: string, serviceType: string, preferredDate: bigint, message: string): Promise<void>;
    submitContactMessage(name: string, phone: string, email: string, message: string): Promise<void>;
    updateBookingStatus(bookingId: string, status: BookingStatus): Promise<void>;
}
