import pandas as pd

df1 = pd.read_csv("/Dews/Data cleaning/Dataset/Data_middle_1.csv")
df2 = pd.read_csv("/Dews/Data cleaning/Dataset/Data_middle_2.csv")
df3 = pd.read_csv("/Dews/Data cleaning/Dataset/Data_middle_3.csv")

from elasticsearch import Elasticsearch, helpers
import pandas as pd

# Elasticsearch authentication credentials
ELASTIC_PASSWORD = "+TQ3lG=S3jAfZb7RE59j"

# Create the Elasticsearch client with authentication
# es = Elasticsearch("https://localhost:9200/", basic_auth=("elastic", ELASTIC_PASSWORD))

es = Elasticsearch(
    "https://localhost:9200/",
    basic_auth=("elastic", ELASTIC_PASSWORD),
    verify_certs=False,  # Disable SSL certificate verification
    ssl_show_warn=False  # Suppress SSL warnings
)

# Create a generator to yield documents in the required format
def doc_generator(df1):
    for index, document in df1.iterrows():
        yield {
            "_index": "data_middle_1",
            # "_type": "_doc",
            "_id": f"doc_{index}",
            "_source": document.to_dict(),
        }

# Use helpers.bulk() to index documents in bulk
try:
    res = helpers.bulk(es, doc_generator(df1))
    print(f"Indexed {res[0]} documents")
except Exception as e:
    print("Error:", e)

# Refresh the index to make the documents available for search
es.indices.refresh(index="data_middle_1")




# Create the index if it does not exist
if not es.indices.exists(index="data_middle_2"):
    es.indices.create(index="data_middle_2")

# Create a generator to yield documents in the required format
def doc_generator(df2):
    for index, document in df2.iterrows():
        yield {
            "_index": "data_middle_2",
            "_id": f"doc_{index}",
            "_source": document.to_dict(),
        }

# Use helpers.bulk() to index documents in bulk
try:
    res = helpers.bulk(es, doc_generator(df2))
    print(f"Indexed {res[0]} documents")
except Exception as e:
    print("Error:", e)

# Refresh the index to make the documents available for search
es.indices.refresh(index="data_middle_2")



# Create the index if it does not exist
if not es.indices.exists(index="data_middle_3"):
    es.indices.create(index="data_middle_3")

# Create a generator to yield documents in the required format
def doc_generator(df3):
    for index, document in df3.iterrows():
        yield {
            "_index": "data_middle_3",
            "_id": f"doc_{index}",
            "_source": document.to_dict(),
        }

# Use helpers.bulk() to index documents in bulk
try:
    res = helpers.bulk(es, doc_generator(df3))
    print(f"Indexed {res[0]} documents")
except Exception as e:
    print("Error:", e)

# Refresh the index to make the documents available for search
es.indices.refresh(index="data_middle_3")