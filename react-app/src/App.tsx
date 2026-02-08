import ListGroup from "./components/ListGroup";
import Alert from "./components/Alert";
import Buttons from "./components/Buttons";
import { useState } from "react";

function App() {
  let items = ["New York", "San Francisco", "Tokio", "London", "Paris"];
  //To show the alert only once click need to render with satte
  const [alertVisible, sertAlertVisible] = useState(false);

  const handleSelectItem = (item: string) => {
    console.log(item);
  };

  return (
    <div>
      {alertVisible && (
        <Alert onClose={() => sertAlertVisible(false)}> Hello World </Alert>
      )}
      <Buttons onClick={() => sertAlertVisible(true)}>My Button</Buttons>
      <ListGroup
        //we are passing static values
        items={items}
        heading="Cities"
        onSelectItem={handleSelectItem}
      />
    </div>
  );
}

export default App;
