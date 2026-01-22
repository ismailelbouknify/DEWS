# DEWS

AI-based identification and support of at-risk students: A case study of the Moroccan education system

## Overview

The DEWS (Dropout Early Warning System) application analyzes academic and demographic data to predict student dropouts after one or two years. It also provides interactive dashboards for comprehensive data visualization, including school-specific insights. This repository contains the backend infrastructure, including machine learning models, ensuring efficient functionality and high performance.

## Table of Contents

1. [Getting Started](#getting-started)
2. [Data Processing](#data-processing)
3. [Frontend Setup](#frontend-setup)
4. [Backend Setup](#backend-setup)
5. [Running the Application](#Running-the-Application)

## Getting Started

To get started with the DEWS application, follow the instructions below to set up the backend, run Elasticsearch, and use the application.

### Prerequisites

Before starting, ensure you have the following installed:

- Python 3.7+
- Docker
- Java Development Kit (JDK) 11+

### Installation

#### Step 1: Install JDK

The DEWS application requires JDK to run Elasticsearch. Follow these steps to install the JDK:

1. Visit the [Oracle JDK download page](https://www.oracle.com/java/technologies/javase-downloads.html) or install OpenJDK by running the following command:

   ```bash
   sudo apt update
   sudo apt install openjdk-11-jdk
   ```

2. Verify the installation:

   ```bash
   java -version
   ```

#### Step 2: Install Elasticsearch with Docker

To run Elasticsearch, you need to set up a Docker container for it.

1. **Installation:**
   - Make sure Docker is installed. If not, follow the [Docker installation guide](https://docs.docker.com/get-docker/).
   - Pull the official Elasticsearch image from Docker Hub and run it:
     
     ```bash
     docker pull docker.elastic.co/elasticsearch/elasticsearch:8.10.0
     ```
     
     Then run Elasticsearch with the following command:
     
     ```bash
     docker run -d --name elasticsearch \
       -e "discovery.type=single-node" \
       -e "ELASTIC_PASSWORD=your_password" \
       -p 9200:9200 \
       docker.elastic.co/elasticsearch/elasticsearch:8.10.0
     ```

2. **Configuration:**
   - After the installation, you will receive a key to access the Elasticsearch instance. Replace all occurrences of `ELASTIC_PASSWORD` in the project configuration files with this key.

#### Step 3: Clone the Repository

1. **Clone the repository:**
   
   ```bash
   git clone https://github.com/ismailelbouknify/DEWS.git
   cd DEWS
   ```

#### Step 4: Install Dependencies

1. **Install the required Python dependencies:**
   
   ```bash
   pip install -r requirements.txt
   ```

## Data Processing

This section provides step-by-step instructions for running the data processing scripts. These scripts are responsible for cleaning, aggregating, and joining the data. Ensure that your environment is properly set up, with all required dependencies installed.

### Running the Script (Cleaning, Aggregating, and Joining)

1. **Run the Data Cleaning Script:**
   
   The `Cleaning.py` script is used to clean raw data. This script handles tasks such as removing duplicates, filling missing values, and normalizing data formats.

   ```bash
   python DEWS/Data_cleaning/Cleaning.py
   ```

2. **Run the Data Aggregation Script:**
   
   After cleaning the data, run the `Script_Aggregation_middle.py` script. This script performs data aggregation, such as grouping the data by certain criteria and computing statistics (e.g., sums, averages) for each group.

   ```bash
   python DEWS/Data_cleaning/Script_Aggregation_middle.py
   ```

3. **Run the Data Joining Script:**
   
   Once the data has been aggregated, run the `Script_Join_data_middle.py` script to merge different datasets into one final dataset.

   ```bash
   python DEWS/Data_cleaning/Script_Join_data_middle.py
   ```

### Elasticsearch Database Setup

This section outlines the steps for creating and storing your cleaned and joined data in an Elasticsearch database. The cleaned database will be used for visualization and dashboards, and the joined database will be used for inference and machine learning model predictions.

#### Running the Database Creation Scripts

1. **Create the Joined Database for Inference (ML Models and Inference):**
   
   The `createdbinference.py` script is used to store the joined data, which is essential for inference and running machine learning models.

   Make sure the Elasticsearch service is running.

   Run the `createdbinference.py` script to store the joined data for inference:

   ```bash
   python DEWS/Data_cleaning/createdbinference.py
   ```

#### Verifying Data in Elasticsearch

Once you’ve run the scripts, you can verify that the data has been correctly stored in Elasticsearch by using `curl` or by accessing the Elasticsearch API.

To verify the joined data for inference:

```bash
curl -X GET "localhost:9200/inference_data/_search?pretty"
```

You should see the documents you indexed in the Elasticsearch response.

## Running the Application

### Elasticsearch Database
You can run it on Docker or you can use the following command:

```bash
docker run elasticsearch
```

Make sure Elasticsearch is properly configured and running before starting the backend and frontend services.

### Backend

1. **Start the development server:**
   
   ```bash
   cd /Dews/BackendDews/backend_dews
   python manage.py runserver
   ```

2. **Access the application:**
   
   Open your web browser and navigate to `http://127.0.0.1:8000/` to access the application.

### Frontend

You can launch the frontend interface, which is implemented using Angular, by following these steps:

1. **Install the required dependencies:**

   ```bash
   cd /Dews/Frontend/
   npm install
   ```

2. **Start the development server:**

   ```bash
   npm run start
   ```

This will launch the frontend interface, and you can access it in your browser at `http://localhost:4200`.

## GitHub Repository Structure

Here is an organized structure for your GitHub repository:

```
DEWS/
├── BackendDews                  # Backend Django application
│   └── backend_dews
│       ├── manage.py             # Django management script
│       ├── requirements.txt      # Backend dependencies
│       └── ...                   # Other backend files and folders
|
├── Frontend/                 # Frontend Angular application
│   ├── package.json          # Frontend dependencies
│   ├── src/                  # Angular source files
│   └── ...                   # Other frontend files and folders
|
├── Data_cleaning/            # Data processing scripts
│   ├── Cleaning.py
│   │── Script_Aggregation_middle.py
│   │── Script_Join_data_middle.py
│   │── createdbinference.py
│   └── ...
│
├── README.md                 # Project documentation
└── requirements.txt          # Project dependencies
```
This structure helps in keeping the backend, frontend, and data processing scripts organized, making it easier for others to understand and contribute to your project.


## Citation

Please cite if you use this repository

```
@inproceedings{elbouknify2024student,
  title={Student At-Risk Identification and Classification Through Multitask Learning: A Case Study on the Moroccan Education System},
  author={Elbouknify, Ismail and Berrada, Ismail and Mekouar, Loubna and Iraqi, Youssef and Bergou, EL Houcine and Belhabib, Hind and Nail, Younes and Wardi, Souhail},
  booktitle={International Conference on Artificial Intelligence in Education},
  pages={372--380},
  year={2024},
  organization={Springer}
}

@article{elbouknify2025ai,
  title={AI-based identification and support of at-risk students: A case study of the Moroccan education system},
  author={Elbouknify, Ismail and Berrada, Ismail and Mekouar, Loubna and Iraqi, Youssef and Bergou, El Houcine and Belhabib, Hind and Nail, Younes and Wardi, Souhail},
  journal={arXiv preprint arXiv:2504.07160},
  year={2025}
}
```

