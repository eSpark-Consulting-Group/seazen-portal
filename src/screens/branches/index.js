import React from "react";
import { useQuery } from "@tanstack/react-query";
import BranchHeader from "../../components/branches-hours/headerBranch";
import BranchContent from "../../components/branches-hours/content";
import RestaurantInfo from "../../components/branches-hours/branch";
import "./style.css";
import { Footer } from "../../components/footer/footerContent";
import getBranchesAndHours, {
  GET_BRANCHES_AND_HOURS_QUERY_KEY,
} from "../../api/restaurant/branches/getBranchesAndHours";
import { useParams } from "react-router-dom";

export const Branches = () => {
  const { id } = useParams();

  const [branchesAndHours, setBranchesAndHours] = React.useState(null);

  const {
    data: branchesAndHoursResponse,
    isLoading,
    isSuccess,
  } = useQuery({
    queryKey: [GET_BRANCHES_AND_HOURS_QUERY_KEY, id],
    queryFn: () => {
      return getBranchesAndHours(id);
    },
    enabled: !!id,
    onSuccess: (response) => {
      let branchesAndHours = [];
      if (response.data && response.data.length > 0) {
        response.data.forEach((branch) => {
          if (branch.branch_hours.length > 0) {
            branchesAndHours.push({
              name: branch.name_en,
              weekdayHours:
                branch.branch_hours[0].from_time +
                " - " +
                branch.branch_hours[0].to_time,
              weekendHours:
                branch.branch_hours[branch.branch_hours.length - 1].from_time +
                " - " +
                branch.branch_hours[branch.branch_hours.length - 1].to_time,
            });
          } else {
            branchesAndHours.push({
              name: branch.name_en,
              weekdayHours: "N/A",
              weekendHours: "N/A",
            });
          }
        });

        setBranchesAndHours(branchesAndHours);
      }
    },
  });

  return (
    <div className="branches-screen-container">
      <BranchHeader />
      <BranchContent />
      {branchesAndHours && <RestaurantInfo restaurants={branchesAndHours} />}
      <div className="branches-footer">
        <Footer showFooterSection />
      </div>
    </div>
  );
};
