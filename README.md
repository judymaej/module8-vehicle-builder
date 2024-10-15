# module8-vehicle-builder

# Vehicle Builder Application

## Description

The Vehicle Builder application allows users to create different types of vehicles (cars, trucks, and motorbikes) through a command-line interface (CLI). The application uses the **Inquirer** package to prompt users for vehicle details and actions specific to each type of vehicle. It also includes custom functionality for trucks and motorbikes, allowing users to build a variety of vehicle types based on their input.

This project demonstrates the use of TypeScript classes to represent different vehicle types and showcases object-oriented programming principles. The application has been implemented to meet all specified grading requirements and provides a smooth user experience for creating and managing vehicles.

## Table of Contents

- [Installation](#installation)
- [Classes and Functionality](#classes-and-functionality)
- [Usage](#usage)
- [Walkthrough Video](#walkthrough-video)
- [Grading Criteria](#grading-criteria)
- [License](#license)

## Installation

1. **Clone the repository** to your local machine:
   ```bash
   git clone https://github.com/your-username/vehicle-builder.git
   ```

## Navigate to the project directory:

```bash
   cd vehicle-builder
```

## Install Dependencies

(Ensure that Node.js is installed in your terminal)

```bash
- npm i
- npm install
- npm install inquirer
```

## Run the application

```bash
   - npm run build
   - npm run start
```

## Classes and Functionality

This application features the following classes:

### Car Class

Represents a basic vehicle with properties like make, model, and color.

### Truck Class

Inherits from the Car class and adds properties specific to trucks (e.g., payload capacity).
Provides a unique action that only trucks can perform.

### Motorbike Class

Inherits from the Car class and adds properties specific to motorbikes (e.g., engine displacement).

# Usage

When you invoke the application, you will be prompted to choose between creating a car, truck, or motorbike. Each vehicle type will prompt for unique details:

- Car: Basic vehicle details such as make, model, and color.
- Truck: In addition to the car details, the Truck class will prompt for additional truck-specific details like payload capacity.
- Motorbike: In addition to the car details, the Motorbike class will ask for motorbike-specific details like engine displacement.

After entering all the details, you will be able to view the completed vehicle with its respective properties.

## Walkthrough Video

Click [here](https://drive.google.com/file/d/1SOgkVg7klLg0hVTV5DJ6C1inlLmv76xs/view?usp=sharing) to watch a walkthrough video of the Vehicle Builder CLI application.

# License

This project is licensed under the MIT License. See the LICENSE file for more details.

Author: Judymae Jolibois

GitHub: judymaejolibois
