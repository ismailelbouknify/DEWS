import pandas as pd
# import dask.dataframe as pd
import numpy as np
import matplotlib.pyplot as plt
import seaborn as sns
pd.set_option('display.max_columns', None)
pd.set_option('display.max_rows', None)
import warnings
warnings.filterwarnings('ignore')

Grades = pd.read_csv("/Dews/Data cleaning/Dataset/Data_prepared/Grades.csv")
Academics = pd.read_csv("/Dews/Data cleaning/Dataset/Data_prepared/Academics.csv")
Schools = pd.read_csv("/Dews/Data cleaning/Dataset/Data_prepared/Schools.csv")
Classes=pd.read_csv("/Dews/Data cleaning/Dataset/Data_prepared/classes.csv")
Student=pd.read_csv("/Dews/Data cleaning/Dataset/Data_prepared/Demographics__.csv")
Schools_public=Schools[Schools["typeEtab"]=="Public"]
Schools_public=list(Schools_public["cd_etab"])
Academics = Academics[Academics['cd_etab'].isin(Schools_public)] 
Academics.shape


Grades1=pd.merge(Grades, Academics[['id_eleve','id_annee','id_session', 'nefstat']],on=['id_eleve', 'id_annee','id_session'])

def agregate_Academics(df):
    """
    Aggregate academic data.

    Args:
        df (pandas.DataFrame): Input DataFrame containing academic data.

    Returns:
        pandas.DataFrame: Aggregated DataFrame.
    """
    # Group the DataFrame by 'id_eleve' and aggregate the data
    aggregated_df = df.groupby(['id_eleve', 'id_annee']).agg({
        'cd_etab': 'first',
        'id_classe': 'first',
        'MoyenneGen': 'first',
        'nefstat': 'first',
        'NbrJourAbsenceAutorise': 'sum',
        'NbrUniteAbsenceAutorise': 'sum',
        'NbrJourAbsenceNonAutorise': 'sum',
        'NbrUniteAbsenceNonAutorise': 'sum',
        'MCaRtable': 'first',
        'istayssir': 'first',
        'White_year': 'first',
        'target': 'first',

    })

    # Reset the index of the aggregated DataFrame
    aggregated_df = aggregated_df.reset_index()

    aggregated_df.columns = ['id_eleve', 'id_annee', 'cd_etab', 'id_classe',
                              'MoyenneGen','nefstat','NbrJourAbsenceAutorise',
                             'NbrUniteAbsenceAutorise', 'NbrJourAbsenceNonAutorise',
                             'NbrUniteAbsenceNonAutorise', 'MCaRtable', 'istayssir',
                             'White_year',"target"]
    
    #aggregated_df.fillna(-1, inplace=True)
    return aggregated_df

def agregate_Grades(df):
    """
    Aggregate grade data.

    Args:
        df (pandas.DataFrame): Input DataFrame containing grade data.

    Returns:
        pandas.DataFrame: Aggregated DataFrame.
    """
    # Group the DataFrame by 'id_eleve', 'id_annee' and aggregate the data
    aggregated_df = df.groupby(['id_eleve', 'id_annee']).agg({
        'Coefficients_CC_11': 'mean',
        'Coefficients_CC_12': 'mean',
        'Coefficients_CC_18': 'mean',
        'Coefficients_CC_19': 'mean',
        'Coefficients_CC_20': 'mean',
        'Coefficients_CC_23': 'mean',
        'Coefficients_CC_24': 'mean',
        'Coefficients_CC_26': 'mean',
        'NoteCC_11': 'mean',
        'NoteCC_12': 'mean',
        'NoteCC_18': 'mean',
        'NoteCC_19': 'mean',
        'NoteCC_20': 'mean',
        'NoteCC_23': 'mean',
        'NoteCC_24': 'mean',
        'NoteCC_26': 'mean',
    })  
    # Reset the index of the aggregated DataFrame
    aggregated_df = aggregated_df.reset_index()
    return aggregated_df

def clean_middle_1_2(df):
    
    """
    This function selects specific columns from the input DataFrame `df` and fills any missing values with -1.

    Args:
        df (pandas.DataFrame): Input DataFrame containing middle grades data.

    Returns:
        pandas.DataFrame: Cleaned DataFrame.
    """
    df = df[["id_eleve","id_annee","id_session","nefstat","Coefficients_CC_11","Coefficients_CC_12","Coefficients_CC_18","Coefficients_CC_19","Coefficients_CC_20",
    "Coefficients_CC_23","Coefficients_CC_24","Coefficients_CC_26", "NoteCC_11","NoteCC_12","NoteCC_18","NoteCC_19","NoteCC_20","NoteCC_23","NoteCC_24","NoteCC_26"]]
    df.fillna(-1, inplace=True)
    return df

def get_Grades(df):
    """

    This function pivots the input DataFrame `df` to transform it into a wide format, with each unique value in 'cd_matiere' becoming a separate column.
    
    Args:
        df (pandas.DataFrame): Input DataFrame containing grades data.

    Returns:
        pandas.DataFrame: Processed DataFrame with grades data pivoted.
    """
    
    # pivot the DataFrame
    df['cd_matiere'] = df['cd_matiere'].astype(int)
    pivoted_df = df.pivot_table(
        index=['id_eleve', 'id_annee', 'id_session','nefstat'],
        columns='cd_matiere',
        values=['NoteCC', 'Coefficients_CC'],
        aggfunc='first'
    )

    # flatten multi-level column index
    pivoted_df.columns = [f'{col[0]}_{col[1]}' for col in pivoted_df.columns]

    # reset the index to make primary keys columns again
    pivoted_df = pivoted_df.reset_index()
    return pivoted_df


# Filter Academics DataFrame for middle school 1, group Genaral
Academics_middle_1G = Academics[Academics['nefstat'] == "2A31101010"]

# Filter Academics DataFrame for middle school 1, group International
Academics_middle_1I = Academics[Academics['nefstat'] == "2A31101110"]

# Filter Academics DataFrame for middle school 2, group Genaral
Academics_middle_2G = Academics[Academics['nefstat'] == "2A32101010"]

# Filter Academics DataFrame for middle school 2, group International
Academics_middle_2I = Academics[Academics['nefstat'] == "2A32101110"]

# Filter Academics DataFrame for middle school 3, group Genaral
Academics_middle_3G = Academics[Academics['nefstat'] == "2A33101010"]

# Filter Academics DataFrame for middle school 3, group International
Academics_middle_3I = Academics[Academics['nefstat'] == "2A33101110"]

# Filter Grades1 DataFrame for middle school 1, group Genaral
Grades_middle_1G = Grades1[Grades1['nefstat'] == "2A31101010"]

# Filter Grades1 DataFrame for middle school 1, group International
Grades_middle_1I = Grades1[Grades1['nefstat'] == "2A31101110"]

# Filter Grades1 DataFrame for middle school 2, group Genaral
Grades_middle_2G = Grades1[Grades1['nefstat'] == "2A32101010"]

# Filter Grades1 DataFrame for middle school 2, group International
Grades_middle_2I = Grades1[Grades1['nefstat'] == "2A32101110"]

# Filter Grades1 DataFrame for middle school 3, group Genaral
Grades_middle_3G = Grades1[Grades1['nefstat'] == "2A33101010"]

# Filter Grades DataFrame for middle school 3, group International
Grades_middle_3I = Grades1[Grades1['nefstat'] == "2A33101110"]


############################### 1° Année Secondaire Collégial ###############################

# Clean and aggregate grades data for group General
Grades_middle_1G_cleaned = get_Grades(Grades_middle_1G)
Grades_middle_1G_cleaned = clean_middle_1_2(Grades_middle_1G_cleaned)
Grades_middle_1G_cleaned = agregate_Grades(Grades_middle_1G_cleaned)

# Aggregate academics data for group General
Academics_middle_1G = agregate_Academics(Academics_middle_1G)

# Print shapes of processed data
print(Academics_middle_1G.shape, Grades_middle_1G_cleaned.shape)

# Process grades and academics data for middle school 1, group International

# Clean and aggregate grades data for group International
Grades_middle_1I_cleaned = get_Grades(Grades_middle_1I)
Grades_middle_1I_cleaned = clean_middle_1_2(Grades_middle_1I_cleaned)
Grades_middle_1I_cleaned = agregate_Grades(Grades_middle_1I_cleaned)

# Aggregate academics data for group International
Academics_middle_1I = agregate_Academics(Academics_middle_1I)

# Print shapes of processed data
print(Academics_middle_1I.shape, Grades_middle_1I_cleaned.shape)

# Concatenate cleaned grades data for both groups
Grades_middle_1_cleaned = pd.concat([Grades_middle_1G_cleaned, Grades_middle_1I_cleaned])

# Add 'international' flag to academics data for each group
Academics_middle_1G["international"] = 0
Academics_middle_1I["international"] = 1

# Concatenate cleaned academics data for both groups
Academics_middle_1 = pd.concat([Academics_middle_1G, Academics_middle_1I])

# Print shapes of concatenated data
print(Grades_middle_1_cleaned.shape, Grades_middle_1I_cleaned.shape, Grades_middle_1G_cleaned.shape)
print(Academics_middle_1.shape, Academics_middle_1I.shape, Academics_middle_1G.shape)


############################### 2° Année Secondaire Collégial ###############################
# Process grades and academics data for middle school 2, group G (General), I (International)
# Clean and aggregate grades data for group G
Grades_middle_2G_cleaned = get_Grades(Grades_middle_2G)
Grades_middle_2G_cleaned = clean_middle_1_2(Grades_middle_2G_cleaned)
Grades_middle_2G_cleaned = agregate_Grades(Grades_middle_2G_cleaned)

# Aggregate academics data for group G
Academics_middle_2G = agregate_Academics(Academics_middle_2G)

# Print shapes of processed data
print(Academics_middle_2G.shape, Grades_middle_2G_cleaned.shape)

# Process grades and academics data for middle school 2, group I (International)

# Clean and aggregate grades data for group I
Grades_middle_2I_cleaned = get_Grades(Grades_middle_2I)
Grades_middle_2I_cleaned = clean_middle_1_2(Grades_middle_2I_cleaned)
Grades_middle_2I_cleaned = agregate_Grades(Grades_middle_2I_cleaned)

# Aggregate academics data for group I
Academics_middle_2I = agregate_Academics(Academics_middle_2I)

# Print shapes of processed data
print(Academics_middle_2I.shape, Grades_middle_2I_cleaned.shape)

# Concatenate cleaned grades data for both groups
Grades_middle_2_cleaned = pd.concat([Grades_middle_2G_cleaned, Grades_middle_2I_cleaned])

# Add 'international' flag to academics data for each group
Academics_middle_2G["international"] = 0
Academics_middle_2I["international"] = 1

# Concatenate cleaned academics data for both groups
Academics_middle_2 = pd.concat([Academics_middle_2G, Academics_middle_2I])

# Print shapes of concatenated data
print(Grades_middle_2_cleaned.shape, Grades_middle_2I_cleaned.shape, Grades_middle_2G_cleaned.shape)
print(Academics_middle_2.shape, Academics_middle_2I.shape, Academics_middle_2G.shape)


filepath1 = '/Dews/Data cleaning/Dataset/Aggregated_data/College/Grades_middle_2.csv'
# Grades_middle_2_cleaned.to_csv(filepath1, index=False)
filepath2 = '/Dews/Data cleaning/Dataset/Aggregated_data/College/Academics_middle_2_.csv'
# Academics_middle_2["Level"]=8
Academics_middle_2.to_csv(filepath2, index=False)


############################### 3 Année Secondaire Collégial ###############################
# Function to process grades data for middle school students in grade 3, considering exams

def get_Grades_level_exam(df):
    # Convert 'cd_matiere' to integer type
    df['cd_matiere'] = df['cd_matiere'].astype(int)
    
    # Fill missing values in 'absence_exam' with 0
    df['absence_exam'].fillna(0, inplace=True)
    
    # Pivot the DataFrame
    pivoted_df = df.pivot_table(
        index=['id_eleve', 'id_annee', 'id_session', 'nefstat'],
        columns='cd_matiere',
        values=['NoteCC', 'Coefficients_CC', 'NoteExam', 'Coefficients_EXAM', 'absence_exam'],
        aggfunc='first'
    )
    
    # Flatten multi-level column index
    pivoted_df.columns = [f'{col[0]}_{col[1]}' for col in pivoted_df.columns]
    
    # Reset the index to make primary keys columns again
    pivoted_df = pivoted_df.reset_index()
    return pivoted_df

# Function to clean grades data for middle school students in grade 3

def clean_middle_3(df):
    df = df[["id_eleve", "id_annee", "id_session", "nefstat", "Coefficients_CC_11", "Coefficients_CC_12", 
             "Coefficients_CC_18", "Coefficients_CC_19", "Coefficients_CC_20", "Coefficients_CC_23", 
             "Coefficients_CC_24", "Coefficients_CC_26", "NoteCC_11", "NoteCC_12", "NoteCC_18", "NoteCC_19", 
             "NoteCC_20", "NoteCC_23", "NoteCC_24", "NoteCC_26", "NoteExam_11", "NoteExam_12", "NoteExam_18", 
             "NoteExam_19", "NoteExam_20", "NoteExam_23", "NoteExam_24", "NoteExam_26",
             "absence_exam_11", "absence_exam_12", "absence_exam_18", "absence_exam_19", "absence_exam_20", 
             "absence_exam_23", "absence_exam_24", "absence_exam_26"]]
    
    # Fill missing values with -1
    df.fillna(-1, inplace=True)
    return df

# Function to aggregate grades data for middle school students

def agregate_Grades(df):
    # Group the DataFrame by 'id_eleve', 'id_annee' and aggregate the data
    aggregated_df = df.groupby(['id_eleve', 'id_annee']).agg({
        'Coefficients_CC_11': 'mean', 'Coefficients_CC_12': 'mean', 'Coefficients_CC_18': 'mean', 
        'Coefficients_CC_19': 'mean', 'Coefficients_CC_20': 'mean', 'Coefficients_CC_23': 'mean', 
        'Coefficients_CC_24': 'mean', 'Coefficients_CC_26': 'mean', 'NoteCC_11': 'mean', 'NoteCC_12': 'mean', 
        'NoteCC_18': 'mean', 'NoteCC_19': 'mean', 'NoteCC_20': 'mean', 'NoteCC_23': 'mean', 'NoteCC_24': 'mean', 
        'NoteCC_26': 'mean', 'NoteExam_11': 'mean', 'NoteExam_12': 'mean', 'NoteExam_18': 'mean', 'NoteExam_19': 'mean', 
        'NoteExam_20': 'mean', 'NoteExam_23': 'mean', 'NoteExam_24': 'mean', 'absence_exam_11': 'max', 
        'absence_exam_12': 'max', 'absence_exam_18': 'max', 'absence_exam_19': 'max', 'absence_exam_20': 'max', 
        'absence_exam_23': 'max', 'absence_exam_24': 'max'
    })
    
    # Reset the index of the aggregated DataFrame
    aggregated_df = aggregated_df.reset_index()
    return aggregated_df

# Clean and aggregate grades data for group G
Grades_middle_3G_cleaned = get_Grades_level_exam(Grades_middle_3G)
Grades_middle_3G_cleaned = clean_middle_3(Grades_middle_3G_cleaned)
Grades_middle_3G_cleaned = agregate_Grades(Grades_middle_3G_cleaned)

# Aggregate academics data for group G
Academics_middle_3G = agregate_Academics(Academics_middle_3G)

# Print shapes of processed data
print(Academics_middle_3G.shape, Grades_middle_3G_cleaned.shape)

# Process grades and academics data for middle school students in grade 3, group I (International)

# Clean and aggregate grades data for group I
Grades_middle_3I_cleaned = get_Grades_level_exam(Grades_middle_3I)
Grades_middle_3I_cleaned = clean_middle_3(Grades_middle_3I_cleaned)
Grades_middle_3I_cleaned = agregate_Grades(Grades_middle_3I_cleaned)

# Aggregate academics data for group I
Academics_middle_3I = agregate_Academics(Academics_middle_3I)

# Print shapes of processed data
print(Academics_middle_3I.shape, Grades_middle_3I_cleaned.shape)

# Concatenate cleaned grades data for both groups
Grades_middle_3_cleaned = pd.concat([Grades_middle_3G_cleaned, Grades_middle_3I_cleaned])

# Add 'international' flag to academics data for each group
Academics_middle_3G["international"] = 0
Academics_middle_3I["international"] = 1

# Concatenate cleaned academics data for both groups
Academics_middle_3 = pd.concat([Academics_middle_3G, Academics_middle_3I])

# Print shapes of concatenated data
print(Grades_middle_3_cleaned.shape, Grades_middle_3I_cleaned.shape, Grades_middle_3G_cleaned.shape)
print(Academics_middle_3.shape, Academics_middle_3I.shape, Academics_middle_3G.shape)


filepath1 = '/Dews/Data cleaning/Dataset/Aggregated_data/College/Grades_middle_3.csv'
# Grades_middle_3_cleaned.to_csv(filepath1, index=False)
filepath2 = '/Dews/Data cleaning/Dataset/Aggregated_data/College/Academics_middle_3_.csv'
Academics_middle_3["Level"]=9
Academics_middle_3.to_csv(filepath2, index=False)