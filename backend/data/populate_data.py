import sqlite3
from sqlite3 import Error
import json
from datetime import datetime, timedelta
from random import randrange

f = open('./cities_air_port.json', 'r', encoding='utf-8')
AIRPORTS = json.load(f)
f.close()


def curate_flight_date(flight):
    flights = []
    base = datetime.today()
    for x in range(0, 6):
        flight_date = base + timedelta(days=x, hours=randrange(0, 25))
        flight['time'] = flight_date
        flights.append(flight)
    return flights


def create_connection(db_file):
    conn = None
    try:
        conn = sqlite3.connect(db_file)
    except Error as e:
        print(e)

    return conn


def fetch_all(conn, table_names):
    for table_name in table_names:
        sql = 'SELECT * FROM ' + table_name
        cur = conn.cursor()
        cur.execute(sql)
        print(cur.fetchall())


def delete_all_rows(conn, table_names):
    for table_name in table_names:
        sql = 'DELETE FROM ' + table_name
        cur = conn.cursor()
        cur.execute(sql)
        conn.commit()


def add_flights(conn, flights):
    sql = ''' INSERT INTO flight_system_flight(seats, booked_seats, departure, destination, time)
              VALUES(?,?,?,?,?) '''
    cur = conn.cursor()
    cur.executemany(sql, flights)
    conn.commit()
    return cur.lastrowid


def add_airports(conn, airports):
    sql = ''' INSERT INTO flight_system_airport(name, code, city, country)
              VALUES(?,?,?,?) '''
    cur = conn.cursor()
    cur.executemany(sql, airports)
    conn.commit()
    return cur.lastrowid


def curate_airports_data(airports):
    process_data = []
    for airport in airports:
        process_data.append((airport["name"], airport["code"],
                            airport["city"], airport["country"]))
    return process_data


def curate_flights(airports):
    all_flights = []
    for from_f in airports:
        for to_f in airports:
            if to_f['code'] != from_f['code']:
                flight = {
                    "seats": randrange(350, 450),
                    "booked_seats": 0,
                    "departure": from_f['code'],
                    "destination": to_f['code']
                }
                flights = curate_flight_date(flight)
                all_flights += flights

    process_data = []
    for data in all_flights:
        process_data.append(
            (data["seats"], data["booked_seats"], data["departure"], data["destination"], data["time"]))
    return process_data


def main():
    # create a database connection
    database = "../db.sqlite3"
    conn = create_connection(database)

    # clean up
    table_names = ['flight_system_flight', 'flight_system_airport']
    delete_all_rows(conn, table_names)

    # curate data
    airports = curate_airports_data(AIRPORTS)
    flights = curate_flights(AIRPORTS)

    # add rows
    airports_created = add_airports(conn, airports)
    flights_created = add_flights(conn, flights)

    # get rows
    fetch_all(conn, table_names)
    conn.close()


if __name__ == '__main__':
    main()
