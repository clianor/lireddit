# Fullstack React GraphQL TypeScript Tutorial

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