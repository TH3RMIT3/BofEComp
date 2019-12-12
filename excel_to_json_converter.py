import sqlite3
from sqlite3 import Error

DATABASE_FILE = "fulldata.db"

def begin_entry():
    conn, cur = create_connection(DATABASE_FILE)
    while True:
        print("="*50)
        table_name = input("Table Name\n")
        print("="*50)
        year_range = input("Year Range\n")
        print("="*50)
        table_data = input("Table Data\n")
        table_data_formatted = format_data(table_data)
        table_year_range_formatted = format_year_range(year_range)
        query = f"""CREATE TABLE {table_name} (
\t'row_name' varchar(255),
{table_year_range_formatted}
);"""
        print("="*50)
        print(query)
        while True:
            ans = input("Submit(y/n)\n")
            if ans == "y":
                cur.execute(query)
                break
            elif ans == "n":
                break
            else:
                print("="*50)
                print("Please enter only y/n")

def create_connection(db_file):
    conn = None
    try:
        conn = sqlite3.connect(db_file)
        cur = conn.cursor()
        print(sqlite3.version)
        return(conn, cur)
    except Error as e:
        print(e)

def parse_input(string):
    split_text = string.split()
    output = split_text
    return output

format_data(data):
    data.split("\n")

def format_year_range(years):
    years_list = parse_input(years)
    query_part = ""
    length = len(years_list)
    for i in range(len(years_list)):
        year = years_list[i]
        if i != (length-1):
            query_part += f"\t'{year}' float,\n"
        else:
            query_part += f"\t'{year}' float"
    return query_part
        

if __name__ == "__main__":
    begin_entry()
