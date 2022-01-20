import { createTrain, listTrains, deleteTrain } from "./src/client";
import {
  OperatorMap,
  TrainTypeMap,
} from "./src/generated/client/proto/train_api_pb";

const form: HTMLFormElement = document.querySelector("#create-train-form");
const deleteTrainForm: HTMLFormElement =
  document.querySelector("#delete-train-form");
const trainList: HTMLFormElement = document.querySelector("#train-list");
const getTrainsButton = document.querySelector("#get-trains-button");
const deleteTrainButton = document.querySelector("#delete-train-button");

const operatorMapping = {
  0: "Unspecified",
  1: "South Western Railway",
  2: "Thameslink",
  3: "East Coast Trains",
};

const trainTypeMapping = {
  0: "Unspecified",
  1: "High Speed",
  2: "Regular",
};

const trainIcon = {
  0: 128642,
  1: 128645,
  2: 128648,
};

form.onsubmit = () => {
  const formData = new FormData(form);

  try {
    const name = formData.get("name") as string;
    const trainType = parseInt(
      formData.get("train-type") as string
    ) as TrainTypeMap[keyof TrainTypeMap];
    const operator = parseInt(
      formData.get("operator") as string
    ) as OperatorMap[keyof OperatorMap];
    const coachCount = parseInt(formData.get("coach-count") as string);
    const catering = formData.get("catering") === "on";

    createTrain(name, trainType, operator, coachCount, catering, (err, _) => {
      if (err) {
        alert(`An error occurred creating the train: ${err.message}`);
      } else {
        alert("Train created successfully");
      }
    });
  } catch (error) {
    alert("Invalid input");
  }

  return false; // prevent reload
};

getTrainsButton.addEventListener("click", () => {
  listTrains((err, response) => {
    if (err) {
      alert(`An error occurred getting trains: ${err.message}`);
    } else {
      trainList.innerHTML = response
        .getTrainsList()
        .map(
          (t) => `
          <div class="train">
            <div>
              <div>ID: <b>${t.getId()}</b></div>
              <div>Name: <b>${t.getName()}</b></div>
              <div>Train Type: <b>${
                trainTypeMapping[t.getTrainType()]
              }</b></div>
              <div>Operator: <b>${operatorMapping[t.getOperator()]}</b></div>
              <div>Coach Count: <b>${t.getCoachCount()}</b></div>
              <div>Catering: <b>${t.getCatering() ? "Yes" : "No"}</b></div>
            </div>
            <div style="font-size:80px">&#${trainIcon[t.getTrainType()]};</div>
          </div>`
        )
        .join("");
    }
  });
});

deleteTrainButton.addEventListener("click", () => {
  const formData = new FormData(deleteTrainForm);
  const id = Number(formData.get("train-id") as string);

  deleteTrain(id, (err, _) => {
    if (err) {
      alert(`Error deleting train: ${err.message}`);
    } else {
      alert("Successfully deleted train");
    }
  });

  return false;
});
