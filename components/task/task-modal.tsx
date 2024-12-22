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
    Chip,
    Textarea,
    Tooltip,
    Avatar
} from "@nextui-org/react";
import axios from 'axios';
import { useRouter } from "next/navigation";
import { Download, Plus, Send } from "lucide-react";
import { saveAs } from 'file-saver';
import { toast } from "sonner";



interface TaskData {
    task: string;
    userIds: string[];
    assignedBy: string;
    dueDate: string;
    startDate: string;
    startTime: string;
    endTime: string;
    priority: string;
    fileUrl: any;
    title: string;
    status: string;
}

type TaskModalProps = {
    mode?: string;
    data?: any;
    usersData?: any;
    button?: React.ReactNode;
    id?: any;
    onConfirm?: (mode: string, data: TaskData) => Promise<void>;
};

const TaskModal = ({
    mode = "Add",
    data,
    id,
    usersData = [],
    onConfirm,
    button,
}: TaskModalProps) => {
    const { isOpen, onOpen, onClose } = useDisclosure();
    const router = useRouter();
    const [selectedUsers, setSelectedUsers] = useState<any>([]);
    const [loading, setLoading] = useState(false)
    const [taskData, setTaskData] = useState<TaskData>({
        task: "",
        userIds: [],
        assignedBy: "",
        dueDate: "",
        startTime: "",
        endTime: "",
        startDate: "",
        title: "",
        fileUrl: {},
        priority: "low",
        status: "assigned",
        ...data,
    });
    console.log("🚀 ~ taskData:", taskData)

    const title = `${mode} Task`;
    const isViewMode = mode === "View";
    const isEditMode = mode === "Edit";
    const buttonText = isViewMode ? "Done" : `${mode} Task`;
    const colors = [
        "bg-red-500",
        "bg-green-500",
        "bg-blue-500",
        "bg-purple-500",
        "bg-yellow-500",
        "bg-pink-500",
        "bg-indigo-500",
        "bg-teal-500"
    ];
    useEffect(() => {
        if (data) {
            setTaskData((prevState) => ({
                ...prevState,
                ...data,
            }));
        }
    }, [data]);

    const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>) => {
        const { name, value } = e.target;
        setTaskData((prevState: TaskData) => ({
            ...prevState,
            [name]: value,
        }));
    };
    const downloadFile = async (url: any) => {
        try {
            const response = await fetch(url[0].url);
            const blob = await response.blob();
            saveAs(blob, url[0].name);
        } catch (error) {
            console.error('Failed to download the file:', error);
        }
    };
    const today = new Date().toISOString().split('T')[0];

    const handleConfirm = async () => {
        if (

            !taskData.endTime ||
            !taskData.dueDate ||
            !taskData.startTime ||
            !taskData.startDate ||
            !taskData.title ||
            !taskData.priority ||
            !taskData.status
        ) {
            return toast.error("All fields except file are required");
        }

        const startDateTime = new Date(`${taskData.startDate}T${taskData.startTime}`);
        const endDateTime = new Date(`${taskData.dueDate}T${taskData.endTime}`);

        if (endDateTime < startDateTime) {
            return toast.error("End date and time cannot be earlier than the start date and time.");
        }

        if (
            taskData.startDate === taskData.dueDate &&
            taskData.endTime < taskData.startTime
        ) {
            return toast.error("End time cannot be earlier than start time on the same day.");
        }
        if (
            taskData.startDate === taskData.dueDate &&
            taskData.endTime == taskData.startTime
        ) {
            return toast.error("End time cannot be same as start time on the same day.");
        }
        if (onConfirm) {
            if (isEditMode) {
                const allData = {
                    ...taskData,
                    _id: data._id
                }
                await onConfirm(mode, allData);
            }
            else {
                await onConfirm(mode, taskData);
            }
            setTaskData({
                task: "",
                userIds: [],
                assignedBy: "",
                dueDate: "",
                startDate: "",
                endTime: "",
                startTime: "",
                fileUrl: {},
                title: "",
                priority: "low",
                status: "assigned",
            });
            setSelectedUsers([])
            router.refresh();
        }
        onClose();
    };

    const handleSelectionChange = (selectedKeys: Set<string>) => {
        const selectedArray = Array.from(selectedKeys);
        setSelectedUsers(selectedArray);
        setTaskData((prevState) => ({
            ...prevState,
            userIds: selectedArray,
        }));
    };

    const formatStatus = (status: string) => {
        return status.includes('_') ? status.replace('_', ' ') : status;
    };

    const handleFileUpload = async (file: any) => {
        // const allowedExtensions = ['pdf', 'doc', 'docx', 'xls', 'xlsx', "csv"];
        // const fileExtension = file.name.split('.').pop().toLowerCase();
        // if (allowedExtensions.includes(fileExtension)) {
        setLoading(true)
        const formData = new FormData();
        formData.append('file', file);

        try {
            const response = await axios.post(`${process.env.NEXT_PUBLIC_BACKEND_URL}/api/file/upload`, formData, {
                headers: {
                    'Content-Type': 'multipart/form-data'
                }
            });
            setTaskData(prevState => ({
                ...prevState,
                fileUrl: response.data.url
            }));
        } catch (error) {
            console.error('Error uploading file:', error);

        } finally {
            setLoading(false)
        }
        // }
        // else {
        //     toast.success("Invalid File only PDF, DOC and Excel is acceptable")
        // }
    };

    const statusColors = {
        assigned: "primary",
        in_progress: "secondary",
        completed: "success",
        on_hold: "warning",
        cancelled: "danger",
        review: "secondary",
        approved: "success",
    };
    const priorityColors = {
        medium: "warning",
        high: "danger",
        low: "success",
        critical: "danger",
    };
    return (
        <div>
            {button ? (
                <button onClick={onOpen}>{button}</button>
            ) : (
                <Button onPress={onOpen} className="flex items-center bg-emerald-500 text-white gap-x-1">
                    {mode === "Add" ? <Plus className="h-5 w-5" /> : <Send className="h-5 w-5" />}
                    {mode} Task
                </Button>
            )}
            <Modal isOpen={isOpen} onClose={onClose} placement="top-center"  >
                <ModalContent className="max-h-[90vh] overflow-y-auto">
                    <ModalHeader>{title}</ModalHeader>
                    <ModalBody>
                        {/* Only show status field in Edit mode */}
                        {isEditMode ? (
                            // <Select
                            //     name="status"
                            //     label="Status"
                            //     selectedKeys={[taskData.status]}
                            //     onChange={handleChange}
                            //     variant="bordered"
                            // >
                            //     <SelectItem key="started">Started</SelectItem>
                            //     <SelectItem key="in_progress">In Progress</SelectItem>
                            //     <SelectItem key="completed">Completed</SelectItem>
                            //     <SelectItem key="on_hold">On Hold</SelectItem>
                            // </Select>
                            <Select
                                items={usersData.users}
                                variant="bordered"
                                isMultiline={true}
                                // selectionMode=""
                                placeholder="Assign to Employees"
                                labelPlacement="outside"
                                // @ts-ignore
                                onSelectionChange={handleSelectionChange}
                                selectedKeys={new Set(selectedUsers)}
                                classNames={{
                                    base: "w-full",
                                    trigger: "min-h-12 py-2",
                                }}
                                renderValue={(items) => (
                                    <div className="flex flex-wrap gap-2">
                                        {items.map((item) => (
                                            <Chip key={item.key}>{item.data.full_name}</Chip>
                                        ))}
                                    </div>
                                )}
                            >
                                {(user: any) => (
                                    <SelectItem key={user._id} textValue={user.full_name}>
                                        <div className="flex gap-2 items-center">
                                            <div className="flex flex-col">
                                                <span className="text-small">{user.full_name}</span>
                                                <span className="text-tiny text-default-400">{user.email}</span>
                                            </div>
                                        </div>
                                    </SelectItem>
                                )}
                            </Select>
                        ) :
                            isViewMode ?
                                <>
                                    <div className="w-full flex items-center justify-between my-3">
                                        <div className="flex items-center gap-x-2">
                                            {/* @ts-ignore */}
                                            Priority    <Chip variant="flat" color={priorityColors[data.priority]} className="capitalize">
                                                {data.priority}
                                            </Chip>
                                        </div>
                                        <div className="flex justify-between items-center gap-x-2">
                                            Current Status
                                            {/* @ts-ignore */}
                                            <Chip variant="flat" color={statusColors[data.status]} className="capitalize">
                                                {formatStatus(data.status)}
                                            </Chip>
                                        </div>
                                    </div>
                                    <h1 className="font-semibold capitalize text-xl">
                                        {data.title}
                                    </h1>
                                    <div className="flex gap-x-1 -mt-2 relative ml-5">
                                        {data.userIds.map((user: any, index: number) => (
                                            <Tooltip key={user._id} content={user.full_name} className="cursor-pointer">
                                                <Avatar
                                                    size="sm"
                                                    src={user.profile}
                                                    // name={user.full_name.toUpperCase()}
                                                    className={`text-white ${colors[index % colors?.length]} avatar-stacked`}
                                                    style={{ zIndex: data.userIds?.length + index }}
                                                />
                                            </Tooltip>
                                        ))}
                                    </div>
                                    <p>

                                        {data.task}
                                    </p>
                                    {
                                        data.fileUrl?.length > 0 &&
                                        typeof data.fileUrl[0] === 'object' &&
                                        Object.keys(data.fileUrl[0]).length > 0 && (
                                            <div className="flex items-center justify-end w-full">
                                                <div
                                                    onClick={() => downloadFile(data.fileUrl)}
                                                    className="capitalize flex items-center hover:text-blue-500 hover:underline gap-x-1"
                                                    style={{ cursor: 'pointer' }}
                                                >
                                                    <Download /> {data.fileUrl[0].name}
                                                </div>
                                            </div>
                                        )
                                    }

                                    <div className="flex items-center justify-between mt-6 text-sm font-light">
                                        <p>
                                            Start Date {new Date(data.startDate).toLocaleDateString("en-US", { year: 'numeric', month: '2-digit', day: '2-digit' })}
                                        </p>
                                        <p>
                                            Start Time {data.startTime}
                                        </p>

                                    </div>
                                    <div className="flex items-center justify-between mt-1 text-sm font-light">
                                        <p>
                                            Due Date {new Date(data.dueDate).toLocaleDateString("en-US", { year: 'numeric', month: '2-digit', day: '2-digit' })}

                                        </p>
                                        <p>
                                            Due Time {data.endTime}
                                        </p>

                                    </div>
                                    <div className="flex items-center justify-between mt-1 text-sm font-light">
                                        <p>
                                            Assigned By {data.assignedBy?.full_name}
                                        </p>


                                    </div>
                                </>
                                :
                                (
                                    <>
                                        <Input
                                            name="title"
                                            label="Task Title"
                                            type="text"
                                            value={taskData.title}
                                            onChange={handleChange}
                                            variant="bordered"
                                            disabled={isViewMode}

                                        />

                                        <Input
                                            name="startDate"
                                            label="Start Date"
                                            type="date"
                                            min={today}
                                            value={taskData.startDate}
                                            onChange={handleChange}
                                            variant="bordered"
                                            disabled={isViewMode}
                                        />
                                        <Input
                                            name="startTime"
                                            label="Start Time"
                                            type="time"
                                            value={taskData.startTime}
                                            onChange={handleChange}
                                            variant="bordered"
                                            disabled={isViewMode}
                                        />
                                        <Input
                                            name="dueDate"
                                            label="Due Date"
                                            type="date"
                                            min={today}
                                            value={taskData.dueDate}
                                            onChange={handleChange}
                                            variant="bordered"
                                            disabled={isViewMode}
                                        />
                                        <Input
                                            name="endTime"
                                            label="Due Time"
                                            type="time"
                                            value={taskData.endTime}
                                            onChange={handleChange}
                                            variant="bordered"
                                            disabled={isViewMode}
                                        />
                                        <div className="flex flex-col ">
                                            <label className="flex items-center" > Select File
                                                <span className="text-[12px] ml-1
                                                 text-red-600">
                                                    *Optional
                                                </span>

                                            </label>
                                            <Input
                                                name="file "
                                                type="file"
                                                onChange={(e: any) => handleFileUpload(e.target.files[0])}
                                                variant="bordered"
                                                disabled={isViewMode}
                                            />
                                        </div>
                                        <Select
                                            name="priority"
                                            label="Task Priority"

                                            selectedKeys={[taskData.priority]}
                                            onChange={handleChange}
                                            variant="bordered"
                                        >
                                            <SelectItem key="medium">Medium</SelectItem>
                                            <SelectItem key="high">High</SelectItem>
                                            <SelectItem key="low">Low</SelectItem>
                                            <SelectItem key="critical">Critical</SelectItem>
                                        </Select>

                                        <Select
                                            items={usersData.users}
                                            variant="bordered"

                                            isMultiline={true}
                                            // selectionMode=""
                                            placeholder="Assign to Employees"
                                            labelPlacement="outside"
                                            // @ts-ignore
                                            onSelectionChange={handleSelectionChange}
                                            selectedKeys={new Set(selectedUsers)}
                                            classNames={{
                                                base: "w-full",
                                                trigger: "min-h-12 py-2",
                                            }}
                                            renderValue={(items) => (
                                                <div className="flex flex-wrap gap-2">
                                                    {items.map((item) => (
                                                        <Chip key={item.key}>{item.data.full_name}</Chip>
                                                    ))}
                                                </div>
                                            )}
                                        >
                                            {(user: any) => (
                                                <SelectItem key={user._id} textValue={user.full_name}>
                                                    <div className="flex gap-2 items-center">
                                                        <div className="flex flex-col">
                                                            <span className="text-small">{user.full_name}</span>
                                                            <span className="text-tiny text-default-400">{user.email}</span>
                                                        </div>
                                                    </div>
                                                </SelectItem>
                                            )}
                                        </Select>
                                        <div className="flex flex-col ">
                                            <label className="flex items-center" > Add Discription
                                                <span className="text-[12px] ml-1
                                                 text-red-600">
                                                    *Optional
                                                </span>

                                            </label>
                                            <Textarea
                                                name="task"
                                                label="Task Description"
                                                value={taskData.task}
                                                onChange={handleChange}
                                                variant="bordered"
                                                disabled={isViewMode}
                                            />
                                        </div>
                                    </>
                                )}
                    </ModalBody>
                    <ModalFooter>
                        <Button color="danger" variant="flat" onPress={onClose}>
                            Close
                        </Button>
                        {!isViewMode && (
                            <Button color="primary" onPress={handleConfirm} disabled={loading}>
                                {buttonText}
                            </Button>
                        )}
                    </ModalFooter>
                </ModalContent>
            </Modal>
        </div>
    );
};

export default TaskModal;
