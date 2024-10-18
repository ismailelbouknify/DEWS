import pandas as pd
import numpy as np
import matplotlib.pyplot as plt
import seaborn as sns
pd.set_option('display.max_columns', None)
pd.set_option('display.max_rows', None)
import warnings
warnings.filterwarnings('ignore')


Academics = pd.read_csv("/Dews/Data cleaning/Dataset/Data_prepared/Academics.csv")
Academics=Academics.drop_duplicates(['id_eleve','id_annee'])
Academics=Academics[['id_eleve','id_annee','target']]
Academics['id_annee'] = Academics['id_annee'] - 1
Academics.shape

Schools = pd.read_csv("/Dews/Data cleaning/Dataset/Data_prepared/Schools.csv")
Classes=pd.read_csv("/Dews/Data cleaning/Dataset/Data_prepared/classes.csv")
Student=pd.read_csv("/Dews/Data cleaning/Dataset/Data_prepared/Demographics_translated.csv")
Student=Student.drop(['profession_pere', 'profession_mere'], axis=1)
Student.rename(columns={'profession_pere_translated': 'profession_pere', 'profession_mere_translated': 'profession_mere'}, inplace=True)

Student=pd.read_csv("/Dews/Data cleaning/Dataset/Data_prepared/Demographics_translated.csv")

Student=Student.drop(['profession_pere', 'profession_mere'], axis=1)
Student.rename(columns={'profession_pere_translated': 'profession_pere', 'profession_mere_translated': 'profession_mere'}, inplace=True)
filepath = '/Dews/Data cleaning/Dataset/Data_prepared/Demographics__.csv'
Student.to_csv(filepath, index=False)


import pandas as pd
from sklearn.preprocessing import MinMaxScaler

def Feature_engineering(df):
    """
    Perform feature engineering on student data.

    Parameters:
    df (DataFrame): Input DataFrame containing student data.

    Returns:
    DataFrame: DataFrame with engineered features.
    """

    # Step 1: Sort the students within each class based on 'moynnegen'
    df.sort_values(by=['id_classe', 'MoyenneGen'], ascending=[True, False], inplace=True)
    
    # Step 2: Assign 'classment' based on sorted order
    df['Classment_class'] = df.groupby('id_classe').cumcount() + 1

    # Step 3: Calculate the number of students with 'target' == 1 in the same class
    df['Nb_class_failure'] = df.groupby('id_classe')['target'].transform(lambda x: (x == 1).sum())
    
    # Step 4: Calculate the number of students with 'target' == 2 in the same class
    df['Nb_class_dropout'] = df.groupby('id_classe')['target'].transform(lambda x: (x == 2).sum())

    # Fill NaN values with 0
    df['Nb_class_failure'].fillna(0, inplace=True)
    df['Nb_class_dropout'].fillna(0, inplace=True)

    return df

def get_student_data(df, id_eleve):
    """
    Extract data for a specific student.

    Parameters:
    df (DataFrame): Input DataFrame containing student data.
    id_eleve (int): Student ID.

    Returns:
    DataFrame: DataFrame containing data for the specified student.
    """
    student_data = df[df['id_eleve'] == id_eleve]
    return student_data

def rename(df):
    """
    Rename columns in the DataFrame with a suffix.

    Parameters:
    df (DataFrame): Input DataFrame.

    Returns:
    DataFrame: DataFrame with renamed columns.
    """
    # Define columns to exclude from renaming
    exclude_columns = ['id_eleve', 'id_annee', 'nefstat', 'cd_etab', 'id_classe']
    
    # Create a dictionary of column names with the "_i1" suffix
    new_columns = {col: col + '_i1' for col in df.columns if col not in exclude_columns}
    
    # Rename columns
    df = df.rename(columns=new_columns)
    return df

def join_Academics(df,Classes,Schools,Grades_Level,Student):
    """
    Join student data with other relevant datasets.

    Parameters:
    df (DataFrame): Input DataFrame containing student data.

    Returns:
    DataFrame: DataFrame containing joined data.
    """
    # Merge with 'Classes' DataFrame
    df = pd.merge(df, Classes, on=['nefstat', 'id_classe', 'id_annee', 'cd_etab'], how='left')
    
    # Merge with 'Schools' DataFrame
    df = pd.merge(df, Schools, on=['cd_etab'], how='left')
    
    # Drop 'nefstat' column
    df = df.drop(['nefstat'], axis=1)
    
    # Merge with 'Grades_Level' DataFrame
    df = pd.merge(df, Grades_Level, on=['id_eleve', 'id_annee'], how='left')
    
    # Rename columns
    df = rename(df)
    
    
    # Merge with 'Student' DataFrame
    df = pd.merge(df, Student, on=['id_eleve'], how='left')
    
    # Drop rows with NaN values in specific columns
    df = df.dropna(subset=['Coefficients_CC_11_i1', 'Coefficients_CC_12_i1',
                           'Coefficients_CC_18_i1', 'Coefficients_CC_19_i1',
                           'Coefficients_CC_20_i1', 'Coefficients_CC_23_i1',
                           'Coefficients_CC_24_i1', 'Coefficients_CC_26_i1', 
                           'NoteCC_11_i1', 'NoteCC_12_i1', 'NoteCC_18_i1', 
                           'NoteCC_19_i1', 'NoteCC_20_i1', 'NoteCC_23_i1', 
                           'NoteCC_24_i1', 'NoteCC_26_i1'])
    
    # Fill NaN values with -1
    df.fillna(-1, inplace=True)
    
    return df

Academics_Level = pd.read_csv('/Dews/Data cleaning/Dataset/Aggregated_data/College/Academics_middle_1.csv')
Grades_Level = pd.read_csv('/Dews/Data cleaning/Dataset/Aggregated_data/College/Grades_middle_1.csv')
Academics_Level['nefstat'] = Academics_Level['nefstat'].astype(str)

# Perform feature engineering on Academics data & # Join Academics data with other relevant datasets
Academics_Level = Feature_engineering(Academics_Level)
Academics_Level1=join_Academics(Academics_Level,Classes,Schools,Grades_Level,Student)

filepath = '/Dews/Data cleaning/Dataset/Data_middle_1.csv'
Academics_Level1['Level']=7
Academics_Level1.to_csv(filepath, index=False)

Academics_Level = pd.read_csv('/Dews/Data cleaning/Dataset/Aggregated_data/College/Academics_middle_2.csv')
Grades_Level = pd.read_csv('/Dews/Data cleaning/Dataset/Aggregated_data/College/Grades_middle_2.csv')

# Perform feature engineering on Academics data & # Join Academics data with other relevant datasets
Academics_Level = Feature_engineering(Academics_Level)
Academics_Level1=join_Academics(Academics_Level,Classes,Schools,Grades_Level,Student)

filepath = '/Dews/Data cleaning/Dataset/Data_middle_2.csv'
Academics_Level1['Level']=8
Academics_Level1.to_csv(filepath, index=False)

Academics_Level = pd.read_csv('/Dews/Data cleaning/Dataset/Aggregated_data/College/Academics_middle_3.csv')
Grades_Level = pd.read_csv('/Dews/Data cleaning/Dataset/Aggregated_data/College/Grades_middle_3.csv')

# Perform feature engineering on Academics data & # Join Academics data with other relevant datasets
Academics_Level = Feature_engineering(Academics_Level)
Academics_Level1=join_Academics(Academics_Level,Classes,Schools,Grades_Level,Student)

filepath = '/Dews/Data cleaning/Dataset/Data_middle_3.csv'
Academics_Level1['Level']=9
Academics_Level1.to_csv(filepath, index=False)