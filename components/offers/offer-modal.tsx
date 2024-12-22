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
import { deleteOffer } from "@/actions/offer.action";

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
  const [loading, setLoading] = useState(false)
  const [InviteEmail, setInviteEmail] = useState("")
  const router = useRouter()
  // State to manage the user data
  const [editedUser, setEditedUser] = useState<IUser & { encryptedPassword?: string }>({
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
  const isUpgradeMode = mode == "upgrade"
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
    setEditedUser((prevState) => ({
      ...prevState,
      [name]: value,
    }));
  };

  const handleConfirm = async () => {
    const pricing = {
      transport: {
        ratePerKm: 10,
        smallVan: 50,
        largeVan: 100,
      },
      helper: {
        ratePerHelperPerHour: 15,
      },
      cleaning: {
        ratePerSqFt: 1,
        ratePerCleaner: 20,
      },
    };

    const userInfo = {
      name: data.name ? data.name : "Not Provided",
      email: data.email,
      phone: data.phone,
      date: data.dateRange,
      time: data.timeRange,
      message: data.specialRequirements,
    };

    const selectedServices = data.services.map((service: any) => {
      if (service === 'Transport') {
        return {
          id: '1',
          name: 'Transport',
          description: 'Transportation service',
          from: data.from,
          to: data.to,
          floorTransport: data.floor,
          liftTransport: data.lift,
          distance: data.distance,
        };
      } else if (service === 'Cleaning') {
        return {
          id: '2',
          name: 'Cleaning',
          description: 'Cleaning service',
          area: data.spaceSize,
          cleaners: data.workers,
        };
      } else if (service === 'Helper') {
        return {
          id: '3',
          name: 'Helper',
          description: 'Helper service',
          helpers: data.helpers,
          hours: data.hours,
          floorMoving: data.floor,
          liftMoving: data.lift
        };
      }
      return {};
    });

    // Total Cost Calculation
    let totalCost = 0;

    selectedServices.forEach((service: any) => {
      if (service.name === 'Transport') {
        const floorTransportCost =
          service.floorTransport &&
            service.floorTransport > 1 &&
            service.liftTransport === "false"
            ? (service.floorTransport - 1) * 100
            : 0;
        totalCost += service.distance * pricing.transport.ratePerKm + pricing.transport.smallVan;
        totalCost += floorTransportCost;

      } else if (service.name === 'Cleaning') {
        totalCost += service.area * pricing.cleaning.ratePerSqFt + service.cleaners * pricing.cleaning.ratePerCleaner;
      } else if (service.name === 'Helper') {
        const floorMovingCost =
          service.floorMoving &&
            service.floorMoving > 1 &&
            service.liftMoving === "false"
            ? (service.floorMoving - 1) * 100
            : 0;
        totalCost += service.helpers * pricing.helper.ratePerHelperPerHour * service.hours;
        totalCost += floorMovingCost;

      }
    });

    const bookingData = {
      userInfo,
      selectedServices,
      totalCost,
      isWorking: false,
    };

    try {
      setLoading(true);
      const response = await fetch(`${process.env.NEXT_PUBLIC_BACKEND_URL}/api/booking`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(bookingData),
      });

      if (!response.ok) {
        const errorData = await response.json();
        toast.error(errorData.message || 'Failed to create booking.');
        throw new Error(errorData.message || 'Failed to create booking.');
      }

      const result = await response.json();
      await deleteOffer(data._id)
      toast.success('Booking created successfully!');
      console.log('Booking result:', result);
    } catch (error) {
      console.error('Error creating booking:', error);
    } finally {
      setLoading(false);
    }
    router.refresh()
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
          <ModalHeader className="capitalize">{title}</ModalHeader>
          <ModalBody>
            {isDeleteMode ? (
              <p>
                Are you sure you want to delete{" "}
                <span className="underline">{editedUser.full_name}</span> with
                email <span className="underline">{editedUser.email}</span>?
              </p>
            )
              : isUpgradeMode ?

                <p>
                  Are you sure you want to add this offer in booking
                </p>

                : isViewMode ?


                  <>

                    <div className="space-y-2">
                      {data.userType && (
                        <p className="text-gray-700">
                          <span className="font-semibold">User Type:</span> {data.userType}
                        </p>
                      )}
                      {data.name && (
                        <p className="text-gray-700">
                          <span className="font-semibold">Name:</span> {data.name}
                        </p>
                      )}
                      {data.email && (
                        <p className="text-gray-700">
                          <span className="font-semibold">Email:</span> {data.email}
                        </p>
                      )}
                      {data.phone && (
                        <p className="text-gray-700">
                          <span className="font-semibold">Phone:</span> {data.phone}
                        </p>
                      )}
                      {data.dateRange && (
                        <p className="text-gray-700">
                          <span className="font-semibold">Date Range:</span> {data.dateRange}
                        </p>
                      )}
                      {data.timeRange && (
                        <p className="text-gray-700">
                          <span className="font-semibold">Time Range:</span> {data.timeRange}
                        </p>
                      )}
                      {data.services && data.services.length > 0 && (
                        <p className="text-gray-700">
                          <span className="font-semibold">Services:</span>{" "}
                          {data.services.join(", ")}
                        </p>
                      )}
                      {data.from && (
                        <p className="text-gray-700">
                          <span className="font-semibold">From:</span> {data.from}
                        </p>
                      )}
                      {data.lift && (
                        <p className="text-gray-700">
                          <span className="font-semibold">Building have a lift:</span> {data.lift == "false" ? "No" : "Yes"}
                        </p>
                      )}
                      {data.floor && (
                        <p className="text-gray-700">
                          <span className="font-semibold">Floor Number:</span> {data.floor}
                        </p>
                      )}
                      {data.to && (
                        <p className="text-gray-700">
                          <span className="font-semibold">To:</span> {data.to}
                        </p>
                      )}
                      {data.distance && (
                        <p className="text-gray-700">
                          <span className="font-semibold">Distance:</span> {data.distance} KM
                        </p>
                      )}
                      {data.helpers !== undefined && (
                        <p className="text-gray-700">
                          <span className="font-semibold">Helpers:</span> {data.helpers}
                        </p>
                      )}
                      {data.hours !== undefined && (
                        <p className="text-gray-700">
                          <span className="font-semibold">Helpers Hours:</span> {data.hours}
                        </p>
                      )}
                      {data.workers !== undefined && (
                        <p className="text-gray-700">
                          <span className="font-semibold">Workers:</span> {data.workers}
                        </p>
                      )}
                      {data.spaceSize !== undefined && (
                        <p className="text-gray-700">
                          <span className="font-semibold">Space Size:</span>{" "}
                          {data.spaceSize} sqm
                        </p>
                      )}
                      {data.specialRequirements && (
                        <p className="text-gray-700">
                          <span className="font-semibold">Special Requirements:</span>{" "}
                          {data.specialRequirements}
                        </p>
                      )}
                      {data.frequency && (
                        <p className="text-gray-700">
                          <span className="font-semibold">Frequency:</span> {data.frequency}
                        </p>
                      )}
                      <p className="text-gray-500 text-sm">
                        <span className="font-semibold">Created At:</span>{" "}
                        {new Date(data.createdAt).toLocaleString()}
                      </p>
                      <p className="text-gray-500 text-sm">
                        <span className="font-semibold">Updated At:</span>{" "}
                        {new Date(data.updatedAt).toLocaleString()}
                      </p>
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

            <Button color="primary" onPress={handleConfirm} className="capitalize">
              {
                !loading ? (isViewMode ? "Upgrade" : buttonText) : "Loading..."
              }
            </Button>

          </ModalFooter>
        </ModalContent>
      </Modal>
    </div>
  );
};

export default UserModal;
