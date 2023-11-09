# Models, Routes and Controllers are implemented like so:

  ## Models:
    User:
      - _id (unique, auto-generated)
      - pass_id (unique)
      - first_name
      - last_name
      - age
      - phone_number (unique)
      - address
    Pass:
      - _id (unique, auto-generated)
      - level (1 to 5)
      - created_at (auto-generated)
      - updated_at (auto-generated)
    Place:
      - address
      - phone_number (unique)
      - required_pass_level (1 to 5)
      - requied_age_level
  ## Routes
    userRoutes:
      - '/users' (post)
      - '/users' (get)
      - '/users/{id}' (get)
      - '/users/{id}' (put)
      - '/users/{id}' (delete)
      - '/users/{id}/access' (post)
      - '/users/{id}/places' (get)
    passRoutes:
      - 'passes' (post)
      - 'passes' (get)
      - 'passes/{id}' (get)
      - 'passes/{id}' (put)
      - 'passes/{id}' (delete)
    placeRoutes:
      - 'places' (post)
      - 'places' (get)
      - 'places/{id}' (get)
      - 'places/{id}' (put)
      - 'places/{id}' (delete)
  ## Controllers
    userController:
      - get
      - create
      - update
      - delete
      - getById
      - getAccess
      - getPlaces
    passController:
      - get
      - create
      - update
      - delete
      - getById
    placeController:
      - get
      - create
      - update
      - delete
      - getById

# Swagger

  By going to '/api-docs' route, you'll end to the swagger page. There, you'll found a CRUD that allows the user to interact with the Database by Creating, Reading, Updating or Deleting data.
  
  ## Collections:
    - Users
    - Passes
    - Places

  ## Schemas:
    - Pass (the data the passController needs to interact with a pass):
    - PassResponse (the data received back from the Database on each pass's interactions)
    - Place (the data the placeController needs to interact with a place):
    - PlaceResponse (the data received back from the Database on each place's interactions)
    - User (the data the userController needs to interact with a user):
    - UserResponse (the data received back from the Database on each user's interactions)
    - UserAccess (the data the userController needs to check if the user has the access to a place):
    - UserAccessResponse (the data received back from the Database on if the user has the access to the place)


