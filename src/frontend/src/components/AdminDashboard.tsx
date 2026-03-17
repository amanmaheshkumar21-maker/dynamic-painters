import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Principal } from "@icp-sdk/core/principal";
import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";
import { Loader2, RefreshCw, Trash2, UserCog } from "lucide-react";
import { useState } from "react";
import { toast } from "sonner";
import { BookingStatus, UserRole } from "../backend";
import type { Booking, Message } from "../backend.d";
import { useActor } from "../hooks/useActor";

const statusColors: Record<string, string> = {
  pending: "bg-yellow-100 text-yellow-800 border-yellow-200",
  confirmed: "bg-blue-100 text-blue-800 border-blue-200",
  completed: "bg-green-100 text-green-800 border-green-200",
  cancelled: "bg-red-100 text-red-800 border-red-200",
};

function formatDate(ms: bigint) {
  return new Date(Number(ms)).toLocaleDateString("en-IN", {
    year: "numeric",
    month: "short",
    day: "numeric",
  });
}

export default function AdminDashboard() {
  const { actor, isFetching } = useActor();
  const queryClient = useQueryClient();
  const [adminPrincipal, setAdminPrincipal] = useState("");
  const [assigningRole, setAssigningRole] = useState(false);

  const bookingsQuery = useQuery<Booking[]>({
    queryKey: ["admin", "bookings"],
    queryFn: async () => {
      if (!actor) return [];
      return actor.getAllBookings();
    },
    enabled: !!actor && !isFetching,
  });

  const messagesQuery = useQuery<Message[]>({
    queryKey: ["admin", "messages"],
    queryFn: async () => {
      if (!actor) return [];
      return actor.getAllContactMessages();
    },
    enabled: !!actor && !isFetching,
  });

  const updateStatusMutation = useMutation({
    mutationFn: async ({
      bookingId,
      status,
    }: { bookingId: string; status: BookingStatus }) => {
      if (!actor) throw new Error("No actor");
      await actor.updateBookingStatus(bookingId, status);
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["admin", "bookings"] });
      toast.success("Status updated");
    },
    onError: () => toast.error("Failed to update status"),
  });

  const deleteMessageMutation = useMutation({
    mutationFn: async (messageId: string) => {
      if (!actor) throw new Error("No actor");
      await actor.deleteContactMessage(messageId);
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["admin", "messages"] });
      toast.success("Message deleted");
    },
    onError: () => toast.error("Failed to delete message"),
  });

  const handleAssignAdmin = async () => {
    if (!actor || !adminPrincipal.trim()) return;
    setAssigningRole(true);
    try {
      const principal = Principal.fromText(adminPrincipal.trim());
      await actor.assignCallerUserRole(principal, UserRole.admin);
      toast.success("Admin role assigned successfully");
      setAdminPrincipal("");
    } catch {
      toast.error("Invalid principal or failed to assign role");
    } finally {
      setAssigningRole(false);
    }
  };

  return (
    <div className="space-y-6">
      <div>
        <h1 className="text-3xl font-display font-bold text-brand-navy">
          Admin Dashboard
        </h1>
        <p className="text-muted-foreground mt-1">
          Manage bookings, messages, and user roles.
        </p>
      </div>

      <div className="bg-white border border-border rounded-xl p-5 flex flex-col sm:flex-row gap-4 items-start sm:items-end">
        <div className="flex-1 space-y-2">
          <Label
            htmlFor="assign-principal"
            className="text-sm font-medium text-brand-navy flex items-center gap-2"
          >
            <UserCog className="w-4 h-4" /> Assign Admin Role
          </Label>
          <Input
            id="assign-principal"
            placeholder="Enter Principal ID"
            value={adminPrincipal}
            onChange={(e) => setAdminPrincipal(e.target.value)}
            data-ocid="admin.input"
          />
        </div>
        <Button
          type="button"
          onClick={handleAssignAdmin}
          disabled={assigningRole || !adminPrincipal.trim()}
          className="bg-brand-navy hover:bg-brand-navy-dark text-white"
          data-ocid="admin.submit_button"
        >
          {assigningRole ? (
            <Loader2 className="w-4 h-4 animate-spin mr-2" />
          ) : null}
          Assign Role
        </Button>
      </div>

      <Tabs defaultValue="bookings" data-ocid="admin.tab">
        <TabsList className="mb-4">
          <TabsTrigger value="bookings" data-ocid="admin.bookings.tab">
            Bookings{" "}
            {bookingsQuery.data ? `(${bookingsQuery.data.length})` : ""}
          </TabsTrigger>
          <TabsTrigger value="messages" data-ocid="admin.messages.tab">
            Messages{" "}
            {messagesQuery.data ? `(${messagesQuery.data.length})` : ""}
          </TabsTrigger>
        </TabsList>

        <TabsContent value="bookings">
          <div className="bg-white border border-border rounded-xl overflow-hidden">
            <div className="flex items-center justify-between px-5 py-4 border-b border-border">
              <h2 className="font-display font-semibold text-brand-navy">
                All Bookings
              </h2>
              <Button
                type="button"
                variant="outline"
                size="sm"
                onClick={() =>
                  queryClient.invalidateQueries({
                    queryKey: ["admin", "bookings"],
                  })
                }
              >
                <RefreshCw className="w-4 h-4" />
              </Button>
            </div>
            {bookingsQuery.isLoading ? (
              <div
                className="flex items-center justify-center py-12"
                data-ocid="admin.bookings.loading_state"
              >
                <Loader2 className="w-6 h-6 animate-spin text-brand-navy" />
              </div>
            ) : !bookingsQuery.data?.length ? (
              <div
                className="text-center py-12 text-muted-foreground"
                data-ocid="admin.bookings.empty_state"
              >
                No bookings yet.
              </div>
            ) : (
              <div className="overflow-x-auto" data-ocid="admin.bookings.table">
                <Table>
                  <TableHeader>
                    <TableRow>
                      <TableHead>#</TableHead>
                      <TableHead>Name</TableHead>
                      <TableHead>Phone</TableHead>
                      <TableHead>Address</TableHead>
                      <TableHead>Service</TableHead>
                      <TableHead>Date</TableHead>
                      <TableHead>Status</TableHead>
                      <TableHead>Actions</TableHead>
                    </TableRow>
                  </TableHeader>
                  <TableBody>
                    {bookingsQuery.data.map((booking, idx) => (
                      <TableRow
                        key={`booking-${booking.name}-${booking.phone}-${idx}`}
                        data-ocid={`admin.bookings.row.${idx + 1}`}
                      >
                        <TableCell className="text-muted-foreground">
                          {idx + 1}
                        </TableCell>
                        <TableCell className="font-medium">
                          {booking.name}
                        </TableCell>
                        <TableCell>{booking.phone}</TableCell>
                        <TableCell className="max-w-32 truncate">
                          {booking.address}
                        </TableCell>
                        <TableCell>{booking.serviceType}</TableCell>
                        <TableCell>
                          {formatDate(booking.preferredDate)}
                        </TableCell>
                        <TableCell>
                          <Badge
                            className={`${statusColors[booking.status] ?? ""} border text-xs`}
                          >
                            {booking.status}
                          </Badge>
                        </TableCell>
                        <TableCell>
                          <Select
                            value={booking.status}
                            onValueChange={(val) =>
                              updateStatusMutation.mutate({
                                bookingId: String(idx),
                                status: val as BookingStatus,
                              })
                            }
                          >
                            <SelectTrigger
                              className="w-32 h-8 text-xs"
                              data-ocid={`admin.bookings.select.${idx + 1}`}
                            >
                              <SelectValue />
                            </SelectTrigger>
                            <SelectContent>
                              {Object.values(BookingStatus).map((s) => (
                                <SelectItem
                                  key={s}
                                  value={s}
                                  className="text-xs"
                                >
                                  {s}
                                </SelectItem>
                              ))}
                            </SelectContent>
                          </Select>
                        </TableCell>
                      </TableRow>
                    ))}
                  </TableBody>
                </Table>
              </div>
            )}
          </div>
        </TabsContent>

        <TabsContent value="messages">
          <div className="bg-white border border-border rounded-xl overflow-hidden">
            <div className="flex items-center justify-between px-5 py-4 border-b border-border">
              <h2 className="font-display font-semibold text-brand-navy">
                Contact Messages
              </h2>
              <Button
                type="button"
                variant="outline"
                size="sm"
                onClick={() =>
                  queryClient.invalidateQueries({
                    queryKey: ["admin", "messages"],
                  })
                }
              >
                <RefreshCw className="w-4 h-4" />
              </Button>
            </div>
            {messagesQuery.isLoading ? (
              <div
                className="flex items-center justify-center py-12"
                data-ocid="admin.messages.loading_state"
              >
                <Loader2 className="w-6 h-6 animate-spin text-brand-navy" />
              </div>
            ) : !messagesQuery.data?.length ? (
              <div
                className="text-center py-12 text-muted-foreground"
                data-ocid="admin.messages.empty_state"
              >
                No messages yet.
              </div>
            ) : (
              <div className="overflow-x-auto" data-ocid="admin.messages.table">
                <Table>
                  <TableHeader>
                    <TableRow>
                      <TableHead>#</TableHead>
                      <TableHead>Name</TableHead>
                      <TableHead>Phone</TableHead>
                      <TableHead>Email</TableHead>
                      <TableHead>Message</TableHead>
                      <TableHead>Actions</TableHead>
                    </TableRow>
                  </TableHeader>
                  <TableBody>
                    {messagesQuery.data.map((msg, idx) => (
                      <TableRow
                        key={`msg-${msg.name}-${msg.phone}-${idx}`}
                        data-ocid={`admin.messages.row.${idx + 1}`}
                      >
                        <TableCell className="text-muted-foreground">
                          {idx + 1}
                        </TableCell>
                        <TableCell className="font-medium">
                          {msg.name}
                        </TableCell>
                        <TableCell>{msg.phone}</TableCell>
                        <TableCell>{msg.email}</TableCell>
                        <TableCell className="max-w-48 truncate text-sm text-muted-foreground">
                          {msg.message}
                        </TableCell>
                        <TableCell>
                          <Button
                            type="button"
                            variant="ghost"
                            size="sm"
                            onClick={() =>
                              deleteMessageMutation.mutate(String(idx))
                            }
                            disabled={deleteMessageMutation.isPending}
                            className="text-destructive hover:text-destructive"
                            data-ocid={`admin.messages.delete_button.${idx + 1}`}
                          >
                            <Trash2 className="w-4 h-4" />
                          </Button>
                        </TableCell>
                      </TableRow>
                    ))}
                  </TableBody>
                </Table>
              </div>
            )}
          </div>
        </TabsContent>
      </Tabs>
    </div>
  );
}
