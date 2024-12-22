"use client";
import React, { useState, useEffect } from "react";
import { useCheckAdmin } from "../hooks/useCheckingAdmin";
import { RenderCell } from "./render-cell";
import {
  Link,
  SelectItem,
  Pagination,
  Select,
  Table,
  TableBody,
  TableCell,
  TableColumn,
  TableHeader,
  TableRow,
  Card,
  CardBody,
  Chip,
  Tooltip,
  Avatar,
} from "@nextui-org/react";
import { Component, EyeIcon } from "lucide-react";
import TaskModal from "../task/task-modal";

export const History = ({ data, error }: any) => {
  const { isAdmin } = useCheckAdmin();
  const columns = [
    { name: "Task Name", uid: "task_name" },
    { name: "Start Working At", uid: "start_time" },
    { name: "End Working At", uid: "end_time" },
    { name: "Total Time", uid: "total_time" },
    { name: "Price", uid: "price" },
  ];

  console.log(data.History[0].userId.full_name)

  const [filteredData, setFilteredData] = useState(data.History);
  const [filter, setFilter] = useState("all");
  const [page, setPage] = useState(1);
  const [itemsPerPage, setItemsPerPage] = useState(10);
  const [totalMinutesWorked, setTotalMinutesWorked] = useState(0);
  const [totalAmount, setTotalAmount] = useState(0);

  const applyFilter = () => {
    const now = new Date();
    let filtered = data.History;

    if (filter === "today") {
      filtered = data.History.filter(
        (item: any) =>
          new Date(item.createdAt).toDateString() === now.toDateString()
      );
    } else if (filter === "thisWeek") {
      const weekStart = new Date(now);
      weekStart.setDate(now.getDate() - now.getDay());
      filtered = data.History.filter(
        (item: any) => new Date(item.createdAt) >= weekStart
      );
    } else if (filter === "thisMonth") {
      filtered = data.History.filter(
        (item: any) =>
          new Date(item.createdAt).getMonth() === now.getMonth() &&
          new Date(item.createdAt).getFullYear() === now.getFullYear()
      );
    } else if (filter === "thisYear") {
      filtered = data.History.filter(
        (item: any) => new Date(item.createdAt).getFullYear() === now.getFullYear()
      );
    }

    setFilteredData(filtered);
  };

  const calculateTimeDiffInMinutes = (startTime: string, endTime: string) => {
    if (!startTime || !endTime) return 0;
    const [startH, startM] = startTime.split(':').map(Number);
    const [endH, endM] = endTime.split(':').map(Number);

    const startTotal = startH * 60 + startM;
    const endTotal = endH * 60 + endM;

    if (endTotal < startTotal) {
      return 0;
    }
    return endTotal - startTotal;
  };

  const calculateTotalWorkTime = () => {
    let total = 0;

    filteredData.forEach((historyItem: any) => {
      const { Task } = historyItem;
      if (Task && Task.workingStartTime && Task.workingEndTime) {
        total += calculateTimeDiffInMinutes(Task.workingStartTime, Task.workingEndTime);
      }
    });

    setTotalMinutesWorked(total);

    const totalHours = total / 60;
    const hourRate = data.History[0].userId?.hourRate || 0;
    setTotalAmount(totalHours * hourRate);
  };

  useEffect(() => {
    applyFilter();
  }, [filter, data]);

  useEffect(() => {
    calculateTotalWorkTime();
  }, [filteredData]);

  // Pagination logic
  const paginatedData = filteredData.slice(
    (page - 1) * itemsPerPage,
    page * itemsPerPage
  );

  const formatStatus = (status: string) => {
    return status.includes('_') ? status.replace('_', ' ') : status;
  };

  const formatTotalTime = (totalMinutes: number): string => {
    const days = Math.floor(totalMinutes / (60 * 24));
    const hours = Math.floor((totalMinutes % (60 * 24)) / 60);
    const minutes = totalMinutes % 60;

    let timeStr = '';
    if (days > 0) timeStr += `${days}d `;
    if (hours > 0) timeStr += `${hours}h `;
    if (minutes > 0) timeStr += `${minutes}m`;
    if (!timeStr) timeStr = '0m';
    return timeStr.trim();
  };

  return (
    <div className="px-4 my-10 lg:px-6 max-w-[95rem] mx-auto w-full flex flex-col gap-4">
      {/* Header */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-3">
        <Card className={` rounded-xl bg-gray-500 shadow-md px-3 w-full`}>
          <CardBody className="py-5 overflow-hidden">
            <div className="flex gap-2.5 items-center">
              <Component className="text-white" />
              <div className="flex flex-col">
                <span className="capitalize text-white">
                  Total Tasks
                </span>
                <span className="text-white text-xl font-semibold">
                  {data.totalTask}
                </span>
              </div>
            </div>
          </CardBody>
        </Card>
        <Card className={` rounded-xl bg-green-500 shadow-md px-3 w-full`}>
          <CardBody className="py-5 overflow-hidden">
            <div className="flex gap-2.5 items-center">
              <Component className="text-white" />
              <div className="flex flex-col">
                <span className="capitalize text-white">
                  Completed Tasks
                </span>
                <span className="text-white text-xl font-semibold">
                  {data.completedTask.length}
                </span>
              </div>
            </div>
          </CardBody>
        </Card>
        <Card className={` rounded-xl bg-purple-500 shadow-md px-3 w-full`}>
          <CardBody className="py-5 overflow-hidden">
            <div className="flex gap-2.5 items-center">
              <Component className="text-white" />
              <div className="flex flex-col">
                <span className="capitalize text-white">
                  Pending Tasks
                </span>
                <span className="text-white text-xl font-semibold">
                  {data.pendingTask.length}
                </span>
              </div>
            </div>
          </CardBody>
        </Card>
      </div>
      <div className="flex justify-between flex-wrap gap-4 mt-7 items-center ">
        {
          isAdmin ?
            <h3 className="text-xl capitalize font-semibold">{data.History[0].userId.full_name} History</h3>
            :
            <h3 className="text-xl capitalize font-semibold">My History</h3>
        }

        <Select
          placeholder="Filter"
          className="w-[150px]"
          value={filter}
          onChange={(e) => setFilter(e.target.value)}
        >
          <SelectItem key="all" value="all">All</SelectItem>
          <SelectItem key="today" value="today">Today</SelectItem>
          <SelectItem key="thisWeek" value="thisWeek">This Week</SelectItem>
          <SelectItem key="thisMonth" value="thisMonth">This Month</SelectItem>
          <SelectItem key="thisYear" value="thisYear">This Year</SelectItem>
        </Select>
      </div>
      <div className="grid grid-cols-1 lg:grid-cols-5 gap-4 mt-8">
        <div className="w-full flex flex-col gap-4 lg:row-span-3 lg:col-span-3">
          <Table aria-label="Task History Table">
            <TableHeader columns={columns}>
              {(column) => (
                <TableColumn key={column.uid} align="start">
                  {column.name}
                </TableColumn>
              )}
            </TableHeader>
            <TableBody items={paginatedData}>
              {(item: any) => (
                <TableRow key={item._id}>
                  {(columnKey) => (
                    <TableCell>
                      <RenderCell item={item} columnKey={columnKey} isAdmin={isAdmin} />
                    </TableCell>
                  )}
                </TableRow>
              )}
            </TableBody>
          </Table>

          <div className="flex items-center justify-between mt-4">
            <div className="flex flex-col gap-1">
              <span className="font-semibold">
                Total Time: {formatTotalTime(totalMinutesWorked)}
              </span>
              <span className="font-semibold">
                Total Amount : SEK {totalAmount.toFixed(2)}
              </span>
            </div>

            <div className="flex items-center justify-end gap-4">
              <Pagination
                total={Math.ceil(filteredData.length / itemsPerPage)}
                initialPage={1}
                page={page}
                onChange={setPage}
              />

              <Select
                placeholder="Items per page"
                className="w-[150px]"
                value={itemsPerPage.toString()}
                onChange={(e) => setItemsPerPage(Number(e.target.value))}
              >
                <SelectItem key="10" value="10">10 per page</SelectItem>
                <SelectItem key="20" value="20">20 per page</SelectItem>
                <SelectItem key="50" value="50">50 per page</SelectItem>
              </Select>
            </div>
          </div>
        </div>
        <div className="lg:row-span-2 lg:col-span-2 gap-2">
          {data.completedTask.slice().reverse().slice(0, 5).map((task: any) => (
            <div key={task._id} className={`p-4 bg-white min-w-[19rem]  max-w-[19rem] lg:w-full lg:min-w-full dark:bg-[#18181b] rounded-xl border-1 flex flex-col gap-4`}>
              <div className="flex justify-between items-center border-b pb-2">
                <div className="flex justify-between items-center">
                  {(() => {
                    const minutes = calculateTimeDiffInMinutes(task.workingStartTime, task.workingEndTime);
                    return formatTotalTime(minutes);
                  })()}
                </div>
                <div className='flex items-center gap-2'>
                  <Chip variant="flat" color={"success"} className="capitalize">
                    {formatStatus(task.status)}
                  </Chip>
                  <TaskModal
                    button={<EyeIcon size={20} color="#979797" />}
                    mode="View" data={task}
                  />
                </div>
              </div>

              <h5 className="text-lg font-semibold capitalize text-gray-800 dark:text-gray-100">
                {task.title}
              </h5>
              <div className="flex gap-x-1 -mt-2 relative ml-5">
                {task.userIds.map((user: any, index: number) => (
                  <Avatar
                    key={index}
                    src={user.profile}
                    size="sm"
                    className={`text-white bg-red-400 avatar-stacked`}
                    style={{ zIndex: task.userIds?.length + index }}
                  />
                ))}
              </div>
              <p className="text-sm text-gray-600 dark:text-gray-400 truncate">
                {task.task}
              </p>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};
