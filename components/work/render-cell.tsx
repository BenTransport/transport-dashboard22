import { Tooltip, Chip } from "@nextui-org/react";
import React from "react";
import { DeleteIcon } from "../icons/table/delete-icon";
import { EditIcon } from "../icons/table/edit-icon";
import { EyeIcon } from "../icons/table/eye-icon";
import { IUser } from "@/helpers/types";
import Link from "next/link";
import UserModal from "./work-modal";
import { deleteUser, editUser } from "@/actions/user.action";
import { toast } from "sonner";
import { History } from "lucide-react";
import { deleteWorkWithUsEntry } from "@/actions/work.action";

interface Props {
  item: any;
  isAdmin?: boolean

  columnKey: string | React.Key;
}

export const RenderCell = ({ item, columnKey, isAdmin }: Props) => {
  console.log("🚀 ~ RenderCell ~ item:", item)
  const cellValue = item[columnKey as keyof any];

  const handleDeleteUser = async () => {
    toast.promise(
      deleteWorkWithUsEntry(item._id).then((result) => {
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
    case "workBasis":
      return <div className="capitalize">{cellValue.split("_").join(" ")}</div>;



    case "isDivingLicense":
      return (
        <Chip
          size="sm"
          variant="flat"
          color={
            cellValue === "yes"
              ? "success"

              : "warning"
          }
        >
          <span className="text-xs">{cellValue}</span>
        </Chip>
      );
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
