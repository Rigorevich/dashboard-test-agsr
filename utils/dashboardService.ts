import fs from 'fs/promises';
import path from 'path';

import { Dashboard } from '@/types';

export const getDashboardData = async (): Promise<Dashboard> => {
  const filePath = path.join(process.cwd(), 'dashboard.json');
  const file = await fs.readFile(filePath, 'utf-8');
  return JSON.parse(file);
};

export const saveDashboardData = async (dashboard: Dashboard): Promise<void> => {
  const filePath = path.join(process.cwd(), 'dashboard.json');

  try {
    const json = JSON.stringify(dashboard, null, 2);
    await fs.writeFile(filePath, json, 'utf-8');
    console.log('Dashboard saved successfully.');
  } catch (error) {
    console.error('Failed to save dashboard data:', error);
  }
};
