# Stfalcon-vuex-crud-module-creator

If you need to create a lot of crud operation. It's for you. The Simple wrapper on your vuex-modules. Included four basic operations.
`$create`, `$read`, `$update`, `$remove`

## Installing

```shell
npm i @stfalcon/vuex-crud-module-creator
```

## Usage

### Create module

`some-module.js`

```js
import { createModule } from "@stfalcon/vuex-crud-module-creator";
const module = createModule(
  "todo",
  {
    /* options */
  },
  {
    /* override store */
  }
);

export default module;
```

## Options

```js
{
  endpoint?: string;
  getKey?: () => string | number;
  transportAdapter?: fetch | axios;
  paginationStrategy? "basic" | "pointer";
}
```

| Name               | Type     | Default           | Description                                                                                  |
| ------------------ | -------- | ----------------- | -------------------------------------------------------------------------------------------- |
| endpoint           | String   | as a module name  | URL where you will send requests. For example: "users" or "users/:userId/orders"             |
| getKey             | Function | () => "id"        | By default getKey return id and all your collections saved how a object `{ [id]: someData }` |
|                    |          |                   | If you wanna change key you should write your custom reducer                                 |
| transportAdapter   | any      | fetch             | Your layer for send requests to a server. We recommend using axios                           |
| paginationStartegy | Object   | { type: "basic" } | In to `createModule` including pagination options. In basic strategy you have next keys:     |
|                    |          |                   | `{ total: number, offset: number, limit: number }`                                           |

## Global configuration

`store.js`

You can install transportAdapter globally

```js
import { createModule } from "stfalcon-vuex-crud-module-creator";
import axios from "axios";

createModule.configure({
  transportAdapter: axios
});
```
