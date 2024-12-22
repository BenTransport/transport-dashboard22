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

type UserModalProps = {
  mode?: string;
  data?: any;
  button?: React.ReactNode;
  onConfirm?: (mode: string, data: any) => Promise<void>; // Updated to async
};

const UserModal = ({
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
    type: "admin",
    password: "",
    signature: "",
    ...data,
  });

  // Customize modal title and button text based on the mode
  const title = `${mode} Offer`;
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

  // Function to handle modal confirm action
  const handleConfirm = async () => {
    if (onConfirm) {

      if (isInviteMode) {
        await onConfirm(mode, InviteEmail)
        setInviteEmail("")
      } else {

        await onConfirm(mode, editedUser);
        setEditedUser({
          email: "",
          _id: "",
          full_name: "",
          type: "admin",
          password: "",
          signature: "",
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
        <Button onPress={onOpen} color={`${mode == "Invite" ? "secondary" : "primary"}`} className="flex items-center gap-x-1">
          {
            mode == "Add" ? <Plus className="h-5 w-5" /> : <Send className="h-5 w-5" />
          }
          {mode} Admin
        </Button>
      )}
      <Modal isOpen={isOpen} onClose={onClose} placement="top-center">
        <ModalContent className="max-h-[90vh] overflow-y-auto">
          <ModalHeader>{title}</ModalHeader>
          <ModalBody>
            {isDeleteMode ? (
              <p>
                Are you sure you want to delete
              </p>
            )
              : isViewMode ?


                <>

                  <div className="bg-white rounded-lg space-y-4">
                    {/* User Info Section */}
                    <div className="border-b pb-4">
                      <h2 className="text-lg font-semibold text-gray-800 mb-2">User Information</h2>
                      <div className="space-y-1 text-gray-700">
                        {data.userInfo.name && (
                          <p>
                            <span className="font-medium">Name:</span> {data.userInfo.name}
                          </p>
                        )}
                        {data.userInfo.email && (
                          <p>
                            <span className="font-medium">Email:</span> {data.userInfo.email}
                          </p>
                        )}
                        {data.userInfo.phone && (
                          <p>
                            <span className="font-medium">Phone:</span> {data.userInfo.phone}
                          </p>
                        )}
                        {data.userInfo.date && (
                          <p>
                            <span className="font-medium">Date:</span> {data.userInfo.date}
                          </p>
                        )}
                        {data.userInfo.time && (
                          <p>
                            <span className="font-medium">Time:</span> {data.userInfo.time}
                          </p>
                        )}
                      </div>
                    </div>

                    {/* Selected Services Section */}
                    <div className="border-b pb-4">
                      <h2 className="text-lg font-semibold text-gray-800 mb-2">Selected Services</h2>
                      <div className="space-y-4">
                        {data.selectedServices.map((service: any, index: number) => (
                          <div key={index} className="p-4 bg-gray-50 rounded-lg border">
                            <h3 className="text-base font-medium text-gray-800">{service.name}</h3>
                            {/* <p className="text-sm text-gray-600">{service.description}</p> */}
                            <div className="mt-2 space-y-1 text-gray-700">
                              {service.from && (
                                <p>
                                  <span className="font-medium">From:</span> {service.from}
                                </p>
                              )}
                              {service.to && (
                                <p>
                                  <span className="font-medium">To:</span> {service.to}
                                </p>
                              )}
                              {service.floorMoving && (
                                <p>
                                  <span className="font-medium">Floor Number:</span> {service.floorMoving}
                                </p>
                              )}
                              {service.floorTransport && (
                                <p>
                                  <span className="font-medium">Floor Number:</span> {service.floorTransport}
                                </p>
                              )}
                              {service.liftTransport && (
                                <p>
                                  <span className="font-medium">is Lift Available:</span> {service.liftTransport == "true" ? "Yes" : "No"}
                                </p>
                              )}
                              {service.liftMoving && (
                                <p>
                                  <span className="font-medium">is Lift Available:</span> {service.liftMoving == "true" ? "Yes" : "No"}
                                </p>
                              )}
                              {service.distance && (
                                <p>
                                  <span className="font-medium">Distance:</span> {service.distance} km
                                </p>
                              )}
                              {service.helpers && (
                                <p>
                                  <span className="font-medium">Helpers:</span> {service.helpers}
                                </p>
                              )}
                              {service.hours && (
                                <p>
                                  <span className="font-medium">Hours:</span> {service.hours}
                                </p>
                              )}
                              {service.area && (
                                <p>
                                  <span className="font-medium">Area:</span> {service.area} sq ft
                                </p>
                              )}
                              {service.cleaners && (
                                <p>
                                  <span className="font-medium">Cleaners:</span> {service.cleaners}
                                </p>
                              )}
                            </div>
                          </div>
                        ))}
                      </div>
                    </div>

                    {/* Cost and Discounts Section */}
                    <div className="border-b pb-4">
                      <span className="font-medium">Spacial Request:</span> {data.message && data.message}
                      <h2 className="text-lg font-semibold text-gray-800 mb-2">Cost Summary</h2>
                      <p className="text-gray-700">
                        <span className="font-medium">Total Cost:</span> ${data.totalCost.toFixed(2)}
                        {data.isWorking && (
                          <span className="text-sm text-green-600 ml-2">(50% discount applied)</span>
                        )}
                      </p>
                    </div>

                    {/* Timestamp Section */}
                    <div className="space-y-1 text-gray-500 text-sm">
                      <p>
                        <span className="font-medium">Created At:</span> {new Date(data.createdAt).toLocaleString()}
                      </p>
                      <p>
                        <span className="font-medium">Updated At:</span> {new Date(data.updatedAt).toLocaleString()}
                      </p>
                    </div>
                  </div>
                </>
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
                        name="email"
                        label="Email"
                        value={editedUser.email}
                        onChange={handleChange}
                        variant="bordered"
                        disabled={isViewMode}
                      />
                      <Input
                        name="full_name"
                        label="Full Name"
                        value={editedUser.full_name}
                        onChange={handleChange}
                        variant="bordered"
                        disabled={isViewMode}
                      />


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

export default UserModal;
