import Dashboard from 'app/screens/Dashboard';

import { AuthWrapper } from 'pages/authWrapper';

export default function DashboardPage() {
    return (
        <>
            <Dashboard />
        </>
    )
}

DashboardPage.getLayout = function getLayout(page: any) {
    return <AuthWrapper>{page}</AuthWrapper>;
};
