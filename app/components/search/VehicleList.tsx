import { Pagination, trpc } from "@/trpc.ts";
import { useFormContext } from "react-hook-form";
import { combineDateTime, FormValues } from "@/components/search/form.tsx";
import { Button } from "@/components/ui/button.tsx";
import { useMemo } from "react";
import { VehicleItem } from "./VehicleItem.tsx";
import { useNavigate } from "react-router-dom";

function PaginationButtons({ data }: { data: Pagination }) {
  const form = useFormContext<FormValues>();
  const page = form.watch("page");

  return (
    <div className="flex justify-center mt-6">
      <Button
        variant="link"
        onClick={() => form.setValue("page", page - 1)}
        disabled={page === 1}
      >
        Previous
      </Button>
      <Button
        variant="link"
        onClick={() => form.setValue("page", page + 1)}
        disabled={page === data.totalPages}
      >
        Next
      </Button>
    </div>
  );
}

export function VehicleList() {
  const navigate = useNavigate();

  const form = useFormContext<FormValues>();
  const startDate = form.watch("startDate");
  const startTime = form.watch("startTime");
  const endDate = form.watch("endDate");
  const endTime = form.watch("endTime");
  const minPassengers = form.watch("minPassengers");
  const classification = form.watch("classification");
  const make = form.watch("make");
  const price = form.watch("price");
  const page = form.watch("page");

  const startDateTime = useMemo(
    () => combineDateTime(startDate, startTime),
    [startDate, startTime],
  );
  const endDateTime = useMemo(
    () => combineDateTime(endDate, endTime),
    [endDate, endTime],
  );

  const [searchResponse] = trpc.vehicles.search.useSuspenseQuery(
    {
      startTime: startDateTime.toISOString(),
      endTime: endDateTime.toISOString(),
      page: Number(page),
      passengerCount: Number(minPassengers),
      classification: classification,
      make: make,
      priceMin: price[0],
      priceMax: price[1],
    },
    {
      keepPreviousData: true,
    },
  );

  const handleReserve = (vehicleId: string) => {
    const bookNowParams = new URLSearchParams({
      id: vehicleId,
      start: startDateTime.toISOString(),
      end: endDateTime.toISOString(),
    });

    navigate(`/review?${bookNowParams.toString()}`);
  };

  if (searchResponse.vehicles.length === 0) {
    return (
      <div className="flex justify-center items-center h-32">
        <p className="text-muted-foreground">
          No vehicles found. Try adjusting your search criteria.
        </p>
      </div>
    );
  }

  return (
    <div>
      <ul className="space-y-4">
        {searchResponse.vehicles.map((vehicle) => {
          return (
            <VehicleItem
              key={vehicle.id}
              thumbnailUrl={vehicle.thumbnail_url}
              make={vehicle.make}
              model={vehicle.model}
              year={vehicle.year}
              classification={vehicle.classification}
              hourlyRateCents={vehicle.hourly_rate_cents}
              maxPassengers={vehicle.max_passengers}
              onReserve={() => handleReserve(vehicle.id)}
            />
          );
        })}
      </ul>
      <PaginationButtons data={searchResponse.pagination} />
    </div>
  );
}
