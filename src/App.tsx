import { createTheme, MantineProvider } from "@mantine/core";
import "@mantine/core/styles.css";
import CropTable from "./component/CropTable";
import CropYield from "./component/CropYield";
import "./App.css";
const theme = createTheme({
  /** Put your mantine theme override here */
});
function App() {
  return (
    <div className="App">
      <h2 className="heading">Manufac Crop Analysis</h2>
      <div>
        <MantineProvider theme={theme}>
          <CropTable />
          <CropYield />
        </MantineProvider>
      </div>
    </div>
  );
}

export default App;
