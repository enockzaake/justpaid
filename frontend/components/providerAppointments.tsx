import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";

import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import {
  DropdownMenu,
  DropdownMenuCheckboxItem,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { providerAppointments } from "@/actions/providers";
import { CalendarArrowDown, Copy, Ellipsis, ListFilter } from "lucide-react";
import { Input } from "./ui/input";

export default async function ListProviderAppointments() {
  const { data, error } = await providerAppointments();
  if (error) return <div className="">Error getting appointments</div>;

  return (
    <Card className="">
      <CardHeader>
        <CardTitle>Appointments</CardTitle>
      </CardHeader>
      <CardContent>
        <Table>
          <TableHeader>
            <TableRow>
              <TableHead>Client</TableHead>
              <TableHead className="hidden md:table-cell">
                Date
                <DropdownMenu>
                  <DropdownMenuTrigger asChild>
                    <Button variant="outline" size="sm" className="h-6 gap-1">
                      <CalendarArrowDown className="h-3.5 w-3.5" />
                    </Button>
                  </DropdownMenuTrigger>
                  <DropdownMenuContent align="end">
                    <Input type="date" />
                  </DropdownMenuContent>
                </DropdownMenu>
              </TableHead>
              <TableHead className="hidden sm:table-cell">Time</TableHead>

              <TableHead className="hidden sm:table-cell">
                Status{" "}
                <DropdownMenu>
                  <DropdownMenuTrigger asChild>
                    <Button variant="outline" size="sm" className="h-6 gap-1">
                      <ListFilter className="h-3.5 w-3.5" />
                    </Button>
                  </DropdownMenuTrigger>
                  <DropdownMenuContent align="end">
                    <DropdownMenuLabel>Filter by</DropdownMenuLabel>
                    <DropdownMenuSeparator />
                    <DropdownMenuCheckboxItem checked>
                      Active
                    </DropdownMenuCheckboxItem>
                    <DropdownMenuCheckboxItem>Draft</DropdownMenuCheckboxItem>
                    <DropdownMenuCheckboxItem>
                      Archived
                    </DropdownMenuCheckboxItem>
                  </DropdownMenuContent>
                </DropdownMenu>
              </TableHead>

              <TableHead className="text-right">Appointment link</TableHead>
              <TableHead className="text-right">Action</TableHead>
            </TableRow>
          </TableHeader>
          <TableBody>
            {data.appointments.map((appointment: any, index: number) => (
              <TableRow key={index} className="bg-accent">
                <TableCell>
                  <div className="font-medium">
                    {" "}
                    {`${appointment.client.first_name} ${appointment.client.last_name}`}
                  </div>
                  <div className="hidden text-sm text-muted-foreground md:inline">
                    {appointment.client.email}
                  </div>
                </TableCell>
                <TableCell className="hidden md:table-cell">
                  {(appointment.date_time as string).split("T")[0]}
                </TableCell>
                <TableCell className="hidden sm:table-cell">
                  {" "}
                  {(appointment.date_time as string).split("T")[1]}{" "}
                </TableCell>

                <TableCell className="hidden sm:table-cell">
                  <Badge
                    className={`text-xs ${
                      appointment.status === "pending"
                        ? "bg-amber-400 hover:bg-amber-500"
                        : appointment.status === "past"
                        ? "bg-emerald-100 hover:bg-emerald-200"
                        : ""
                    }`}
                    variant="secondary"
                  >
                    {appointment.status}
                  </Badge>
                </TableCell>

                <TableCell className="text-right">
                  <div className="flex justify-end gap-2">
                    <Copy
                      className="hover:cursor-pointer"
                      size={16}
                      strokeWidth={1}
                    />
                    http://localhost:3000/provider/dashboard
                  </div>
                </TableCell>
                <TableCell className="flex justify-end cursor-pointer hover:text-black">
                  <Ellipsis />
                </TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </CardContent>
      <CardFooter>
        <div className="text-xs text-muted-foreground">
          Showing <strong>1-10</strong> of <strong>32</strong> products
        </div>
      </CardFooter>
    </Card>
  );
}
