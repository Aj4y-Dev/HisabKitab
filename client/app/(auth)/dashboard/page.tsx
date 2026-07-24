import {
  TrendingUp,
  Package,
  Users,
  AlertCircle,
  ArrowUpRight,
  ArrowDownRight,
} from "lucide-react";

const stats = [
  {
    label: "Today's Sales",
    value: "Rs. 24,850",
    change: "+12.5%",
    trend: "up",
    icon: TrendingUp,
  },
  {
    label: "Total Products",
    value: "348",
    change: "+4 new",
    trend: "up",
    icon: Package,
  },
  {
    label: "Active Customers",
    value: "1,204",
    change: "+8.2%",
    trend: "up",
    icon: Users,
  },
  {
    label: "Khata Due",
    value: "Rs. 45,200",
    change: "18 pending",
    trend: "down",
    icon: AlertCircle,
    alert: true,
  },
];

const recentSales = [
  {
    customer: "Sita Sharma",
    item: "Rice - 25kg",
    amount: "Rs. 1,250",
    status: "Paid",
  },
  {
    customer: "Hari Thapa",
    item: "Cooking Oil - 5L",
    amount: "Rs. 950",
    status: "Khata",
  },
  {
    customer: "Gita Rai",
    item: "Sugar - 10kg",
    amount: "Rs. 620",
    status: "Paid",
  },
  {
    customer: "Bikash KC",
    item: "Wheat Flour - 20kg",
    amount: "Rs. 1,800",
    status: "Khata",
  },
];

const khataDue = [
  { name: "Hari Thapa", due: "Rs. 950", days: "Due in 2 days" },
  { name: "Bikash KC", due: "Rs. 1,800", days: "Due today" },
  { name: "Sunita Gurung", due: "Rs. 3,200", days: "Overdue 3 days" },
];

export default function DashboardPage() {
  return (
    <div className="space-y-6">
      <div>
        <h1 className="text-2xl font-bold text-navy dark:text-dark-text">
          Dashboard
        </h1>
        <p className="text-sm text-muted dark:text-dark-muted mt-1">
          Welcome back! Here is what is happening with your shop today.
        </p>
      </div>

      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
        {stats.map((stat) => {
          const Icon = stat.icon;
          return (
            <div
              key={stat.label}
              className="bg-white dark:bg-dark-surface border border-border dark:border-dark-border rounded-lg p-5"
            >
              <div className="flex items-center justify-between mb-3">
                <div
                  className={
                    stat.alert
                      ? "w-10 h-10 rounded-lg flex items-center justify-center bg-marigold-light dark:bg-marigold/20"
                      : "w-10 h-10 rounded-lg flex items-center justify-center bg-pale-blue-grey dark:bg-dark-surface-2"
                  }
                >
                  <Icon
                    size={20}
                    className={
                      stat.alert
                        ? "text-marigold-dark dark:text-marigold"
                        : "text-steel-blue dark:text-sky-accent"
                    }
                  />
                </div>
                <span
                  className={
                    stat.trend === "up"
                      ? "flex items-center gap-0.5 text-xs font-medium text-emerald-600 dark:text-emerald-400"
                      : "flex items-center gap-0.5 text-xs font-medium text-marigold-dark dark:text-marigold"
                  }
                >
                  {stat.trend === "up" ? (
                    <ArrowUpRight size={14} />
                  ) : (
                    <ArrowDownRight size={14} />
                  )}
                  {stat.change}
                </span>
              </div>
              <p className="text-2xl font-bold text-charcoal dark:text-dark-text">
                {stat.value}
              </p>
              <p className="text-sm text-muted dark:text-dark-muted mt-1">
                {stat.label}
              </p>
            </div>
          );
        })}
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        <div className="lg:col-span-2 bg-white dark:bg-dark-surface border border-border dark:border-dark-border rounded-lg overflow-hidden">
          <div className="px-5 py-4 border-b border-border dark:border-dark-border flex items-center justify-between">
            <h2 className="font-semibold text-charcoal dark:text-dark-text">
              Recent Sales
            </h2>
            <a
              href="/dashboard/sales"
              className="text-sm text-steel-blue dark:text-sky-accent hover:text-sky-accent"
            >
              View all
            </a>
          </div>
          <table className="w-full text-sm">
            <thead>
              <tr className="text-left text-muted dark:text-dark-muted border-b border-border dark:border-dark-border">
                <th className="px-5 py-3 font-medium">Customer</th>
                <th className="px-5 py-3 font-medium">Item</th>
                <th className="px-5 py-3 font-medium">Amount</th>
                <th className="px-5 py-3 font-medium">Status</th>
              </tr>
            </thead>
            <tbody>
              {recentSales.map((sale, i) => (
                <tr
                  key={i}
                  className="border-b border-border dark:border-dark-border last:border-0"
                >
                  <td className="px-5 py-3 text-charcoal dark:text-dark-text font-medium">
                    {sale.customer}
                  </td>
                  <td className="px-5 py-3 text-muted dark:text-dark-muted">
                    {sale.item}
                  </td>
                  <td className="px-5 py-3 text-charcoal dark:text-dark-text">
                    {sale.amount}
                  </td>
                  <td className="px-5 py-3">
                    <span
                      className={
                        sale.status === "Paid"
                          ? "text-xs font-semibold px-2 py-1 rounded-full bg-emerald-50 dark:bg-emerald-500/15 text-emerald-700 dark:text-emerald-400"
                          : "text-xs font-semibold px-2 py-1 rounded-full bg-marigold-light dark:bg-marigold/20 text-marigold-dark dark:text-marigold"
                      }
                    >
                      {sale.status}
                    </span>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>

        <div className="bg-white dark:bg-dark-surface border border-border dark:border-dark-border rounded-lg overflow-hidden">
          <div className="px-5 py-4 border-b border-border dark:border-dark-border flex items-center justify-between">
            <h2 className="font-semibold text-charcoal dark:text-dark-text">
              Khata Due Soon
            </h2>
            <a
              href="/dashboard/khata"
              className="text-sm text-steel-blue dark:text-sky-accent hover:text-sky-accent"
            >
              View all
            </a>
          </div>
          <div className="divide-y divide-border dark:divide-dark-border">
            {khataDue.map((khata, i) => (
              <div
                key={i}
                className="px-5 py-3.5 flex items-center justify-between"
              >
                <div>
                  <p className="text-sm font-medium text-charcoal dark:text-dark-text">
                    {khata.name}
                  </p>
                  <p className="text-xs text-muted dark:text-dark-muted">
                    {khata.days}
                  </p>
                </div>
                <span className="badge-due">{khata.due}</span>
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
}
