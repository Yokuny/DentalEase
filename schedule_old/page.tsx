"use client";

// import { useSearchParams } from "next/navigation";

import { CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card";
import DatePickerDemo from "@/components/ui/date-picker";
import Scheduler from "./Scheduler";

const events = [
  // Day 1 (2023-09-04)
  {
    id: 1,
    start: new Date("2023-09-04T09:00:00"),
    end: new Date("2023-09-04T09:30:00"),
    title: "Project Kickoff Meeting",
    href: "/project/meeting/1",
  },
  {
    id: 5,
    start: new Date("2023-08-15T00:00:00"),
    end: new Date("2023-09-07T00:00:00"),
    title: "Strategic Planning Summit",
    href: "/summit/planning",
  },
  {
    id: 2,
    start: new Date("2023-09-04T00:00:00"),
    end: new Date("2023-09-09T00:00:00"),
    title: "Annual Strategy Conference",
    href: "/conference/strategy",
  },
  {
    id: 3,
    start: new Date("2023-09-04T09:30:00"),
    end: new Date("2023-09-04T11:00:00"),
    title: "Networking Breakfast",
    href: "/networking-breakfast",
  },
  {
    id: 4,
    start: new Date("2023-09-04T11:00:00"),
    end: new Date("2023-09-04T12:00:00"),
    title: "Project Review Meeting",
    href: "/project/meeting/2",
  },
  {
    id: 16,
    start: new Date("2023-09-04T12:00:00"),
    end: new Date("2023-09-04T18:00:00"),
    title: "Training 1",
    href: "/training/1",
    isSecondary: true,
  },
  // Day 2 (2023-09-05)
  {
    id: 6,
    start: new Date("2023-09-05T09:00:00"),
    end: new Date("2023-09-05T09:30:00"),
    title: "Creative Workshop",
    href: "/workshop/creative",
  },
  {
    id: 7,
    start: new Date("2023-09-05T09:30:00"),
    end: new Date("2023-09-05T10:30:00"),
    title: "Innovation Seminar",
    href: "/seminar/innovation",
  },
  {
    id: 8,
    start: new Date("2023-09-05T10:30:00"),
    end: new Date("2023-09-05T12:30:00"),
    title: "Product Presentation",
    href: "/presentation/product",
  },
  {
    id: 21,
    start: new Date("2023-09-05T12:30:00"),
    end: new Date("2023-09-05T18:00:00"),
    title: "Advanced Training",
    href: "/training/advanced",
    isSecondary: true,
  },
  // Day 3 (2023-09-06)
  {
    id: 9,
    start: new Date("2023-09-06T09:00:00"),
    end: new Date("2023-09-06T09:30:00"),
    title: "Team Meeting",
    href: "/meeting/team",
  },
  {
    id: 10,
    start: new Date("2023-09-06T09:30:00"),
    end: new Date("2023-09-06T11:30:00"),
    title: "Brainstorming Session",
    href: "/session/brainstorming",
  },
  {
    id: 22,
    start: new Date("2023-09-06T11:30:00"),
    end: new Date("2023-09-06T18:00:00"),
    title: "Team Training",
    href: "/training/team",
    isSecondary: true,
  },
  // Day 4 (2023-09-07)
  {
    id: 12,
    start: new Date("2023-09-07T09:00:00"),
    end: new Date("2023-09-07T09:30:00"),
    title: "Design Workshop",
    href: "/workshop/design",
  },
  {
    id: 13,
    start: new Date("2023-09-07T09:30:00"),
    end: new Date("2023-09-07T11:00:00"),
    title: "Leadership Seminar",
    href: "/seminar/leadership",
  },
  {
    id: 20,
    start: new Date("2023-09-07T11:00:00"),
    end: new Date("2023-09-07T12:30:00"),
    title: "Marketing Presentation",
    href: "/presentation/marketing",
  },
  {
    id: 28,
    start: new Date("2023-09-07T12:30:00"),
    end: new Date("2023-09-07T18:00:00"),
    title: "Team Training",
    href: "/training/team",
    isSecondary: true,
  },
  {
    id: 25,
    start: new Date("2023-09-07T14:00:00"),
    end: new Date("2023-09-07T15:30:00"),
    title: "Afternoon Training",
    href: "/training/afternoon",
    isSecondary: true,
  },
  // Day 5 (2023-09-08)
  {
    id: 14,
    start: new Date("2023-09-08T09:00:00"),
    end: new Date("2023-09-08T09:30:00"),
    title: "Customer Feedback Discussion",
    href: "/discussion/feedback",
  },
  {
    id: 15,
    start: new Date("2023-09-08T09:30:00"),
    end: new Date("2023-09-08T11:30:00"),
    title: "Product Development Workshop",
    href: "/workshop/development",
  },
  {
    id: 23,
    start: new Date("2023-09-08T11:30:00"),
    end: new Date("2023-09-08T17:00:00"),
    title: "Sales Training",
    href: "/training/sales",
    isSecondary: true,
  },
  {
    id: 24,
    start: new Date("2023-09-08T17:00:00"),
    end: new Date("2023-09-08T18:00:00"),
    title: "Retrospective",
    href: "/retrospective",
  },
  // Day 6 (2023-09-09)
  {
    id: 17,
    start: new Date("2023-09-09T09:00:00"),
    end: new Date("2023-09-09T09:30:00"),
    title: "Team Building Activity",
    href: "/activity/team-building",
  },
  {
    id: 18,
    start: new Date("2023-09-09T09:30:00"),
    end: new Date("2023-09-09T10:30:00"),
    title: "Company Meeting",
    href: "/meeting/company",
  },
  {
    id: 19,
    start: new Date("2023-09-09T10:30:00"),
    end: new Date("2023-09-09T12:30:00"),
    title: "Product Launch",
    href: "/launch/product",
  },
  {
    id: 26,
    start: new Date("2023-09-09T12:30:00"),
    end: new Date("2023-09-09T18:00:00"),
    title: "Team Training",
    href: "/training/team",
    isSecondary: true,
  },
  {
    id: 27,
    start: new Date("2023-09-09T14:00:00"),
    end: new Date("2023-09-09T15:30:00"),
    title: "Afternoon Training",
    href: "/training/afternoon",
    isSecondary: true,
  },
];

const Schedule = () => {
  // const searchParams = useSearchParams();
  // const loginParam = searchParams.get("acess");

  return (
    <>
      <CardHeader className="p-3 px-6 flex flex-row justify-between">
        <div className="md:gap-4 gap-1 flex md:flex-row md:items-center flex-col">
          <CardTitle className="text-primaryBlue">Agenda</CardTitle>
          <CardDescription>Horarios agendados</CardDescription>
        </div>
        <div>
          <DatePickerDemo />
        </div>
      </CardHeader>

      <CardContent className="flex items-center justify-center flex-col">
        <div className="w-full">
          <Scheduler
            dates={["2023-09-04", "2023-09-05", "2023-09-06", "2023-09-07", "2023-09-08", "2023-09-09"]}
            events={events}
          />
        </div>
      </CardContent>
      <CardFooter>
        <p>Card Footer</p>
      </CardFooter>
    </>
  );
};

export default Schedule;
