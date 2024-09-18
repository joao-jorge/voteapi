# FUNCTIONALITIES.md

## Overview

This document outlines the core functionalities of the Voting API, including managing candidates and casting votes in an election. It provides detailed information about the available API endpoints, input validation, and error handling.

---

## Voting Functionalities

### 1. Cast a Vote

**Route**: `POST /api/vote/:idElection/:idUser/:idCandidate`  
**Description**: This functionality allows a user to cast a vote for a candidate in a specified election.

- **Request Parameters**:
  - `idElection`: The unique identifier of the election.
  - `idUser`: The unique identifier of the user who is voting.
  - `idCandidate`: The unique identifier of the candidate being voted for.

- **Request Body**:  
  No request body is required since the parameters are passed in the URL.

- **Functional Flow**:
  1. **Input Validation**: Ensures that `idElection`, `idUser`, and `idCandidate` are provided.
  2. **Election Existence Check**: Verifies that the election exists in the system.
  3. **Election Date Validation**: Ensures the election is currently ongoing by comparing the current date with the election’s start and end dates.
  4. **Candidate Existence Check**: Verifies that the candidate exists in the election.
  5. **User Existence Check**: Ensures the user exists in the system.
  6. **Duplicate Voting Prevention**: Checks whether the user has already voted in the election. If they have, the vote is not allowed.
  7. **Vote Creation**: If all checks pass, a new vote is created for the specified candidate and election.
  8. **User Election Tracking**: The election is added to the user's election history, preventing duplicate votes in future requests.

- **Response**:
  - Success:  
    ```json
    {
      "message": "User has successfully voted!"
    }
    ```
  - Error:  
    - `400 Bad Request`: Invalid input parameters or the user has already voted.
    - `404 Not Found`: Election, candidate, or user does not exist.
    - `500 Internal Server Error`: General server error.

---

## Candidate Management Functionalities

### 1. Create a Candidate

**Route**: `POST /candidates`  
**Description**: This functionality allows creating a new candidate for an election.

- **Request Body**:
  ```json
  {
    "name": "Candidate Name",
    "party": "Party Name"
  }

- **Functional Flow**:

  1. **Input Validation**: Ensures that both the name and party fields are provided and contain valid inputs.
  2. **Duplicate Candidate Check**: Verifies that no other candidate with the same party exists.
  2. **Candidate Creation**: If all validations pass, the candidate is created and stored in the database.

- **Response**:
  - Success:  
    ```json
    {
    "message": "Candidate created successfully",
    "candidate": { "name": "Candidate Name", "party": "Party Name" }
    }
    ```
  - Error:

    - `400 Bad Request`: Missing fields or invalid inputs.
    - `400 Bad Request`: A candidate with the same party already exists.
    - `500 Internal Server Error`: General server error.


### 2. List All Candidates

**Route**: `GET /candidates`
**Description**: This functionality allows fetching all candidates registered in the system.

- **Functional Flow**:
        Fetches all candidates from the database and returns them in the response.

- **Response**:
  - Success:  
    ```json

        [
          {
            "_id": "candidateId1",
            "name": "Candidate Name",
            "party": "Party Name"
          }
        ]
    ```
  - Error:
    - `400 Bad Request`: If no candidates are found.
    - `500 Internal Server Error`: General server error.

### 3. Get a Candidate by ID

**Route**: `GET /candidates/:id`
**Description**: This functionality allows fetching a specific candidate by their unique ID.

- **Request Parameters**:
    - `id`: The unique identifier of the candidate.

- **Functional Flow**:
        `ID Validation`: Ensures the provided id is a valid MongoDB ObjectId.
        `Candidate Fetching`: Fetches the candidate based on the provided ID.

- **Response**:
    - Success:  
      ```json

        {
          "_id": "candidateId",
          "name": "Candidate Name",
          "party": "Party Name"
        }
      ```
    - Error:
      - `400 Bad Request`: Invalid candidate ID format.
      - `404 Not Found`: Candidate not found.
      - `500 Internal Server Error`: General server error.

### 4. Delete a Candidate by ID

**Route**: `DELETE /candidates/:id`
**Description**: This functionality allows deleting a candidate from the system.

- **Request Parameters**:
    - `id`: The unique identifier of the candidate.

- **Functional Flow**:
    - `ID Validation`: Ensures the provided id is a valid MongoDB ObjectId.
    - `Candidate Fetching`: Fetches the candidate based on the provided ID.
    - `Candidate Deletion`: Deletes the candidate if found.

- **Response**:
    - Success:  
      ```json

        {
          "message": "Candidate deleted successfully",
          "deletedCandidate": {
            "_id": "candidateId",
            "name": "Candidate Name",
            "party": "Party Name"
          }
        }
      ```
    - Error:
      - `400 Bad Request`: Invalid candidate ID format.
      - `404 Not Found`: Candidate not found.
      - `500 Internal Server Error`: General server error.


### 5. Update a Candidate by ID

**Route**: `PUT /candidates/:id`  
**Description**: This functionality allows updating the information of a specific candidate.

- **Request Parameters**:
  - `id`: The unique identifier of the candidate.

- **Request Body**:
  ```json
  {
    "name": "Updated Candidate Name",
    "party": "Updated Party Name"
  }

- **Functional Flow**:
    - `ID Validation`: Ensures the provided id is a valid MongoDB ObjectId.
    - `Input Validation`: Ensures the name and party fields are provided and contain valid inputs.
    - `Candidate Fetching`: Fetches the candidate based on the provided ID.
    - `Candidate Update`: Updates the candidate's details if found.

- **Response**:
    - Success:  
      ```json

        {
          "message": "Candidate updated successfully",
          "updatedCandidate": {
            "_id": "candidateId",
            "name": "Updated Candidate Name",
            "party": "Updated Party Name"
          }
        }
      ```
    - Error:
      - `400 Bad Request`: Invalid candidate ID format.
      - `404 Not Found`: Candidate not found.
      - `500 Internal Server Error`: General server error.






















