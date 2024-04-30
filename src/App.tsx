import { createTheme, MantineProvider } from "@mantine/core";
import "@mantine/core/styles.css";
import CropTable from "./component/CropTable";
import CropYield from "./component/CropYield";

const theme = createTheme({
  /** Put your mantine theme override here */
});
function App() {
  return (
    <div className="App">
      <h2>Manufac</h2>
      <MantineProvider theme={theme}>
        <CropTable />
        <CropYield />
      </MantineProvider>
    </div>
  );
}

export default App;
