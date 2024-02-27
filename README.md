## Description
- ### Project for NestJS tutorial
-  ### Login (Google Oauth)
    1. https://console.developers.google.com/ 에서 서비스 등록
    2. npm passport packages 설치
      npm install @nestjs/passport passport passport-google-oauth20 &&
      npm install -D @types/passport @types/passport-google-oauth20
    3. google.strategy.ts 추가
    4. user module에 연동
      (reference: https://ksk-yun.tistory.com/8)

-  ### Chat (Websocket)
    1. websocket을 통해 채팅 기록 DB에 저장

## Installation

```bash
$ npm install
```

## Running the app

```bash
# development
$ npm run start

# watch mode
$ npm run start:dev

# production mode
$ npm run start:prod
```
