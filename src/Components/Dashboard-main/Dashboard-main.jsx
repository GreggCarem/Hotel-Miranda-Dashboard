import { KPI } from "../KPI/KPI";
import styled from "styled-components";

const DashboarContainer = styled.div`
  padding: 1.5rem;
`;

export const DashboardMain = () => {
  return (
    <DashboarContainer>
      <KPI />
    </DashboarContainer>
  );
};
