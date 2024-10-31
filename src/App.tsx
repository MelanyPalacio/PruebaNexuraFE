import { QueryClient, QueryClientProvider } from "react-query";
import EmployeePage from "./components/EmployeePage";


const App = () => {
  const queryClient = new QueryClient();

  return (
    <QueryClientProvider client={queryClient}>
      <EmployeePage />
    </QueryClientProvider>
  );
};

export default App;