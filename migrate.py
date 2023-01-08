import os
from supabase import create_client, Client
import csv

os.environ['API_URL'] = 'link'
os.environ['API_KEY'] = 'key'

#connection to supabase
url: str = os.environ.get("API_URL")
key: str = os.environ.get("API_KEY")
supabase: Client = create_client(url, key)

with open("csv.csv", "r") as csv_file:
    data_reader = csv.reader(csv_file,delimiter=";", quotechar='"')
    list_of_csv = list(data_reader)
for i in range(len(list_of_csv)):
    img = list_of_csv[i][6].split("(")[1][:-1]
    employee = {"Name": list_of_csv[i][0],
                "Position": list_of_csv[i][1],
                "Nickname": list_of_csv[i][2],
                "Quote": list_of_csv[i][3],
                "Bio": list_of_csv[i][4],
                "Favorite Cake": list_of_csv[i][5],
                "Image":img,
                "Birthday": list_of_csv[i][7],
                "Hilary Swank hot or not": list_of_csv[i][8],
                "Age": list_of_csv[i][9],
                "Legal age": bool(int(list_of_csv[i][9]) > 17)}
    supabase.table("Nominees").insert(employee).execute()
    