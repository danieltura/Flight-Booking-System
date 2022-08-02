from datetime import datetime, timedelta
from random import randrange

base = datetime.today()
for x in range(0, 6):
    flight_date = base + timedelta(days=x, hours=randrange(0, 25))
    print(flight_date)

Days = ["Monday", "Tuesday", "Wendesday", "Thursday", "Friday"]
