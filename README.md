# Fullstack React GraphQL TypeScript Tutorial

`docker-compose up`으로 실행할 수 있으며   
작업된 결과물은 `http://Host.docker.internal:3000`로 확인할 수 있습니다

### 1. Node/TypeScript Setup
```bash
$ yarn add -D @types/node typescript ts-node
$ npx tsconfig.json
$ yarn add -D nodemon
```

`npx tsconfig.json`로 `tsconfig.json`파일을 생성할 수 있습니다.   
프로젝트를 컴파일하는 데 필요한 루트 파일과 컴파일러 옵션을 지정합니다.[[예시]](https://typescript-kr.github.io/pages/tsconfig.json.html).

   
### 2. MikroORM Setup
```bash
$ yarn add @mikro-orm/cli @mikro-orm/core @mikro-orm/migrations @mikro-orm/postgresql pg
```

npx mikro-orm migration:create를 하면 현재 스키마와 다른 점을 확인하고 새로운 마이그레이션을 만듭니다.    
이 플젝에서는 docker compose를 활용하여 작성하기 시작하였습니다.   

<details>
<summary>요약</summary>
<ul>
    <li>nodemon을 컨테이너 내에서 실행하기 위해 -L 옵션을 추가로 주었습니다.</li>
    <li>npx mikro-orm migration:create 대신 await orm.getMigrator().up(); 코드를 추가함으로써 자동으로 migrate 하도록 변경</li>
    <li>아직은 컨테이너가 실행 후 바로 죽지 않도록 watch만 하도록 작업</li>
</ul>
</details>

### 3. Apollo Server Express Setup
```bash
$ yarn add express apollo-server-express graphql type-graphql
$ yarn add -D @types/express
```

<details>
<summary>요약</summary>
<ul>
    <li>
        리졸버(Resolver) <br />
        그래프 큐엘에서 데이터를 가져오는 구체적인 과정을 담당 <br />
        리졸버를 통해서 데이터 source의 종류에 상관 없이 구현이 가능
    </li>
    <li>
        type-graphql <br />
        클래스와 데코레이터만을 이용하여 스키마를 정의하기 위한 TypeGraphQL 
        <a href="https://github.com/MichalLytek/type-graphql">[참고]</a>
    </li>
</ul>
</details>

### 4. MikroORM TypeGraphQL Crud
```bash
$ yarn add reflect-metadata
```

<details>
<summary>요약</summary>
<ul>
    <li>
        뮤테이션(Mutation) <br />
        데이터를 수정할 때 GET을 사용하지 않는 것처럼 GraphQL에서는 데이터를 생성 및 수정할때는 Mutation을 사용 <br />
        Mutation을 사용하지 않고서도 데이터의 생성 및 변경이 가능하지만 Mutation을 사용하도록 하자 <br />
        Query와 Mutation의 가장 큰 차이는 Query는 병렬로 실행되지만 Mutation은 순차적으로 실행이 된다!
        <a href="https://bricoler.tistory.com/2">[참고]</a>
    </li>
    <li>
        MikroORM의 persistAndFlush <br />
        persist와 flush를 동시에 수행 <br />
        persist는 데이터를 생성하는 것을 말하고 flush는 commit과 같은 의미인듯 하다
    </li>
    <li>
        reflect-metadata <br />
        데코레이터 문법을 지원하기 위한 Polyfill <br />
        TypeORM을 사용하고 있다면 이미 설치되어 있을것이지만 여기서는 mikro-orm을 사용중이기 때문에 설치
    </li>
</ul>
</details>

### 5. Register Resolver
```bash
$ yarn add argon2
```

<details>
<summary>요약</summary>
<ul>
    <li>
        최근 떠오르는 암호화툴? Argon2 
        <a href="https://velog.io/@rosewwross/Argon2-%EC%95%94%ED%98%B8%ED%99%94-tool">[참고]</a><br />
    </li>
</ul>
</details>

### 6. Login Resolver

별 다른 내용은 없었음

### 7. Session Authentication
```bash
$ yarn add redis connect-redis express-session
$ yarn add -D @types/redis @types/connect-redis @types/express-session
```

<details>
<summary>요약</summary>
<ul>
    <li>
        typescript에서 아래와 같이 사용하면 req.session이 null이어도 사용할 수 있다.<br />
        req.session!.userId = user.id; <a href="https://www.inflearn.com/questions/10222">[참고]</a>
    </li>
    <li>
        이 강의에서는 Request & { session: Express.Session }와 같이 타입 결합을 사용한다. <br />
        이를 Intersection Types라고 한다. <a href="https://infoscis.github.io/2017/06/19/TypeScript-handbook-advanced-types/">[참고]</a>
    </li>
    <li>
        강의를 따라하다 에러가 났다... <br />
        TypeCasting으로 해결! <br />
        마침 해결하지 못하고 있던분이 깃헙에 계시길래 해결법 달아줌 > _ < <a href="https://github.com/benawad/lireddit/commit/cd945b296484946d81b38e45401f18c9e07b2603">[링크]</a>
    </li>
</ul>
</details>

### 8. Sessions Explained

<details>
<summary>요약</summary>
<ul>
    <li>
        redis에 값이 어떻게 할당이 되어 있는지에 관한 설명 이었음
    </li>
</ul>
</details>

### 9. Next.js + Chakra
```bash
$ npx create-next-app --example with-chakra-ui frontend 
$ yarn add -D typescript @types/node
$ yarn add formik
```

<details>
<summary>요약</summary>
<ul>
    <li>
    Chakra UI는 오픈된 지 얼마 안 된 라이브러리이지만, 최근 중요하게 여겨지는 접근성을 최우선 지원으로 둔 UI 라이브러리로
    나온 지 얼마 안됐지만 인기가 많다고합니다.
    </li>
</ul>
</details>

## 10. Apollo-Client Basics
```bash
# frontend
$ yarn add @apollo/client graphql
# backend 
$ yarn add cors
$ yarn add -D @types/cors
```

<details>
<summary>요약</summary>
<ul>
    <li>
    ApolloClient는 GraphQL로 로컬 및 원격 데이터를 모두 관리할 수 있는 JavaScript용 종합 상태 관리 라이브러리입니다. <br />
    이 기능을 사용하여 응용 프로그램 데이터를 가져오고, 캐시하고, 수정하면서 UI를 자동으로 업데이트합니다.
    </li>
    <li>
        Request.credentials <br />
        cross-origin 호출에 따라 user credentials을 어떻게 처리할지에 관한 내용이다.
        <a href="https://developer.mozilla.org/ko/docs/Web/API/Request/credentials">[참고]</a> <br />
        이 프로젝트에서는 "include"로 셋팅하여 cross-origin 호출이더라도 user credentials을 받는다. <br />
        단 서버측에서도 credentials 옵션이 true로 설정되어 있어야한다. 
    </li>
</ul>
</details>

### 11. GraphQL Code Generator
```bash
# frontend
$ yarn add -D @graphql-codegen/cli @graphql-codegen/typescript-react-apollo
```

`yarn graphql-codegen init` 입력후 아래와 같이 선택 또는 입력
```properties
? What type of application are you building? Application built with React
? Where is your schema?: (path or url) http://Host.docker.internal:8000/graphql
? Where are your operations and fragments?: src/graphql/**/*.graphql
? Pick plugins: TypeScript (required by othyer typescript plugins), TypeScript Operations (operations and fragments), TypeScript React Apollo (typed components and HOCs)
? Where to write the output: src/generated/graphql.tsx
? Do you want to generate an introspection file? No
? How to name the config file? codegen.yml
? What script in package.json should run the codegen? gen
```

<details>
<summary>요약</summary>
<ul>
    <li>
    GraphQL Code Generator <br />
    graphql 스키마를 클라이언트에서 작성후 Code Generator를 통해 TypeScript 타입을 생성하고 사용하였음 
    </li>
    <li>
    도커 내부에서 호스트의 IP를 사용하기 위해서는 Host.docker.internal를 사용하면 된다.
    </li>
</ul>
</details>

### 12. Register Error Handling

강의랑 다르게 오다보니 원래 12에서 작업해야하는 내용을 일부 11에서 작업완료

### 13. NavBar

<details>
<summary>요약</summary>
<ul>
    <li>
    로그인 기능을 구현하고 NavBar를 만들었으나 로그인 직후 index 페이지로 이동해도 로그인 된것으로 나오지 않는 문제가 있음. <br />
    이는 cache 문제임 
    </li>
</ul>
</details>

### 14. Apollo-Client Cache Updates

<details>
<summary>요약</summary>
<ul>
    <li>
    GraphQL에는 Fragment라는 것이 있는데 이는 재사용이 뛰어는 쿼리문의 파편을 의미한다. <br />
    동일한 구조 반복하여 가지는 field를 정의할때 fragment 구문을 사용하면 편리.
    </li>
</ul>
</details>

### 15. Logout

### 16. SSR
```bash
$ yarn add next-with-apollo
```

<details>
<summary>요약</summary>
<ul>
    <li>
    http://Host.docker.internal:3000으로 접속하지 않으면 쿠키가 전달이 안되는 문제가 있음. <br />
    실제 도메인으로 한다면 문제가 없을것으로 보임 localhost로 보내면 apollo가 127.0.0.1로 보내서 그런것으로 보이는데 둘다 로컬인데 뭐가 문제인가.. <br />
    </li>
    <li>
    쿠키가 변경이되어도 아폴로의 스토어는 변경이 되지 않아 명시적으로 client.resetStore()를 호출해주어야함. <br />
    자동화할 방법은?
    </li>
</ul>
</details>

### 17. Forgot Password 
```bash
# backend
$ yarn add nodemailer
$ yarn add -D @types/nodemailer
```

아직 이메일을 보내는 과정은 포함되지 않음

### 18. Change Password
```bash
# backend
$ yarn add ioredis uuid
$ yarn add -D @types/ioredis @types/uuid
```

ioredis는 많은 기능을 제공하는 빠른 속도의 라이브러리입니다. [[참고]](https://bcho.tistory.com/1099)

### 19. Switching to TypeORM
```bash
$ yarn remove @mikro-orm/cli @mikro-orm/core @mikro-orm/migrations @mikro-orm/postgresql
$ yarn add typeorm
```

### 20. Many to One

### 21. Error Handling

backend와 frontend에서 각각 처리를 backend에서는 isAuth 미들웨어 함수를 작성하여 권한 체크를 처리하였으며 frontend에서는 useIsAuth라는 커스텀 훅을 사용하여 인증을 처리하였음

### 22. Next.js Query Params

흔히 권한이 없는 페이지인 경우 로그인하면 다시 그 페이지로 돌아가는 기능인 next page 기능을 query string으로 구현

<details>
<summary>요약</summary>
<ul>
    <li>
    query string을 이용하면 next page 기능을 구현할 수 있다.
    </li>
</ul>
</details>