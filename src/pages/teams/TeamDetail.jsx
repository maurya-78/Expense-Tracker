import React from 'react';
import { useParams } from 'react-router-dom';
import PageHeader from '../../components/layout/PageHeader';
import { Card, CardHeader, CardTitle, CardContent } from '../../components/ui/card';
import DataTable from '../../components/tables/DataTable';
import CategoryPieChart from '../../components/charts/CategoryPieChart';

const TeamDetail = () => {
  const { id } = useParams();

  // In a real app, fetch data based on ID
  const teamData = {
    name: "Engineering",
    members: [
      { id: 1, name: "Alex Rivera", role: "Senior Dev", email: "alex@startup.io" },
      { id: 2, name: "Jordan Smith", role: "DevOps", email: "jordan@startup.io" },
    ],
    spendingData: [
      { name: 'AWS', value: 4500 },
      { name: 'GitHub', value: 800 },
      { name: 'Vercel', value: 300 },
    ]
  };

  const columns = [
    { header: "Employee", accessor: "name" },
    { header: "Role", accessor: "role" },
    { header: "Email", accessor: "email" },
  ];

  return (
    <div className="space-y-6">
      <PageHeader title={`${teamData.name} Team`} subtitle="Detailed breakdown of department activity." />

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        {/* Left: Category Distribution */}
        <Card className="lg:col-span-1">
          <CardHeader>
            <CardTitle>Spending Breakdown</CardTitle>
          </CardHeader>
          <CardContent>
            <CategoryPieChart data={teamData.spendingData} />
          </CardContent>
        </Card>

        {/* Right: Member List */}
        <Card className="lg:col-span-2">
          <CardHeader>
            <CardTitle>Team Members</CardTitle>
          </CardHeader>
          <CardContent>
            <DataTable columns={columns} data={teamData.members} />
          </CardContent>
        </Card>
      </div>
    </div>
  );
};

export default TeamDetail;