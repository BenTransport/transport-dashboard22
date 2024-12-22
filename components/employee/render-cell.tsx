import { Tooltip, Chip } from "@nextui-org/react";
import React from "react";
import { DeleteIcon } from "../icons/table/delete-icon";
import { EditIcon } from "../icons/table/edit-icon";
import { EyeIcon } from "../icons/table/eye-icon";
import { deleteUser, editUser } from "@/actions/user.action";
import { toast } from "sonner";
import EmployeeModel from "./user-modal";

interface Props {
  item: any;
  isAdmin?: boolean

  columnKey: string | React.Key;
}

export const RenderCell = ({ item, columnKey, isAdmin }: Props) => {
  const cellValue = item[columnKey as keyof any];
  const handleEditUser = async (_: string, data: any) => {
    toast.promise(
      editUser(item._id, data).then((result) => {
        if (result.error) {
          throw new Error(result.error); // Manually throw an error if one is present
        }
        return result; // Return the result if no error
      }),
      {
        loading: "Editing employee...",
        success: "Employee edited successfully!",
        error: "Error editing employee.",
      }
    );
  };

  const handleDeleteUser = async () => {
    toast.promise(
      deleteUser(item._id).then((result) => {
        if (result.error) {
          throw new Error(result.error); // Manually throw an error if one is present
        }
        return result; // Return the result if no error
      }),
      {
        loading: "Deleting employee...",
        success: "Employee deleted successfully!",
        error: "Error deleting employee.",
      }
    );
  };
  switch (columnKey) {
    case "email":
      return <div className="">{cellValue}</div>;

    case "full_name":
      return <div className="capitalize">{cellValue}</div>;
    case "hourRate":
      return <div className="capitalize">{cellValue}SEK</div>;
    case "createdAt":
      return <div className="">  {new Date(cellValue).toLocaleDateString("en-GB", {
        day: "2-digit",
        month: "2-digit",
        year: "numeric",
      })}</div>;

    case "type":
      return (
        <Chip
          size="sm"
          variant="flat"
          color={
            cellValue === "driver"
              ? "success"
              : cellValue === "helper"
                ? "primary"
                : "warning"
          }
        >
          <span className="text-xs">{cellValue}</span>
        </Chip>
      );
    case "isAvailable":
      return (
        <Chip
          size="sm"
          variant="flat"
          color={
            cellValue === "true"
              ? "success"
              : cellValue === "user"
                ? "primary"
                : "warning"
          }
        >
          <span className="text-xs">{cellValue == "true" ? "Available" : "Busy"}</span>
        </Chip>
      );

    case "actions":
      return (
        <div className="flex items-center gap-4">

          <div>
            <Tooltip content="Details">
              <EmployeeModel
                button={<EyeIcon size={20} fill="#979797" />}
                mode="View"
                data={item}
              />
            </Tooltip>
          </div>

          <>
            <div>
              <Tooltip content="Edit user" color="secondary">
                <EmployeeModel
                  button={<EditIcon size={20} fill="#1a740e" />}
                  mode="Edit"
                  data={item}
                  onConfirm={handleEditUser}
                />
              </Tooltip>
            </div>
            <div>
              <Tooltip content="Delete user" color="danger">
                <EmployeeModel
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
