import { Tooltip, Chip } from "@nextui-org/react";
import React from "react";
import { DeleteIcon } from "../icons/table/delete-icon";
import { EyeIcon } from "../icons/table/eye-icon";
import UserModal from "./offer-modal";
import { toast } from "sonner";
import { deletePartner } from "@/actions/partner.action";
import { deleteOffer } from "@/actions/offer.action";
import { SquarePlus } from "lucide-react";

interface Props {
  item: any;
  isAdmin?: boolean

  columnKey: string | React.Key;
}

export const RenderCell = ({ item, columnKey, isAdmin }: Props) => {
  console.log("🚀 ~ RenderCell ~ item:", item)
  const cellValue = item[columnKey as keyof any];


  // const calculateTotal = () => {
  //   let total = 0;
  //   selectedServices.forEach((service) => {
  //     if (service.id === 'transport') {
  //       total += (service.distance || 0) * pricing.transport.ratePerKm;

  //     }
  //     if (service.id === 'helper') {
  //       total += (service.helpers || 0) * (service.hours || 0) * pricing.helper.ratePerHelperPerHour;
  //     }
  //     if (service.id === 'cleaning') {
  //       total += (service.area || 0) * pricing.cleaning.ratePerSqFt;
  //       if (service.cleaners) {
  //         total += (service.cleaners || 0) * pricing.cleaning.ratePerCleaner;
  //       }
  //     }
  //   });
  //   if (isWorking) {
  //     total = total * 0.5; // Apply 50% discount
  //   }
  //   setTotalCost(total);
  // };

  const handleDeleteUser = async () => {
    toast.promise(
      deleteOffer(item._id).then((result) => {
        if (result.error) {
          throw new Error(result.error); // Manually throw an error if one is present
        }
        return result; // Return the result if no error
      }),
      {
        loading: "Deleting...",
        success: "deleted successfully!",
        error: "Error deleting.",
      }
    );
  };
  switch (columnKey) {
    case "email":
      return <div className="">{cellValue}</div>;

    case "name":
      return <div className="capitalize">{cellValue}</div>;
    case "frequency":
      return <div className="capitalize">{cellValue.split("_").join(" ")}</div>;
    case "workBasis":
      return <div className="capitalize">{cellValue.split("_").join(" ")}</div>;

    case "services":
      return (
        <div className="flex gap-1">
          {

            item.services.map((item: any, index: number) => (
              <>
                <Chip
                  key={index}
                  size="sm"
                  variant="flat"
                  color={
                    item == "Cleaning"
                      ? "success"
                      : item == "Transport" ? "primary"

                        : "warning"
                  }
                >
                  <span className="text-xs">{item}</span>
                </Chip >

              </>

            ))
          }
        </div >
      );

    case "actions":
      return (
        <div className="flex items-center gap-4">



          <>
            <div>
              <Tooltip content="Details">
                <UserModal
                  button={<SquarePlus size={20} className="text-green-700" />}
                  mode="upgrade"
                  data={item}
                />
              </Tooltip>
            </div>
            <div>
              <Tooltip content="Details">
                <UserModal
                  button={<EyeIcon size={20} fill="#979797" />}
                  mode="View"
                  data={item}
                />
              </Tooltip>
            </div>

            <div>
              <Tooltip content="Delete user" color="danger">
                <UserModal
                  button={<DeleteIcon size={20} fill="#FF0080" />}
                  mode="Delete"
                  data={item}
                  onConfirm={handleDeleteUser}
                />
              </Tooltip>
            </div>

          </>
        </div>
      );

    default:
      return <div>{cellValue}</div>;
  }
};
