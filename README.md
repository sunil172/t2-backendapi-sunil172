# t2-backendapi-sunil172
t2-backendapi-sunil172 created by GitHub Classroom

# Introduction
This is the Web based Application Program Interface-API for meeting management system which runs separately in backend server. This API program can only access by the front-end layer applications only. The front-end application may be the web based or mobile application based. The user can not directly access this API. So, by implementing the API the data layer is secure and protected by unnecessary, unwanted threads. 

# List of API
# /api/users/register 
This API is for registering the new user to the system. 
For registering the new user the following fields are required: 
- firstname
- designation
- contact
- organization
- org_address
- email 
- password

# /api/users/login
This API allows existing user for login to the system. 
Required fields are: 
- email
- password

# /api/schedule
This API allows user to select the all schedule, add new schedule and delete the schedules based on authorization rules. 
Required fields for select is: 
- Authorization header

Required fields for adding new schedule are: 
- Authorization header
- meeting_title
- meeting_desc
- date
- time
- venue
- attendees
	- participants.objectId
	- present_status
- agenda array
- decision array

Required fields for delete the schedule are: 
- Authorization header
- schedule object_id

# /api/schedule/:schedule_id
To select, update and delete the individual schedule list by schedule id.
Required field for select the individual schedule are: 
- Authorization header
- Schedule id

Required field for update the individual schedule are: 
- Authorization header
- schedule id
- meeting_title
- meeting_desc
- date
- time
- venue
- attendees
	- participants.objectId
	- present_status
- agenda array
- decision array

Required field for delete the individual schedule are: 
- Authorization header
- schedule id
# /api/schedule/:schedule_id/attendee
To select the all attendees, adding new attendee and delete the attendees of the specific schedule
Required fields for selecting attendees are: 
- Authorization header
- schedule id

Required fields for adding new attendee: 
- Authorization header
- schedule id
- participant object id
- present status

Required fields for delete attendee: 
- Authorization header
- schedule id

# /api/schedule/:schedule_id/attendee/:attendee_id
To select, update and delete the individual attendee from specific schedule

Required fields for selecting the individual attendee: 
- Authorization header
- schedule id
- attendee id

Required fields for updating the attendee status: 
- Authorization header
- schedule id
- attendee id 
- present status

Required fields for delete the attendee: 
- Authorization header
- schedule id
- attendee id

# /api/schedule/:schedule_id/agenda
To select the all agenda, adding new agenda and delete the agenda of the specific schedule
Required fields for selecting agenda are: 
- Authorization header
- schedule id

Required fields for adding new agenda: 
- Authorization header
- schedule id
- agenda title
- agenda description

Required fields for delete agenda: 
- Authorization header
- schedule id

# /api/schedule/:schedule_id/agenda/:agenda_id
To select, update and delete the individual agenda from specific schedule

Required fields for selecting the individual agenda: 
- Authorization header
- schedule id
- agenda id

Required fields for updating the agenda: 
- Authorization header
- schedule id
- agenda id 
- agenda title
- agenda description

Required fields for delete the agenda: 
- Authorization header
- schedule id
- agenda id

# /api/schedule/:schedule_id/decision
To select the all decision, adding new decision and delete the decision of the specific schedule
Required fields for selecting decision are: 
- Authorization header
- schedule id

Required fields for adding new decision: 
- Authorization header
- schedule id
- decision

Required fields for delete decision: 
- Authorization header
- schedule id

# /api/schedule/:schedule_id/decision/:decision_id
To select, update and delete the individual decision from specific schedule

Required fields for selecting the individual decision: 
- Authorization header
- schedule id
- decision id

Required fields for updating the decision:
- Authorization header
- schedule id
- decision id 
- decision

Required fields for delete the decision: 
- Authorization header
- schedule id
- decision id


# /api/participants
This API allows user to select the all the participants details, add new participants and delete the participants. 

Required fields for selecting participant is: 
- Authorization header

Required fields for adding new participant are: 
- Authorization header
- firstname
- designation
- contact
- organization
- org_address
- email 

Required fields for delete is: 
- Authorization header
- participant id

# /api/participants/:id
To select, update and delete the individual participant

Required fields for selecting the individual participant: 
- Authorization header
- participant id

Required fields for updating the participant: 
- Authorization header
- participant id
- firstname
- designation
- contact
- organization
- org_address
- email 

Required fields for delete the individual participant: 
- Authorization header
- Participant id





