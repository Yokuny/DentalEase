import { Button } from "@/components/ui/button";
import { ScrollArea } from "@/components/ui/scroll-area";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";

export const availableTimes = [
  { 12: "6:00am", 24: "06:00" },
  { 12: "6:30am", 24: "06:30" },
  { 12: "7:00am", 24: "07:00" },
  { 12: "7:30am", 24: "07:30" },
  { 12: "8:00am", 24: "08:00" },
  { 12: "8:30am", 24: "08:30" },
  { 12: "9:00am", 24: "09:00" },
  { 12: "9:30am", 24: "09:30" },
  { 12: "10:00am", 24: "10:00" },
  { 12: "10:30am", 24: "10:30" },
  { 12: "11:00am", 24: "11:00" },
  { 12: "11:30am", 24: "11:30" },
  { 12: "12:00pm", 24: "12:00" },
  { 12: "12:30pm", 24: "12:30" },
  { 12: "1:00pm", 24: "13:00" },
  { 12: "1:30pm", 24: "13:30" },
  { 12: "2:00pm", 24: "14:00" },
  { 12: "2:30pm", 24: "14:30" },
  { 12: "3:00pm", 24: "15:00" },
  { 12: "3:30pm", 24: "15:30" },
  { 12: "4:00pm", 24: "16:00" },
  { 12: "4:30pm", 24: "16:30" },
  { 12: "5:00pm", 24: "17:00" },
  { 12: "5:30pm", 24: "17:30" },
  { 12: "6:00pm", 24: "18:00" },
  { 12: "6:30pm", 24: "18:30" },
  { 12: "7:00pm", 24: "19:00" },
  { 12: "7:30pm", 24: "19:30" },
  { 12: "8:00pm", 24: "20:00" },
];

type RightPanelProps = {
  day: Date | undefined;
  handleDate: (time: Date) => void;
};

const TimePicker = ({ day, handleDate }: RightPanelProps) => {
  const today = new Date();
  today.setDate(today.getDate() - 1);

  const handleStartDate = (time: string) => {
    if (!day) return;
    const [hour, minute] = time.split(":");
    const selectedTime = new Date(0, 0, 0, parseInt(hour), parseInt(minute), 0);

    const selectedDate = new Date(day);
    selectedDate.setHours(selectedTime.getHours(), selectedTime.getMinutes());

    handleDate(selectedDate);
  };

  return (
    <Tabs defaultValue="12" className="flex flex-col gap-2 w-[220px] pl-6">
      <div className="justify-between items-center flex">
        <div className="h-8 text-md font-bold dark:text-slate-300 text-slate-600 gap-1 items-center flex">
          <span>{day?.getDate()}</span>
          <span className="text-slate-600/70 dark:text-slate-300/70">
            {day?.toLocaleString("default", { weekday: "short" })}
          </span>
        </div>
        <div className="items-center flex">
          <TabsList className="grid w-fit h-auto grid-cols-2 border rounded-lg">
            <TabsTrigger value="12">12h</TabsTrigger>
            <TabsTrigger value="24">24h</TabsTrigger>
          </TabsList>
        </div>
      </div>
      {["12", "24"].map((time) => (
        <TabsContent key={time} value={time}>
          <ScrollArea className="h-[300px]">
            <div className="grid gap-2 pr-3">
              {availableTimes.map((availableTime) => (
                <Button
                  variant="link"
                  disabled={day == undefined ? true : day >= today ? false : true}
                  className="font-mono border bg-transparent dark:bg-transparent hover:bg-slate-50 dark:hover:bg-slate-700 font-normal text-slate-700 dark:text-slate-200 hover:no-underline"
                  onClick={() => handleStartDate(availableTime[24])}
                  key={availableTime[time as "12" | "24"]}>
                  {availableTime[time as "12" | "24"]}
                </Button>
              ))}
            </div>
          </ScrollArea>
        </TabsContent>
      ))}
    </Tabs>
  );
};

export default TimePicker;
