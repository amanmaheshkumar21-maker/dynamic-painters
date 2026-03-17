import Map "mo:core/Map";
import Text "mo:core/Text";
import Array "mo:core/Array";
import Order "mo:core/Order";
import Runtime "mo:core/Runtime";
import Iter "mo:core/Iter";
import Principal "mo:core/Principal";
import MixinAuthorization "authorization/MixinAuthorization";
import AccessControl "authorization/access-control";

actor {
  // Initialize the access control state
  let accessControlState = AccessControl.initState();
  include MixinAuthorization(accessControlState);

  // User Profile Management
  public type UserProfile = {
    name : Text;
    phone : Text;
    email : Text;
  };

  let userProfiles = Map.empty<Principal, UserProfile>();

  public query ({ caller }) func getCallerUserProfile() : async ?UserProfile {
    if (not (AccessControl.hasPermission(accessControlState, caller, #user))) {
      Runtime.trap("Unauthorized: Only users can view profiles");
    };
    userProfiles.get(caller);
  };

  public query ({ caller }) func getUserProfile(user : Principal) : async ?UserProfile {
    if (caller != user and not AccessControl.isAdmin(accessControlState, caller)) {
      Runtime.trap("Unauthorized: Can only view your own profile");
    };
    userProfiles.get(user);
  };

  public shared ({ caller }) func saveCallerUserProfile(profile : UserProfile) : async () {
    if (not (AccessControl.hasPermission(accessControlState, caller, #user))) {
      Runtime.trap("Unauthorized: Only users can save profiles");
    };
    userProfiles.add(caller, profile);
  };

  // Contact Messages
  type Message = {
    name : Text;
    phone : Text;
    email : Text;
    message : Text;
  };

  module Message {
    public func compare(message1 : Message, message2 : Message) : Order.Order {
      Text.compare(message1.name, message2.name);
    };
  };

  let messages = Map.empty<Text, Message>();

  // Bookings
  type Booking = {
    name : Text;
    phone : Text;
    address : Text;
    serviceType : Text;
    preferredDate : Int;
    message : Text;
    status : BookingStatus;
  };

  module Booking {
    public func compare(booking1 : Booking, booking2 : Booking) : Order.Order {
      Text.compare(booking1.name, booking2.name);
    };
  };

  type BookingStatus = {
    #pending;
    #confirmed;
    #completed;
    #cancelled;
  };

  let bookings = Map.empty<Text, Booking>();

  // Public function - anyone can submit a booking (including guests)
  public shared ({ caller }) func submitBooking(name : Text, phone : Text, address : Text, serviceType : Text, preferredDate : Int, message : Text) : async () {
    let id = name.concat(phone);
    let booking : Booking = {
      name;
      phone;
      address;
      serviceType;
      preferredDate;
      message;
      status = #pending;
    };
    bookings.add(id, booking);
  };

  // Public function - anyone can submit a contact message (including guests)
  public shared ({ caller }) func submitContactMessage(name : Text, phone : Text, email : Text, message : Text) : async () {
    let messageId = name.concat(phone);
    let contactMessage : Message = {
      name;
      phone;
      email;
      message;
    };
    messages.add(messageId, contactMessage);
  };

  // Admin-only function
  public query ({ caller }) func getAllBookings() : async [Booking] {
    if (not AccessControl.isAdmin(accessControlState, caller)) {
      Runtime.trap("Unauthorized: Only admins can view all bookings");
    };
    bookings.values().toArray().sort();
  };

  // Admin-only function
  public query ({ caller }) func getAllContactMessages() : async [Message] {
    if (not AccessControl.isAdmin(accessControlState, caller)) {
      Runtime.trap("Unauthorized: Only admins can view all contact messages");
    };
    messages.values().toArray().sort();
  };

  // Admin-only function
  public shared ({ caller }) func updateBookingStatus(bookingId : Text, status : BookingStatus) : async () {
    if (not AccessControl.isAdmin(accessControlState, caller)) {
      Runtime.trap("Unauthorized: Only admins can update booking status");
    };
    switch (bookings.get(bookingId)) {
      case (?booking) {
        let updatedBooking : Booking = {
          name = booking.name;
          phone = booking.phone;
          address = booking.address;
          serviceType = booking.serviceType;
          preferredDate = booking.preferredDate;
          message = booking.message;
          status;
        };
        bookings.add(bookingId, updatedBooking);
      };
      case (null) {
        Runtime.trap("Booking not found");
      };
    };
  };

  // Admin-only function
  public shared ({ caller }) func deleteContactMessage(messageId : Text) : async () {
    if (not AccessControl.isAdmin(accessControlState, caller)) {
      Runtime.trap("Unauthorized: Only admins can delete contact messages");
    };
    if (not messages.containsKey(messageId)) {
      Runtime.trap("Message not found");
    };
    messages.remove(messageId);
  };
};
