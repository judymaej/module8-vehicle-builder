// importing classes from other files
import inquirer from "inquirer";
import Truck from "./Truck.js";
import Car from "./Car.js";
import Motorbike from "./Motorbike.js";
import Wheel from "./Wheel.js";

// define the Cli class
class Cli {
  vehicles: (Car | Motorbike | Truck)[];
  selectedVehicleVin: string | undefined;
  exit: boolean = false;

  // constructor to accept Truck and Motorbike objects as well
  constructor(vehicles: (Car | Motorbike | Truck)[]) {
    this.vehicles = vehicles;
  }

  // static method to generate a vin
  static generateVin(): string {
    return (
      Math.random().toString(36).substring(2, 15) +
      Math.random().toString(36).substring(2, 15)
    );
  }

  // method to choose a vehicle from existing vehicles
  chooseVehicle(): void {
    inquirer
      .prompt([
        {
          type: "list",
          name: "selectedVehicleVin",
          message: "Select a vehicle to perform an action on",
          choices: this.vehicles.map((vehicle) => {
            return {
              name: `${vehicle.vin} -- ${vehicle.make} ${vehicle.model}`,
              value: vehicle.vin,
            };
          }),
        },
      ])
      .then((answers) => {
        this.selectedVehicleVin = answers.selectedVehicleVin;
        this.performActions();
      });
  }

  // method to create a vehicle
  createVehicle(): void {
    inquirer
      .prompt([
        {
          type: "list",
          name: "vehicleType",
          message: "Select a vehicle type",
          choices: ["Car", "Motorbike", "Truck"], // Added Motorbike and Truck
        },
      ])
      .then((answers) => {
        const vehicleType = answers.vehicleType;

        // Prompt for common vehicle details
        inquirer
          .prompt([
            { name: "color", message: "Enter Color" },
            { name: "make", message: "Enter Make" },
            { name: "model", message: "Enter Model" },
            { name: "year", message: "Enter Year" },
            { name: "weight", message: "Enter Weight" },
            { name: "topSpeed", message: "Enter Top Speed" },
          ])
          .then((vehicleAnswers) => {
            let newVehicle;

            if (vehicleType === "Car") {
              newVehicle = new Car(
                Cli.generateVin(),
                vehicleAnswers.color,
                vehicleAnswers.make,
                vehicleAnswers.model,
                vehicleAnswers.year,
                vehicleAnswers.weight,
                vehicleAnswers.topSpeed,
                [new Wheel(), new Wheel(), new Wheel(), new Wheel()]
              );
              this.vehicles.push(newVehicle);
              this.startCli(); // Restart CLI
            } else if (vehicleType === "Motorbike") {
              newVehicle = new Motorbike(
                Cli.generateVin(),
                vehicleAnswers.color,
                vehicleAnswers.make,
                vehicleAnswers.model,
                vehicleAnswers.year,
                vehicleAnswers.weight,
                vehicleAnswers.topSpeed,
                [new Wheel(), new Wheel()]
              );
              this.vehicles.push(newVehicle);
              this.startCli(); // Restart CLI
            } else if (vehicleType === "Truck") {
              inquirer
                .prompt([
                  { name: "towingCapacity", message: "Enter Towing Capacity" },
                ])
                .then((truckAnswers) => {
                  newVehicle = new Truck(
                    Cli.generateVin(),
                    vehicleAnswers.color,
                    vehicleAnswers.make,
                    vehicleAnswers.model,
                    vehicleAnswers.year,
                    vehicleAnswers.weight,
                    vehicleAnswers.topSpeed,
                    [new Wheel(), new Wheel(), new Wheel(), new Wheel()],
                    truckAnswers.towingCapacity
                  );
                  this.vehicles.push(newVehicle);
                  this.startCli(); // Restart CLI
                });
            }
          });
      });
  }

  // method to perform actions on the selected vehicle
  performActions(): void {
    const selectedVehicle = this.vehicles.find(
      (vehicle) => vehicle.vin === this.selectedVehicleVin
    );

    if (!selectedVehicle) {
      console.log("Vehicle not found!");
      return;
    }

    inquirer
      .prompt([
        {
          type: "list",
          name: "action",
          message: "Select an action to perform",
          choices: [
            "Start vehicle",
            "Stop vehicle",
            "Print details",
            selectedVehicle instanceof Motorbike ? "Perform a wheelie" : null,
            selectedVehicle instanceof Truck ? "Tow another vehicle" : null,
            "Select or create another vehicle",
            "Exit",
          ].filter(Boolean), // Filter out null values
        },
      ])
      .then((answers) => {
        if (answers.action === "Start vehicle") {
          selectedVehicle.start();
        } else if (answers.action === "Stop vehicle") {
          selectedVehicle.stop();
        } else if (answers.action === "Print details") {
          selectedVehicle.printDetails();
        } else if (
          answers.action === "Perform a wheelie" &&
          selectedVehicle instanceof Motorbike
        ) {
          selectedVehicle.wheelie();
        } else if (
          answers.action === "Tow another vehicle" &&
          selectedVehicle instanceof Truck
        ) {
          this.findVehicleToTow(selectedVehicle);
        } else if (answers.action === "Select or create another vehicle") {
          this.startCli();
          return;
        } else {
          this.exit = true;
        }

        if (!this.exit) {
          this.performActions();
        }
      });
  }

  // method to find a vehicle to tow (specific to trucks)
  findVehicleToTow(truck: Truck): void {
    inquirer
      .prompt([
        {
          type: "list",
          name: "vehicleToTow",
          message: "Select a vehicle to tow",
          choices: this.vehicles.map((vehicle) => ({
            name: `${vehicle.vin} -- ${vehicle.make} ${vehicle.model}`,
            value: vehicle.vin,
          })),
        },
      ])
      .then((answers) => {
        const vehicleToTow = this.vehicles.find(
          (vehicle) => vehicle.vin === answers.vehicleToTow
        );

        if (vehicleToTow) {
          truck.tow(vehicleToTow);
        }

        this.performActions();
      });
  }

  // method to start the CLI
  startCli(): void {
    inquirer
      .prompt([
        {
          type: "list",
          name: "CreateOrSelect",
          message:
            "Would you like to create a new vehicle or perform an action on an existing vehicle?",
          choices: ["Create a new vehicle", "Select an existing vehicle"],
        },
      ])
      .then((answers) => {
        if (answers.CreateOrSelect === "Create a new vehicle") {
          this.createVehicle();
        } else {
          this.chooseVehicle();
        }
      });
  }
}

// export the Cli class
export default Cli;

