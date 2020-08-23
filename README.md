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
</ul>
</details>