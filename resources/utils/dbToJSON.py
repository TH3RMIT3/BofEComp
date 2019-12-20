import sqlite3
import json
from sqlite3 import Error
import random

DATABASE_FILE = "fulldata.db"

def create_connection(db_file):
    conn = None
    try:
        conn = sqlite3.connect(db_file)
        cur = conn.cursor()
        print(sqlite3.version)
        return(conn, cur)
    except Error as e:
        print(e)

queries = {
    "get_tables": "SELECT name from sqlite_master where type= 'table';",
    }

conn, cur = create_connection(DATABASE_FILE)
res = cur.execute(queries["get_tables"])
tables_array = res.fetchall()

data = {}

for table in tables_array:
    table = str(table)[2:-3]
    table_data_query = "SELECT * FROM '{}';".format(table)
    table_data = list(cur.execute(table_data_query).fetchall())
    table_columns_query = "PRAGMA table_info('{}');".format(table)
    table_columns = list(cur.execute(table_columns_query).fetchall())

    table_new_columns = []
    for column in table_columns:
        table_new_columns.append(column[1])

    table_parts = table.split("(")
    y_unit = table_parts[len(table_parts)-1][:-1]
    table_name = "(".join(table_parts[:-1])[:-1]

    datasets = []
    for row in table_data:
        r = random.randint(0,255)
        g = random.randint(0,255)
        b = random.randint(0,255)
        area_rgb_code = f"rgba({r},{g},{b}, 0.2)"
        line_rgb_code = f"rgba({r},{g},{b}, 1)"
        data_list = []
        for datum in list(row[1:]):
            datum = str(datum).strip()
            if datum == "-":
                data_list.append(0)
            else:
                data_list.append(float("".join(datum.split(","))))
        datasets.append([row[0], data_list, area_rgb_code, line_rgb_code])
        
    chart_data = {
        "labels": table_new_columns[1:],
        "chart_name": table_name,
        "chart_y_unit": y_unit,
        "datasets": datasets
    }

    data[table_name] = chart_data

with open('full_data.json', 'w') as outfile:
    json.dump(data, outfile)
