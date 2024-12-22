import { getOffersPerMonth, getPartnersPerMonth, getServicesPerTypePerMonth, getTaskStatusCounts, getUserRegistrationsPerMonth } from "@/actions/stats.action";
import UserRegistrationsChart from '@/components/charts/UserRegistrationsChart'
import OffersPerMonthChart from '@/components/charts/OffersPerMonthChart'
import PartnersPerMonthChart from '@/components/charts/PartnersPerMonthChart'
import TaskStatusPieChart from '@/components/charts/TaskStatusPieChart'
import ServicesPerTypeChart from '@/components/charts/ServicesPerTypeChart'

const Home = async () => {
  const { data } = await getUserRegistrationsPerMonth()
  const { data: offerData } = await getOffersPerMonth()
  const { data: partnerData } = await getPartnersPerMonth()
  const { data: taskData } = await getTaskStatusCounts()
  const { data: serviceData } = await getServicesPerTypePerMonth()
  return (
    <>
      <UserRegistrationsChart data={data} />
      <OffersPerMonthChart data={offerData} />
      <PartnersPerMonthChart data={partnerData} />
      <TaskStatusPieChart data={taskData} />
      <ServicesPerTypeChart data={serviceData} />
    </>
  )
};

export default Home;
