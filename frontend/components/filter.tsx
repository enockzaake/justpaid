import React from "react";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { Card, CardContent } from "@/components/ui/card";
import { Input } from "./ui/input";

function Filters() {
  return (
    <Card className="hidden md:block overflow-hidden max-h-[450px] fixed right-12">
      <CardContent className="p-6 text-sm">
        <div className="grid gap-3">
          {/* Category Filter */}
          <div className="font-semibold">Category</div>
          <Select>
            <SelectTrigger>
              <SelectValue placeholder="Choose category" />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="all">All</SelectItem>
              <SelectItem value="music">Music</SelectItem>
              <SelectItem value="business">Business & Industry</SelectItem>
              <SelectItem value="health">Health & Wellness</SelectItem>
            </SelectContent>
          </Select>

          {/* Type Filter */}
          <div className="font-semibold">Type</div>
          <Select>
            <SelectTrigger>
              <SelectValue placeholder="Choose type" />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="all">All</SelectItem>
              <SelectItem value="small">Individual</SelectItem>
              <SelectItem value="medium">Company</SelectItem>
            </SelectContent>
          </Select>

          {/* Location Filter */}
          <div className="font-semibold">Location</div>
          <div className="grid grid-cols-4">
            <Input
              className="col-span-3 rounded-e-none"
              placeholder="Search a location"
            />
            <Select>
              <SelectTrigger className="col-span-1 rounded-s-none">
                <SelectValue placeholder="" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="5km">{"< "}5 km</SelectItem>
                <SelectItem value="10km">{"< "} 10 km</SelectItem>
                <SelectItem value="15km">{"< "} 15 km</SelectItem>
                <SelectItem value="30km">{"< "}30 km</SelectItem>
                <SelectItem value="50km">{"< "}50 km</SelectItem>
                <SelectItem value="100km">{"< "}100 km</SelectItem>
              </SelectContent>
            </Select>
          </div>

          {/* Rating Filter */}
          <div className="font-semibold">Rating</div>
          <Select>
            <SelectTrigger>
              <SelectValue placeholder="Choose rating" />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="all">All</SelectItem>
              <SelectItem value="1">1 star</SelectItem>
              <SelectItem value="2">2 stars</SelectItem>
              <SelectItem value="3">3 stars</SelectItem>
              <SelectItem value="4">4 stars</SelectItem>
              <SelectItem value="5">5 stars</SelectItem>
            </SelectContent>
          </Select>

          {/* Speciality Filter */}
          <div className="font-semibold">Speciality</div>
          <Select>
            <SelectTrigger>
              <SelectValue placeholder="Choose speciality" />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="all">All</SelectItem>
              <SelectItem value="finance">Finance</SelectItem>
              <SelectItem value="healthcare">Healthcare</SelectItem>
              <SelectItem value="education">Education</SelectItem>
            </SelectContent>
          </Select>
        </div>
      </CardContent>
    </Card>
  );
}

export default Filters;
