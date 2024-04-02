import { isBefore, startOfDay, subDays } from "date-fns";
import { DailyApplications } from "./daily-applications";
import { db } from "@/server/db";
import { format } from "date-fns";
import { ApplicationsByCities } from "./applications-by-cities";
import { getServerAuthSession } from "@/server/auth";
import { cities } from "@/lib/constants/cities";
import { shuffle } from "lodash";
type Props = {};

const CompanyDashboard = async (props: Props) => {
  let chartdata = await getApplicationChartData(7);
  let applicationsByCities = await getApplicationByCities();
  return (
    <div className="grid w-full gap-x-6 gap-y-6 md:grid-cols-2">
      <div>
        <DailyApplications chartdata={chartdata} />
      </div>
      <div>{/* <DailyApplications chartdata={chartdata} /> */}</div>
      <div>
        <ApplicationsByCities chartdata={applicationsByCities} />
      </div>
    </div>
  );
};

export default CompanyDashboard;

async function getApplicationChartData(interval: number) {
  let session = await getServerAuthSession();
  const endDate = startOfDay(new Date());
  const startDate = subDays(endDate, interval);

  const datesInRange: Date[] = [];
  for (let i = 0; i <= interval; i++) {
    const date = subDays(endDate, i);
    datesInRange.push(date);
  }

  const applications = await db.application.findMany({
    where: {
      createdAt: {
        gte: startDate,
        lte: endDate,
      },
      job: {
        company: {
          userId: session?.user.id,
        },
      },
    },
    select: {
      createdAt: true,
    },
  });

  console.log("applications:", applications);

  const applicationsByDay: Record<string, number> = {};
  applications.forEach((application) => {
    const dateKey = format(application.createdAt, "MMM dd");
    applicationsByDay[dateKey] = (applicationsByDay[dateKey] || 0) + 1;
  });

  const chartData = datesInRange.map((date) => {
    const dateKey = format(date, "MMM dd");
    const applicationsCount = applicationsByDay[dateKey] || 0;
    return {
      date: dateKey,
      Applications: applicationsCount,
    };
  });

  return chartData.reverse();
}

async function getApplicationByCities() {
  let session = await getServerAuthSession();
  let findLabel = (value: string) => {
    return cities.find((city) => city.value === value)?.label;
  };
  const applications = await db.application.findMany({
    where: {
      job: {
        company: {
          userId: session?.user.id,
        },
      },
    },
    select: {
      applicant: {
        select: {
          city: true,
        },
      },
    },
  });

  const applicationsByCity: Record<string, number> = {};
  applications.forEach((application) => {
    const city = application.applicant.city;
    if (city) {
      let cityLabel = findLabel(city);
      if (cityLabel) {
        applicationsByCity[cityLabel] =
          (applicationsByCity[cityLabel] || 0) + 1;
      }
    }
  });

  const chartData = Object.entries(applicationsByCity).map(([city, count]) => {
    return {
      name: city,
      value: count,
    };
  });

  const citiesToAdd = 5 - chartData.length;
  if (citiesToAdd > 0) {
    const allCities = cities.map((city) => city.label);
    const uniqueCities = allCities.filter(
      (city) => !chartData.find((data) => data.name === city),
    );
    const randomCities = shuffle(uniqueCities).slice(
      0,
      citiesToAdd,
    ) as string[];
    randomCities.forEach((city) => {
      chartData.push({ name: city, value: 0 });
    });
  }

  return chartData.slice(0, 5);
}
