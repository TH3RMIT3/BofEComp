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
        print("Table Data\n")
        lines = []
        while True:
            line = input()
            if line:
                lines.append(line)
            else:
                break
        text = '\n'.join(lines)
        table_data_formatted = format_data_insert(text, table_name)
        table_year_range_formatted = format_year_range(year_range)

        create_table_query = f"""CREATE TABLE '{table_name}' (
\t'row_name' varchar(255),
{table_year_range_formatted}
);"""
        print("="*50)
        print(create_table_query)
        print("="*50)
        print(table_data_formatted[0])
        print("="*50)
        print(table_data_formatted[len(table_data_formatted)-1])
        print("="*50)

        while True:
            ans = input("Submit(y/n)\n")
            if ans == "y":
                cur.execute(create_table_query)
                for query in table_data_formatted:
                    cur.execute(query)
                conn.commit()
                break
            elif ans == "n":
                break
            else:
                print("="*50)
                print("Please enter only y/n")
                print(ans)

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
    return split_text

def format_data_insert(data, table):
    each_line = data.split("\n")
    queries = []
    for line in each_line:
        line = line.split("\t")
        title = line[0]
        values = "', '".join(line[1:])
        query = f"INSERT INTO '{table}' VALUES ('{title}', '{values}');"
        queries.append(query)
    return queries

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
