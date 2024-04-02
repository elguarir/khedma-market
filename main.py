import mysql.connector
import pandas as pd
from sklearn.neighbors import NearestNeighbors
from sklearn.feature_extraction.text import TfidfVectorizer
from flask import Flask, request, jsonify
import math
# mysql://root:moha@localhost:3306/khedma-market
# Establish connection to MySQL database
connection = mysql.connector.connect(
    host="localhost",
    user="root",
    password='moha',
    database="khedma-market",
    port="3306",
    auth_plugin='mysql_native_password'
)

# Retrieve gig data from the database
query = "SELECT id, title FROM gigs"  # Fetch both gig ID and title
cursor = connection.cursor()
cursor.execute(query)
data = cursor.fetchall()
print(data)
# Close connection
cursor.close()
connection.close()


column_names = ['id', 'title']
data_df = pd.DataFrame(data, columns=column_names)
data_df=data_df.dropna()
data_df=data_df.reset_index()
print(data_df)



vectorizer = TfidfVectorizer()
X = vectorizer.fit_transform(data_df['title'])
print(X)

# Train KNN model
k=int(math.sqrt(len(data_df)))
if k%2!=0:
    k=k-1
if k == 0:
    k = 1

knn_model = NearestNeighbors(n_neighbors=k, metric='cosine')
knn_model.fit(X)


app = Flask(__name__)

@app.route('/recommend', methods=['POST'])
def recommend_gigs():
    query = request.json['query']
    query_vector = vectorizer.transform([query])
    distances, indices = knn_model.kneighbors(query_vector)
    recommended_gigs = []

    for idx in indices[0]:
        gig_id = data_df['id'][idx] 
        gig_title = data_df['title'][idx]
        recommended_gigs.append({'id': gig_id, 'title': gig_title})
        
    return jsonify(recommended_gigs)

if __name__ == '__main__':
    app.run(debug=True)

