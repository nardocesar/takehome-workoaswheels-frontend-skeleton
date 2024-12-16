import { Button } from "@/components/ui/button";

type VehicleItemProps = {
  thumbnailUrl: string;
  make: string;
  model: string;
  year: number;
  classification: string;
  hourlyRateCents: number;
  maxPassengers: number;
  onReserve: () => void;
};

export const VehicleItem: React.FC<VehicleItemProps> = ({
  thumbnailUrl,
  make,
  model,
  year,
  classification,
  hourlyRateCents,
  maxPassengers,
  onReserve,
}) => {
  return (
    <div className="p-4 border rounded-lg shadow-md hover:shadow-lg transition bg-white flex flex-col sm:flex-row sm:items-center gap-8">
      <img
        src={thumbnailUrl ?? "/placeholder.jpg"}
        alt={`${make} ${model}`}
        className="w-full sm:w-48 h-48 object-cover rounded-md"
      />
      <div className="flex-1">
        <h2 className="text-lg font-semibold text-gray-900">
          {make} {model}
        </h2>
        <p className="text-sm text-gray-500">Year: {year}</p>
        <p className="text-sm text-gray-500">
          Classification: {classification}
        </p>
        <p className="text-md font-bold text-gray-800 mt-2">
          ${hourlyRateCents / 100}/hr
        </p>
        <p className="text-sm text-gray-600">
          Seats: {maxPassengers} passengers
        </p>
        <Button
          onClick={onReserve}
          className="btn btn-primary mt-4 w-full py-2"
        >
          Book Now
        </Button>
      </div>
    </div>
  );
};
