import React, { useState, useEffect } from "react";
import {
  Button,
  Input,
  Modal,
  ModalBody,
  ModalContent,
  ModalFooter,
  ModalHeader,
  useDisclosure,
  Select,
  SelectItem,
} from "@nextui-org/react";
import { IUser } from "@/helpers/types";
import { useRouter } from "next/navigation";
import { Plus, Send } from "lucide-react";
import { toast } from "sonner";

type UserModalProps = {
  mode?: string;
  data?: IUser;
  button?: React.ReactNode;
  onConfirm?: (mode: string, data: any) => Promise<void>; // Updated to async
};

const EmployeeModel = ({
  mode = "Add",
  data,
  onConfirm,
  button,
}: UserModalProps) => {
  const { isOpen, onOpen, onClose } = useDisclosure();
  const [InviteEmail, setInviteEmail] = useState("")
  const router = useRouter()
  // State to manage the user data
  const [editedUser, setEditedUser] = useState<any>({
    email: "",
    _id: "",
    full_name: "",
    phone_number: "",
    hourRate: "",
    isAvailable: "false",
    type: "helper",
    password: "",
    ...data,
  });

  // Customize modal title and button text based on the mode
  const title = `${mode} Employee`;
  const isViewMode = mode === "View";
  const isDeleteMode = mode === "Delete";
  const isInviteMode = mode === "Invite";
  const buttonText = isDeleteMode
    ? "Confirm Delete"
    : isViewMode
      ? "Done"
      : mode;

  // Effect to set initial state when data changes
  useEffect(() => {
    if (data) {
      setEditedUser({
        ...data,
      });
    }
  }, [data]);

  // Function to handle input changes
  const handleChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>
  ) => {
    const { name, value } = e.target;
    setEditedUser((prevState: any) => ({
      ...prevState,
      [name]: value,
    }));
  };

  const handleConfirm = async () => {
    if (onConfirm) {
      console.log(editedUser.email)
      console.log(editedUser.phone_number)
      console.log(editedUser.full_name)
      console.log(editedUser.hourRate)
      console.log(editedUser.isAvailable)
      if (
        !isDeleteMode &&
        (
          !editedUser.email ||
          !editedUser.full_name ||
          !editedUser.phone_number ||
          !editedUser.hourRate ||
          !editedUser.isAvailable ||
          !editedUser.type
        )) {
        return toast.error("All fields are required");
      }

      if (isInviteMode) {
        await onConfirm(mode, InviteEmail)
        setInviteEmail("")
      } else {

        await onConfirm(mode, editedUser);
        setEditedUser({
          email: "",
          _id: "",
          full_name: "",
          phone_number: "",
          isAvailable: "false",
          hourRate: "",
          type: "helper",
          password: "",
        });
      }
      router.refresh()
    }
    onClose();
  };
  return (
    <div>
      {button ? (
        <button onClick={onOpen}>{button}</button>
      ) : (
        <Button onPress={onOpen} className="flex items-center bg-emerald-500 text-white gap-x-1">
          {
            mode == "Add" ? <Plus className="h-5 w-5" /> : <Send className="h-5 w-5" />
          }
          {mode} Employee
        </Button>
      )}
      <Modal isOpen={isOpen} onClose={onClose} placement="top-center">
        <ModalContent className="max-h-[95vh] overflow-y-auto">
          <ModalHeader>{title}</ModalHeader>
          <ModalBody>
            {isDeleteMode ? (
              <p>
                Are you sure you want to delete{" "}
                <span className="underline">{editedUser.full_name}</span> with
                email <span className="underline">{editedUser.email}</span>?
              </p>
            )
              :
              isInviteMode ? (
                <>
                  <Input
                    name="email"
                    label="Email"
                    value={InviteEmail}
                    onChange={(e: any) => setInviteEmail(e.target.value)}
                    variant="bordered"
                  />
                </>
              )
                :
                (
                  <>
                    <Input
                      name="full_name"
                      label="Full Name"
                      value={editedUser.full_name}
                      onChange={handleChange}
                      variant="bordered"
                      disabled={isViewMode}
                    />
                    <Input
                      name="email"
                      label="Email"
                      value={editedUser.email}
                      onChange={handleChange}
                      variant="bordered"
                      disabled={isViewMode}
                    />

                    <Input
                      name="phone_number"
                      label="Phone Number"
                      value={editedUser.phone_number}
                      onChange={handleChange}
                      variant="bordered"
                      disabled={isViewMode}
                    />
                    <Input
                      name="hourRate"
                      label="Hourly Rate (SEK)"
                      value={editedUser.hourRate}
                      onChange={handleChange}
                      variant="bordered"
                      disabled={isViewMode}
                    />
                    <Select
                      name="type"
                      label="Type"
                      selectedKeys={[editedUser.type]}
                      onChange={(e) => handleChange(e)}
                      variant="bordered"
                      disabled={isViewMode}
                    >
                      <SelectItem key="helper">Helper</SelectItem>
                      <SelectItem key="cleaner">Cleaner</SelectItem>
                      <SelectItem key="driver">Driver</SelectItem>
                    </Select>

                    {
                      !isViewMode &&
                      <Select
                        name="isAvailable"
                        label="Availability"
                        selectedKeys={[editedUser.isAvailable]}
                        onChange={(e) => handleChange(e)}
                        variant="bordered"
                        disabled={isViewMode}
                      >
                        <SelectItem key="true">Available</SelectItem>
                        <SelectItem key="false">Busy</SelectItem>
                      </Select>
                    }

                    {!isViewMode && (
                      <Input
                        name="encryptedPassword"
                        label="Password"
                        type="password"
                        value={editedUser.encryptedPassword}
                        onChange={handleChange}
                        variant="bordered"
                      />
                    )}
                  </>
                )}
          </ModalBody>
          <ModalFooter>
            <Button color="danger" variant="flat" onPress={onClose}>
              Close
            </Button>
            {!isViewMode && (
              <Button color="primary" onPress={handleConfirm}>
                {buttonText}
              </Button>
            )}
          </ModalFooter>
        </ModalContent>
      </Modal>
    </div>
  );
};

export default EmployeeModel;
