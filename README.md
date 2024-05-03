# scm-platform

## 查看当前 npm registry 地址指向
```
npm config get registry
yarn config get registry
```
## 执行内部 npm registry 地址指向
```
npm config get registry
npm config set registry http://nexus.xc.com:8081/repository/npm-all/
yarn config set registry http://nexus.xc.com:8081/repository/npm-all/
```
## 执行默认 npm registry 地址指向
```
npm config set registry https://registry.npmjs.org/
yarn config set registry https://registry.npmjs.org/
```

## Project setup
```
yarn install
```

### Compiles and hot-reloads for development
```
yarn serve
```

### Compiles and minifies for production
```
yarn build
```

### Customize configuration
See [Configuration Reference](https://cli.vuejs.org/config/).

### 目录结构
### 开发规范

1. views文件夹放视图组件，componetns放一些复用以及通用组件，命名规则小驼峰
例子：keyValue

2. 组件名应该始终是多个单词的，且命名规范为 KebabCase格式

```js
// 正例：
export default {
	name: 'TodoItem',
    ...
}
// 反例：
export default {
  name: 'Todo',
  // ...
}
// DOM中使用 
<todo-item></todo-item>
<TodoItem />
```
3. Props定义应该尽量详细
* 命名：使用小驼峰命名(cameCase)
* 必须指定类型
* 必须加上注释，表明其含义
* 须加上require或者 default，两者二选一

```js
props: {
	//组件状态，用于控制组件的颜色
    status: {
		  type: String,
      required: true,
    }
}
```

4. 模板中使用简单的表达式
* 组件模板中应该只包含简单的表达式，如果有复杂的表达式，应该使用计算属性或方法
正例：

<!-- 在模板中 -->
```js
{{ normalizedFullName }}

// 复杂表达式已经移入一个计算属性
computed: {
  normalizedFullName: function () {
    return this.fullName.split(' ').map(function (word) {
      return word[0].toUpperCase() + word.slice(1)
    }).join(' ')
  }
}
```

5. script标签内部结构顺序
components --> props --> data --> computed --> watch --> filter --> 钩子函数 --> methods

6. css使用规则(分隔线)

```js
<div class="warp-list"></div>
```
7. 一些类似开关处理方法，尽量成对出现
例子：

```js
data(){
  return {
    isShow:false
  }
}
methods:{
  show () {
    this.isShow = true
  },
  hide () {
    this.isShow = false
  }
}
```
8. 开发业务时以模块划分新建文件夹，业务复杂时需细分文件夹
9. 开发时需写好注释，简单通俗易懂
