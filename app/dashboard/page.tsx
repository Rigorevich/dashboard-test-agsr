import { Dashboard as DashboardComponent } from '@/components/features/Dashboard/Dashboard';
import { getDashboardData } from '@/utils/dashboardService';

export default async function Dashboard() {
  const data = await getDashboardData();

  return <DashboardComponent initialData={data} />;
}
