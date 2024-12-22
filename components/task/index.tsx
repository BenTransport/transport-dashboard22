"use client"
import React, { useEffect, useState } from 'react';
import { toast } from 'sonner';
import TaskModal from './task-modal';
import { Avatar, Tooltip, Chip, Select, SelectItem } from '@nextui-org/react';
import { createTask, deleteTask, updateTaskStatus, updateTaskTime } from '@/actions/task.action';
import { EditIcon } from '../icons/table/edit-icon';
import { DeleteIcon } from '../icons/table/delete-icon';
import { useRouter } from "next/navigation";
import { EyeIcon } from '../icons/table/eye-icon';
import { useCheckAdmin } from '../hooks/useCheckingAdmin';
import { Download } from 'lucide-react';
import saveAs from 'file-saver';
import Image from 'next/image';
import { useSession } from 'next-auth/react';
import TaskTimer from './TimeStamp';
type TaskPriority = "medium" | "high" | "low" | "critical";
type TaskStatus = "assigned" | "in_progress" | "completed" | "on_hold" | "cancelled" | "review" | "approved";
interface Task {
    _id: string;
    priority: TaskPriority;
    status: TaskStatus;
    title: string;
    task: string;
    workingStartTime: any;
    fileUrl?: any;
    userIds: { _id: string; full_name: string }[];
}
interface Props {
    UsersData?: any;
    data: any;
}

function Task({ UsersData, data }: Props) {
    const session = useSession()
    const { update } = useSession()
    const [filter, setFilter] = useState<string>("all");
    console.log("🚀 ~ Task ~ data:", data)
    console.log("🚀 ~ Task ~ UsersData:", UsersData)
    const [allTasks, setAllTasks] = useState<Task[]>(data);
    const [filteredTasks, setFilteredTasks] = useState<Task[]>(data);
    const [currentTask, setCurrentTask] = useState(null)
    const { isAdmin, userData } = useCheckAdmin()
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

    const priorityColors = {
        medium: "warning",
        high: "danger",
        low: "success",
        critical: "danger",
    };
    const handleFilterChange = (selectedFilter: string) => {
        setFilter(selectedFilter);
    };

    useEffect(() => {
        if (filter === "all") {
            setFilteredTasks(allTasks);
        } else {
            setFilteredTasks(allTasks.filter(task => task.status === filter));
        }
    }, [filter, allTasks]);

    const statusColors = {
        assigned: "primary",
        in_progress: "secondary",
        completed: "success",
        on_hold: "warning",
        cancelled: "danger",
        review: "secondary",
        approved: "success",
    };


    const router = useRouter()
    useEffect(() => {
        if (data) {
            setAllTasks(data);
        }
    }, [data]);
    const handleDeleteTask = async (item: any) => {
        toast.promise(
            deleteTask(item).then((result) => {
                if (result.error) {
                    throw new Error(result.error);
                }
                return result;
            }),
            {
                loading: "Deleting Task...",
                success: "Task deleted successfully!",
                error: "Error deleting Task.",
            }
        );
        router.refresh()
    };
    const handleEditUser = async (_: string, data: any) => {
        console.log("🚀 ~ handleEditUser ~ data:", data)
        toast.promise(
            updateTaskStatus(data._id, data.userIds).then((result) => {
                if (result.error) {
                    throw new Error(result.error);
                }
                return result;
            }),
            {
                loading: "Editing Task...",
                success: "Task edited successfully!",
                error: "Error editing Task.",
            }
        );
    };
    const borderColorClasses = {
        medium: "border-yellow-500",
        high: "border-red-500",
        low: "border-green-500",
        critical: "border-purple-500",
    };
    const handleAddTask = async (_: string, data: any) => {
        toast.promise(
            createTask(data).then((result) => {
                if (result.error) {
                    toast.error(result.error)
                    throw new Error(result.error);
                }
                return result;
            }),
            {
                loading: "Creating Task...",
                success: "Task created successfully!",
                error: "Error creating Task.",
            }
        );
    };
    const downloadFile = async (url: any) => {
        console.log("🚀 ~ downloadFile ~ url:", url)
        try {
            const response = await fetch(url[0].url);
            const blob = await response.blob();
            saveAs(blob, url[0].name);
        } catch (error) {
            console.error('Failed to download the file:', error);
        }
    };
    const formatStatus = (status: string) => {
        return status.includes('_') ? status.replace('_', ' ') : status;
    };
    useEffect(() => {
        if (window !== undefined) {
            const data = localStorage.getItem("current-task")
            console.log("🚀 ~ useEffect ~ data:", data)
            if (data) {
                const current = JSON.parse(data)
                console.log("🚀 ~ useEffect ~ currentTask:", current)
                setCurrentTask(current.id)
            }
        }
    }, [])
    function calculateTaskTime(
        startDate: string, // Date like '2024-12-26T00:00:00.000Z'
        startTime: string, // Time like '02:00'
        endDate: string,   // Date like '2024-12-27T00:00:00.000Z'
        endTime: string    // Time like '05:30'
    ): string {
        if (!startDate || !startTime || !endDate || !endTime) {
            return "Incomplete"; // Handle incomplete inputs
        }

        // Combine date and time into full Date objects
        const start = new Date(`${startDate.split('T')[0]}T${startTime}:00`);
        const end = new Date(`${endDate.split('T')[0]}T${endTime}:00`);

        // Validate that the end time is not earlier than the start time
        if (end < start) {
            return "End time cannot be earlier than start time.";
        }

        // Calculate the time difference in minutes
        const diffInMinutes = Math.abs((end.getTime() - start.getTime()) / (1000 * 60));

        // Convert difference into days, hours, and minutes
        const days = Math.floor(diffInMinutes / (60 * 24));
        const hours = Math.floor((diffInMinutes % (60 * 24)) / 60);
        const minutes = diffInMinutes % 60;

        // Format the result based on the time components
        if (days > 0) {
            return `${days}d ${hours}h ${minutes}m`;
        } else if (hours > 0) {
            return `${hours}h ${minutes}m`;
        } else {
            return `${minutes}m`;
        }
    }


    const updateTask = async (id: any, current: any) => {
        console.log("🚀 ~ updateTask ~ current:", current)
        console.log("🚀 ~ updateTask ~ id:", id)
        const now = new Date();

        const hours = String(now.getHours()).padStart(2, '0');
        const minutes = String(now.getMinutes()).padStart(2, '0');

        const time24HourFormat = `${hours}:${minutes}`;
        const updatePayload = { [current]: time24HourFormat };

        toast.promise(
            updateTaskTime(id, updatePayload).then((result) => {
                if (result.error) {
                    throw new Error(result.error);
                }
                else {
                    update({
                        user: {
                            // @ts-ignore
                            ...session.user,
                            isAvailable: current == "startTime" ? "false" : "true"
                        }
                    });

                    const payload = {
                        id: id,
                        timeStart: time24HourFormat

                    }
                    if (current == "startTime") {
                        setCurrentTask(id)
                        localStorage.setItem("current-task", JSON.stringify(payload))
                    }
                    else {
                        setCurrentTask(null)
                        localStorage.removeItem("current-task")

                    }
                }
                return result;
            }),
            {
                loading: `${current == "startTime" ? "Starting...." : "Ending...."}`,
                success: `Task ${current == "startTime" ? "started" : "completed"} successfully`,
                error: `Error in ${current == "startTime" ? "Starting" : "Completing"} Task.`,
            }
        );

        router.refresh()
        // const { data, error } = await updateTaskTime(id, updatePayload)

    }

    return (
        <div className="my-10 px-4 lg:px-6 max-w-[95rem] mx-auto w-full flex flex-col gap-4">
            <div className="flex justify-between flex-wrap gap-4 items-center">
                <div className="flex items-center gap-3 flex-wrap md:flex-nowrap">
                    <h3 className="text-2xl regular-fontss font-semibold text-sky-900">
                        {
                            isAdmin ? "Employees Task " : "My Task "
                        }
                        ({filteredTasks.length})
                    </h3>
                </div>

                <div className="flex flex-row gap-3.5 flex-wrap">
                    <Select
                        aria-label="Filter by Status"
                        placeholder="Filter by Status"
                        value={filter}
                        onChange={(e) => handleFilterChange(e.target.value)}
                        className="w-40"
                    >
                        <SelectItem key="all">All</SelectItem>
                        <SelectItem key="started">Started</SelectItem>
                        <SelectItem key="in_progress">In Progress</SelectItem>
                        <SelectItem key="completed">Completed</SelectItem>
                        <SelectItem key="on_hold">On Hold</SelectItem>

                    </Select>
                    {
                        isAdmin &&
                        <TaskModal mode="Add" onConfirm={handleAddTask} usersData={UsersData} />
                    }
                </div>
            </div>
            {filteredTasks?.length == 0 ?
                < div className='h-[60vh] flex items-center justify-center flex-col gap-3 text-xl font-semibold '>
                    <Image
                        src="/undraw_no_data_re_kwbl.svg"
                        alt='No task FOund'
                        height={100}
                        width={100}
                    />
                    No Task Found
                </div>
                :
                <div className=" gap-4 my-8 flex items-start flex-wrap ">
                    {filteredTasks && filteredTasks.map((task: Task) => (
                        <div key={task._id} className={`p-4 bg-white min-w-[19rem] max-w-[19rem] dark:bg-[#18181b] rounded-xl border-1 ${borderColorClasses[task.priority]} flex flex-col gap-4`}>
                            <div className="flex justify-between items-center border-b pb-2">
                                {/* <Chip variant="flat" color={priorityColors[task.priority]} className="capitalize">
                                {task.priority}
                            </Chip> */}
                                <div className="flex justify-between items-center">
                                    {/* @ts-ignore */}
                                    {calculateTaskTime(task.startDate, task.startTime, task.dueDate, task.endTime)}

                                </div>
                                <div className='flex items-center gap-2'>
                                    {/* @ts-ignore */}
                                    <Chip variant="flat" color={statusColors[task.status]} className="capitalize">
                                        {formatStatus(task.status)}
                                    </Chip>

                                    <TaskModal
                                        button={<EyeIcon size={20} fill="#979797" />}
                                        mode="View" data={task}
                                    />
                                    {
                                        task.status == "on_hold" &&
                                        <TaskModal
                                            button={<EditIcon size={20} fill="#1a740e" />}
                                            mode="Edit" onConfirm={handleEditUser} usersData={UsersData} data={task}
                                        />
                                    }
                                    {
                                        isAdmin &&
                                        <button onClick={() => handleDeleteTask(task._id)}>
                                            <DeleteIcon size={20} fill="#FF0080" />
                                        </button>
                                    }
                                </div>
                            </div>

                            <h5 className="text-lg font-semibold capitalize text-gray-800 dark:text-gray-100">
                                {task.title}
                            </h5>
                            <div className="flex gap-x-1 -mt-2 relative ml-5">
                                {task.userIds.map((user: any, index: number) => (
                                    <Tooltip key={user._id} content={user.full_name} className="cursor-pointer">
                                        <Avatar
                                            // name={user.full_name.toUpperCase()}
                                            src={user.profile}
                                            size="sm"
                                            className={`text-white ${colors[index % colors?.length]} avatar-stacked`}
                                            style={{ zIndex: task.userIds?.length + index }}
                                        />
                                    </Tooltip>
                                ))}
                            </div>
                            <p className="text-sm text-gray-600 dark:text-gray-400 truncate">
                                {task.task}
                            </p>
                            {
                                data.fileUrl?.length > 0 &&
                                typeof data.fileUrl[0] === 'object' &&
                                Object.keys(data.fileUrl[0]).length > 0 && (
                                    <div className="flex items-center justify-end w-full">
                                        <div onClick={() => downloadFile(task.fileUrl)} className="capitalize  flex items-center hover:text-blue-500 hover:underline gap-x-1" style={{ cursor: 'pointer' }}>
                                            <Download /> {task.fileUrl[0].name}
                                        </div>
                                    </div>
                                )

                            }
                            {!isAdmin && (
                                <div className="flex justify-between gap-x-3 items-center border-t pt-2 w-full">

                                    {task.status !== "completed" && task.workingStartTime && (
                                        <TaskTimer startTime={task.workingStartTime} />
                                    )}


                                    <div className="flex justify-end gap-x-3 items-center ">
                                        <button
                                            disabled={userData?.user.isAvailable === "false" || currentTask === task._id || task.status == "completed"}
                                            onClick={() => updateTask(task._id, "startTime")}
                                            className={`p-2 rounded-full px-6 text-white text-sm ${userData?.user.isAvailable === "false" || currentTask === task._id || task.status == "completed"
                                                ? "bg-emerald-300 cursor-not-allowed"
                                                : "bg-emerald-500 hover:scale-105 duration-250 hover:cursor-pointer"
                                                }`}
                                        >
                                            Start
                                        </button>

                                        <button
                                            disabled={(!currentTask || userData?.user.isAvailable === "false") && currentTask != task._id}
                                            onClick={() => updateTask(task._id, "EndTime")}
                                            className={`p-2 rounded-full px-6 text-white text-sm ${(!currentTask || userData?.user.isAvailable === "false") && currentTask != task._id
                                                ? "bg-red-300 cursor-not-allowed"
                                                : "bg-red-500 hover:scale-105 duration-250 hover:cursor-pointer"
                                                }`}
                                        >
                                            End
                                        </button>
                                    </div>
                                </div>
                            )}




                            {/* <div className="flex justify-between items-center mt-4">
                        <Chip variant="flat" color={statusColors[task.status]} className="capitalize">
                            {formatStatus(task.status)}
                        </Chip>
                    </div> */}
                        </div>
                    ))}
                </div>
            }


        </div >
    );
}

export default Task;
