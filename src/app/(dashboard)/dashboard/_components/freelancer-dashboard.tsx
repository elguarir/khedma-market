import { DailyImpressions } from "./daily-impressions";

type Props = {};

const FreelancerDashboard = async (props: Props) => {
  return (
    <div className="grid w-full md:grid-cols-2">
      <div>
        <DailyImpressions />
      </div>
    </div>
  );
};

export default FreelancerDashboard;
