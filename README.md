# E-learning

_for kweb_

## DB Structure

#### User Schema

| name        | type       | ref       | meaning                        |
| ----------- | :--------- | :-------- | :----------------------------- |
| `isStudent` | Boolean    | x         | 학생일 경우 `true`             |
| `isProf`    | Boolean    | x         | 교수일 경우 `true`             |
| `name`      | String     | x         |                                |
| `schoolId`  | Number     | x         |                                |
| `lectures`  | ObjectId[] | `Lecture` | 수강 혹은 교수하는 `Lecture`들 |
| `email`     | String     | x         | usernameField                  |

#### Lecture Schema

| name        | type       | ref      | meaning                     |
| ----------- | :--------- | :------- | :-------------------------- |
| `lectureId` | String     | x        | 학수번호                    |
| `name`      | String     | x        |                             |
| `professor` | ObjectId   | `User`   | 해당 `Lecture`의 교수       |
| `notices`   | ObjectId[] | `Notice` | 해당 `Lecture`의 `Notice`들 |

#### Notice Schema

| name        | type     | ref    | meaning              |
| ----------- | :------- | :----- | :------------------- |
| `createdAt` | Date     | x      | 공지가 만들어진 시각 |
| `creator`   | ObjectId | `User` | 공지를 만든 `User`   |
| `title`     | String   | x      |                      |
| `content`   | String   | x      |                      |

## Web Aplication

#### Routing

| route            | function                                  | link                                                                                         | access                 |
| ---------------- | :---------------------------------------- | :------------------------------------------------------------------------------------------- | :--------------------- |
| `header`         |                                           | `home` / `seeLectures` / `newNotices` / `logout` // + `makeLecture`(교수) //`login` / `join` | 학생 // 교수 // public |
| `home`           | 수강 혹은 교수 하는 `Lecture` 리스트 나열 | `lectureDetail` // `writeNotice` (교수)                                                      |
| `join`           | 회원 가입                                 | x                                                                                            | public                 |
| `login`          | 로그인                                    | x                                                                                            | public                 |
| `logout`         | 로그아웃                                  | x                                                                                            | public                 |
| `changePassword` | 비밀번호 변경                             | x                                                                                            | private                |
| `lectureDetail`  | 해당 강의의 `Notice`들 나열               | x                                                                                            | private                |
| `writeNotice`    | 새로운 공지 생성                          | x                                                                                            | 교수                   |
| `userDetail`     | `User`의 name, schoolId, email 보여줌     | `changePassword`                                                                             | private                |
| `makeLecture`    | 새로운 강의 생성                          |                                                                                              | 교수                   |
| `seeLectures`    | 등록된 모든 강의 나열 / 학생이 등록 가능  | `enrollLecture` (API)                                                                        | 학생                   |

#### Additional explanation

_pug_ _express_ _webpack_ _heroku_ _mongoose_

## To Do

- .env git ignore
- Route protection
- flash
- additional properties
  - 공지 기능
  - search 기능
  - 정렬 기능
