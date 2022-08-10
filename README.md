# Flight-Booking-System

Developed for Full-Stack-Cloud-Developer-Workshop project.

Requirements: `node.js` and `python 3.7 >`
Open Your Favorite Terminal And Go To The Folder You Wish To Install This Project:

## Start Django Server

1. `git clone https://github.com/danieltura/Flight-Booking-System.git`

2. `cd Flight-Booking-System/ `

3. `pipenv shell`

4. `pipenv install`

5. `cd backend/`

6. `python manage.py makemigrations flight_system`

7. `python manage.py migrate`

8. ` python manage.py runserver`

9. Hooray, the server is up and running at http://localhost:8000/api/

## Populate Flight and Airport Data: Only 5 airports for 5 days will be populated

9. Open another Terminal and cd to the backend folder

10. `python data/populate_data.py`

## Start React Frontend

11. `cd ../frontend/`

12. `npm i`

13. `npm start`

Hooray Hooray, Now the Frontend is also. Sign up with a user, log in, and fill free to book your next vacation and your trips!!!.

### Future Improvement

- Implement caching users to avoid logging in constantly
- Implement a way to book a round trip
- Fetch data from the real data source
- Iron out some glitch
- Deploy with Continuous Integration Continuous Delivery and Continuous Deployment
