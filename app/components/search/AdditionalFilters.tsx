import { useFormContext } from "react-hook-form";
import { trpc } from "@/trpc";
import { FormValues } from "./form";
import { Button } from "../ui/button";
import { FormControl, FormField, FormItem, FormLabel } from "../ui/form";
import { Input } from "../ui/input";
import { Popover, PopoverContent, PopoverTrigger } from "../ui/popover";
import { cn } from "@/lib/classnames";
import { ChevronDown } from "lucide-react";
import { Checkbox } from "../ui/checkbox";
import { Label } from "../ui/label";

export const AdditionalFilters = () => {
  const { control, reset, getValues, setValue, watch } =
    useFormContext<FormValues>();
  const { data: options } = trpc.vehicles.options.useQuery();

  const handleChangeValue = (
    value: string,
    field: keyof Pick<FormValues, "make" | "classification">,
  ) => {
    const values = getValues(field);
    const newValues = values.includes(value)
      ? values.filter((c) => c !== value)
      : [...values, value];

    setValue(field, newValues);
  };

  const classifications = watch("classification");
  const makes = watch("make");

  return (
    <div className="space-y-4">
      {/* Hourly Rate */}
      <FormField
        control={control}
        name="price"
        render={({ field }) => (
          <FormItem>
            <FormLabel>Hourly Rate ($)</FormLabel>
            <div className="flex gap-4">
              <FormControl>
                <Input
                  {...field}
                  type="number"
                  placeholder="Min"
                  onChange={(e) =>
                    field.onChange([+e.target.value, field.value[1]])
                  }
                  value={field.value[0]}
                />
              </FormControl>
              <FormControl>
                <Input
                  {...field}
                  type="number"
                  placeholder="Max"
                  onChange={(e) =>
                    field.onChange([field.value[0], +e.target.value])
                  }
                  value={field.value[1]}
                />
              </FormControl>
            </div>
          </FormItem>
        )}
      />

      {/* Maximum Passengers */}
      <FormField
        control={control}
        name="minPassengers"
        render={({ field }) => (
          <FormItem>
            <FormLabel>Min. passengers</FormLabel>
            <FormControl>
              <Input
                {...field}
                type="number"
                placeholder="Min"
                onChange={field.onChange}
                value={field.value}
              />
            </FormControl>
          </FormItem>
        )}
      />

      {/* Vehicle Classification */}
      <FormField
        control={control}
        name="classification"
        render={({ field }) => (
          <FormItem>
            <FormLabel>Classification</FormLabel>

            <FormControl>
              <Popover>
                <PopoverTrigger asChild>
                  <FormControl>
                    <Button
                      variant="outline"
                      className={cn(
                        "flex w-full gap-4 pl-3 text-left font-normal",
                        classifications.length === 0 && "text-muted-foreground",
                      )}
                    >
                      {classifications.length > 0
                        ? field.value.join(", ")
                        : "All"}
                      <ChevronDown className="ml-auto h-4 w-4 opacity-50" />
                    </Button>
                  </FormControl>
                </PopoverTrigger>
                <PopoverContent className="flex flex-col gap-2 w-[--radix-popover-trigger-width] max-h-[--radix-popover-content-available-height] break-normal">
                  {options?.classifications.map((classification) => (
                    <div
                      className="flex flex-1 items-center space-x-2"
                      key={classification}
                    >
                      <Checkbox
                        id={classification}
                        checked={
                          classifications.length === 0 ||
                          classifications.includes(classification)
                        }
                        onCheckedChange={() => {
                          handleChangeValue(classification, "classification");
                        }}
                      />
                      <Label htmlFor={classification} className="font-normal">
                        {classification}
                      </Label>
                    </div>
                  ))}
                </PopoverContent>
              </Popover>
            </FormControl>
          </FormItem>
        )}
      />

      {/* Vehicle Make */}
      <FormField
        control={control}
        name="make"
        render={({ field }) => (
          <FormItem>
            <FormLabel>Classification</FormLabel>

            <FormControl>
              <Popover>
                <PopoverTrigger asChild>
                  <FormControl>
                    <Button
                      variant="outline"
                      className={cn(
                        "flex w-full gap-4 pl-3 text-left font-normal",
                        makes.length === 0 && "text-muted-foreground",
                      )}
                    >
                      {makes.length > 0 ? field.value.join(", ") : "All"}
                      <ChevronDown className="ml-auto h-4 w-4 opacity-50" />
                    </Button>
                  </FormControl>
                </PopoverTrigger>
                <PopoverContent className="flex flex-col gap-2 w-[--radix-popover-trigger-width] max-h-[--radix-popover-content-available-height] break-normal">
                  {options?.makes.map((make) => (
                    <div
                      className="flex flex-1 items-center space-x-2"
                      key={make}
                    >
                      <Checkbox
                        id={make}
                        checked={makes.length === 0 || makes.includes(make)}
                        onCheckedChange={() => {
                          handleChangeValue(make, "make");
                        }}
                      />
                      <Label htmlFor={make} className="font-normal">
                        {make}
                      </Label>
                    </div>
                  ))}
                </PopoverContent>
              </Popover>
            </FormControl>
          </FormItem>
        )}
      />

      {/* Action Buttons */}
      <div className="flex justify-end">
        <Button type="button" variant="outline" onClick={() => reset()}>
          Reset filters
        </Button>
      </div>
    </div>
  );
};
