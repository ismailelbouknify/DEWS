from sklearn.preprocessing import MinMaxScaler

def custom_normalize(x):
    return ((x - x.min()) / (x.max()-x.min()))

def normalize_group(group):
    scaler = MinMaxScaler()
    return pd.DataFrame(scaler.fit_transform(group), columns=group.columns, index=group.index)

def Feature_engineering(df):
    df=df[['id_annee','MoyenneGen_i1','NbrJourAbsenceAutorise_i1', 'NbrJourAbsenceNonAutorise_i1', 
      'target_i1','international_i1', 'Level_i1', 'failure_i1', 'Classment_class_i1',
       'MoyenneClasse_i1', 'NoteCC_11_i1',
       'NoteCC_12_i1', 'NoteCC_18_i1', 'NoteCC_19_i1', 'NoteCC_20_i1',
       'NoteCC_23_i1', 'NoteCC_24_i1', 'NoteCC_26_i1', 'id_genre',
       'datenaiseleve', 'Level',"DO_ETAB_i1"]]
    df['age'] = ( df['id_annee'] +2007)-df['datenaiseleve'] 
    df = df.drop(['datenaiseleve'], axis=1)
        
# Normalisation
    scaler = MinMaxScaler()
    columns_to_normalize=[ 'NbrJourAbsenceAutorise_i1', 'NbrJourAbsenceNonAutorise_i1','failure_i1', 'MoyenneClasse_i1','age','Level_i1','MoyenneGen_i1',
                          'NoteCC_11_i1','NoteCC_12_i1', 'NoteCC_18_i1', 'NoteCC_19_i1', 'NoteCC_20_i1','NoteCC_23_i1', 'NoteCC_24_i1', 'NoteCC_26_i1','Classment_class_i1']  
    df[columns_to_normalize] = scaler.fit_transform(df[columns_to_normalize])

# New features     
    df['Average_scientific_subjects_i1'] = df[['NoteCC_19_i1', 'NoteCC_20_i1', 'NoteCC_23_i1']].mean(axis=1)
    df['Average_literary_subjects_i1'] = df[['NoteCC_11_i1', 'NoteCC_12_i1', 'NoteCC_18_i1', 'NoteCC_24_i1']].mean(axis=1)
    return df
