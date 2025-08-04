 // src/types/ProjectOutcomes.ts 
import React from 'react';

export interface Metric {
  icon: React.ReactNode;
  value: string;
  label: string;
}

export interface DataPoint {
  day: string;
  last: number;
  current: number;
}

export interface DevicePoint {
  name: string;
  value: number;
}

export interface OutcomesKeys {
  labelVisitorsGrowth: string;
  visitorsGrowth: string;
  labelSalesGrowth: string;
  salesGrowth: string;
  labelCustomerSatisfactionGrowth: string;
  customerSatisfactionGrowth: string;
  labelBounceRate: string;
  bounceRate: string;
}
