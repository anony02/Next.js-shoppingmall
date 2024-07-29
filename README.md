# Project Name

상품들을 다양한 필터를 통해 검색할 수 있는 쇼핑몰을 구현하였습니다.

## Installation

1. git clone한 폴더로 이동

   ```bash
   cd shoppingmall
   ```

2. yarn package manager로 설치

   ```bash
   yarn install
   ```

## Start

1. json server 실행 (3001번 포트)

   ```bash
   yarn server
   ```

2. 개발 환경 실행

   ```bash
   yarn dev
   ```

3. .env 파일 설정

   비밀번호 재설정 시, 비밀번호 전송에 사용할 gmail 주소 및 앱 비밀번호 입력 (_/pages/api/sendEmail.ts 참고_)

   ```
   EMAIL=이메일
   EMAIL_PASSWORD=앱비밀번호
   ```

## Project Doc

### Built With

| package name  | version  |
| ------------- | -------- |
| react         | ^18.2.0  |
| next          | ^14.2.5  |
| axios         | ^1.6.8   |
| typescript    | ^5.5.3   |
| emotion/react | ^11.12.0 |
| storybook     | ^8.2.5   |

_자세한 개발 스택은 package.json 참고_

### Pages

1. `/`: 메인 페이지
2. `/login`: 로그인 페이지
3. `/register`: 회원가입 페이지
4. `/find-username`: 아이디 찾기 페이지
5. `/reset-password`: 비밀번호 찾기 페이지
6. `/cart`: 장바구니 페이지
7. `/detail/:id`: 상품별 상세 페이지
8. `/:category`: 카테고리별 페이지

## Information

- [project notion](https://www.notion.so/5d3059befa5043a2a0d4adc33ad3c865?pvs=4)
- 상품정보 API: https://dummyjson.com/docs/products

## Author

- [이도현]
