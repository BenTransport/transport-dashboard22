import { Tooltip, Chip } from "@nextui-org/react";
import React from "react";
import { DeleteIcon } from "../icons/table/delete-icon";
import { EyeIcon } from "../icons/table/eye-icon";
import { toast } from "sonner";
import { deleteBooking } from "@/actions/booking.action";
import UserModal from "./booking-modal";

interface Props {
  item: any;
  columnKey: string | React.Key;
}

export const RenderCell = ({ item, columnKey }: Props) => {
  const handleDeleteBooking = async () => {
    toast.promise(
      deleteBooking(item._id).then((result) => {
        if (result.error) {
          throw new Error(result.error);
        }
        return result;
      }),
      {
        loading: "Deleting...",
        success: "Booking deleted successfully!",
        error: "Error deleting booking.",
      }
    );
  };

  switch (columnKey) {
    case "name":
      return <div className="capitalize">{item.userInfo.name}</div>;

    case "phone":
      return <div>{item.userInfo.phone}</div>;

    case "date":
      return <div>{item.userInfo.date}</div>;

    case "time":
      return <div>{item.userInfo.time}</div>;

    case "totalCost":
      return (
        <div className="font-semibold text-green-600">
          {item.totalCost.toFixed(2)} SEK
          {item.isWorking && (
            <span className="text-sm text-gray-500"> (50% off applied)</span>
          )}
        </div>
      );

    case "selectedServices":
      return (
        <div className="flex flex-wrap gap-2">
          {item.selectedServices.map((service: any, index: number) => (
            <Chip
              key={index}
              size="sm"
              variant="flat"
              color={
                service.id === "cleaning"
                  ? "success"
                  : service.id === "transport"
                    ? "primary"
                    : "warning"
              }
            >
              {service.name}
            </Chip>
          ))}
        </div>
      );

    case "actions":
      return (
        <div className="flex items-center gap-4">
          <div>
            <Tooltip content="Details">
              <UserModal
                button={<EyeIcon size={20} fill="#979797" />}
                mode="View"
                data={item}
              />
            </Tooltip>
          </div>
          <Tooltip content="Delete booking" color="danger">
            <UserModal
              button={<DeleteIcon size={20} fill="#FF0080" />}
              mode="Delete"
              data={item}
              onConfirm={handleDeleteBooking}
            />
          </Tooltip>
        </div>
      );

    default:
      return <div>{item[columnKey]}</div>;
  }
};
