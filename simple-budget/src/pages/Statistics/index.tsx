import { Box, Flex, Heading, Spinner } from "@chakra-ui/react";
import { useExpenses } from "../../providers/ExpensesContext";
import { BottomMenu } from "../../components/BottomMenu";
import { useBudgets } from "../../providers/BudgetsContext";
import { useEffect, useState } from "react";
import { LineChart } from "../../components/Charts/lineChart";
import { PieChart } from "../../components/Charts/pieChart";
import { SideMenu } from "../../components/SideMenu";
import { useAuth } from "../../providers/AuthContext";
import { TopBar } from "../../components/TopBar";

export const Statistics = () => {
  const { listUserExpenses, getUserExpenses } = useExpenses();
  const { listBudgets } = useBudgets();
  const { user, accessToken } = useAuth();
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    getUserExpenses(user.id, accessToken);
    listBudgets(user.id, accessToken).then((resp) => setLoading(false));
  }, []);

  return (
    <>
      <Flex justifyContent="center">
        <TopBar />
        <BottomMenu />
        <SideMenu isSelected={"statistics"} />
        <Box w="70%">
          <Box m="20px 0" borderBottom="2px solid grey" w="90%">
            <Heading>Statistics</Heading>
          </Box>
          <Box m="auto" w="80%" className="paidografico">
            {loading ? (
              <Flex
                h="50vh"
                w="100%"
                alignItems="center"
                justifyContent="center"
                fontSize="60px"
              >
                <Spinner
                  thickness="6px"
                  speed="0.65s"
                  emptyColor="gray.350"
                  color="green.500"
                  size="xl"
                />
              </Flex>
            ) : (
              <>
                {listUserExpenses.length > 0 ? (
                  <PieChart />
                ) : (
                  <Heading>texto de voce não tem expenses aqui</Heading>
                )}
              </>
            )}
          </Box>
          <Box mt="30px" width="100%">
            <LineChart />
          </Box>
        </Box>
      </Flex>
    </>
  );
};
