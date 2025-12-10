// Month interface and constant
export interface Month {
  name: string;
  value: number;
}

export const MONTHS: Month[] = [
  { name: "Jan", value: 1 },
  { name: "Feb", value: 2 },
  { name: "Mar", value: 3 },
  { name: "Apr", value: 4 },
  { name: "May", value: 5 },
  { name: "Jun", value: 6 },
  { name: "Jul", value: 7 },
  { name: "Aug", value: 8 },
  { name: "Sep", value: 9 },
  { name: "Oct", value: 10 },
  { name: "Nov", value: 11 },
  { name: "Dec", value: 12 },
];

// Helper function to get month name by value
export const getMonthName = (monthValue: number): string => {
  const month = MONTHS.find((m) => m.value === monthValue);
  return month ? month.name : "";
};

// Helper function to get month value by name
export const getMonthValue = (monthName: string): number => {
  const month = MONTHS.find((m) => m.name.toLowerCase() === monthName.toLowerCase());
  return month ? month.value : 0;
};
